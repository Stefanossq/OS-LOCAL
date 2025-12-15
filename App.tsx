
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Globe, LogIn, ShoppingCart, Loader2 } from 'lucide-react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

import { CornerDeco, HexagonImage, GlitchText } from './components/HUD/HudComponents';
import { BootSequence } from './components/HUD/BootSequence';
import { ErrorBoundary } from './components/HUD/ErrorBoundary';
import { ToastProvider, useToast } from './components/HUD/ToastSystem';

import { analyzeEfficiency } from './services/geminiService';
import { StorageService } from './services/storageService';
import { Quest, QuestDifficulty, QuestStatus, PlayerStats, ViewSection } from './types';

// Code Splitting / Lazy Loading Views for Performance
const DashboardView = lazy(() => import('./components/Views/DashboardView').then(module => ({ default: module.DashboardView })));
const ProfileView = lazy(() => import('./components/Views/ProfileView').then(module => ({ default: module.ProfileView })));
const AnalyticsView = lazy(() => import('./components/Views/AnalyticsView').then(module => ({ default: module.AnalyticsView })));
const PricingView = lazy(() => import('./components/Views/PricingView').then(module => ({ default: module.PricingView })));
const SettingsView = lazy(() => import('./components/Views/SettingsView').then(module => ({ default: module.SettingsView })));
const AchievementsView = lazy(() => import('./components/Views/AchievementsView').then(module => ({ default: module.AchievementsView })));

// Mock Performance Data
const PERFORMANCE_DATA = [
  { time: '09:00', energy: 90, focus: 85 },
  { time: '10:00', energy: 85, focus: 95 },
  { time: '11:00', energy: 70, focus: 80 },
  { time: '12:00', energy: 60, focus: 40 },
  { time: '13:00', energy: 75, focus: 60 },
  { time: '14:00', energy: 65, focus: 85 },
];

const getEnvVar = (key: string): string => {
  try {
    if ((import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch (e) {}
  
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
  } catch (e) {}

  return '';
};

const CLERK_KEY = getEnvVar('VITE_CLERK_PUBLISHABLE_KEY');

interface CyberHudUser {
  firstName: string | null;
  imageUrl: string;
}

interface CyberHudProps {
  user: CyberHudUser;
  isAuthEnabled: boolean;
}

// Inner App Component that uses the Toast Hook
const CyberHudContent: React.FC<CyberHudProps> = ({ user, isAuthEnabled }) => {
  const [booted, setBooted] = useState(false);
  const { addToast } = useToast();
  
  const [stats, setStats] = useState<PlayerStats>(StorageService.getStats());
  const [quests, setQuests] = useState<Quest[]>(StorageService.getQuests());
  
  const [activeSection, setActiveSection] = useState<ViewSection>(ViewSection.DASHBOARD);
  const [equippedTitle, setEquippedTitle] = useState("NEOPHYTE");

  useEffect(() => {
    StorageService.saveStats(stats);
  }, [stats]);

  useEffect(() => {
    StorageService.saveQuests(quests);
  }, [quests]);

  useEffect(() => {
    if (booted) {
      addToast("SYSTEM ONLINE. WELCOME BACK, OPERATOR.", "success");
    }
  }, [booted, addToast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        mana: Math.max(0, parseFloat((prev.mana - 0.01).toFixed(2)))
      }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAddQuest = async (title: string, description: string) => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      title,
      description,
      difficulty: QuestDifficulty.EASY,
      status: QuestStatus.PENDING,
      rewardXP: 100,
      rewardGold: 1,
      timestamp: Date.now()
    };
    setQuests(prev => [...prev, newQuest]);
    addToast("NOVA DIRETRIZ RECEBIDA.", "info");
  };

  const handleCompleteQuest = async (id: string) => {
    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    setQuests(prev => prev.map(q => q.id === id ? { ...q, status: QuestStatus.COMPLETED } : q));
    
    setStats(prev => ({
      ...prev,
      gold: prev.gold + quest.rewardGold,
      xp: prev.xp + quest.rewardXP,
      hp: Math.min(prev.maxHp, prev.hp + 5)
    }));

    addToast(`DIRETRIZ COMPLETADA. +${quest.rewardXP}XP`, "success");

    // Trigger AI analysis asynchronously
    analyzeEfficiency(quests.filter(q => q.status === QuestStatus.COMPLETED).length + 1)
      .then(msg => addToast(msg, "info"))
      .catch(() => addToast("FALHA NA ANÁLISE AI", "warning"));
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  const LoadingFallback = () => (
    <div className="w-full h-96 flex flex-col items-center justify-center text-cyber-cyan gap-4">
      <Loader2 size={48} className="animate-spin" />
      <span className="font-mono text-sm tracking-widest animate-pulse">CARREGANDO MÓDULO...</span>
    </div>
  );

  const renderContent = () => {
    return (
      <Suspense fallback={<LoadingFallback />}>
        {activeSection === ViewSection.PROFILE && <ProfileView stats={stats} />}
        {activeSection === ViewSection.ANALYTICS && <AnalyticsView />}
        {activeSection === ViewSection.ACHIEVEMENTS && <AchievementsView stats={stats} currentTitle={equippedTitle} onSetTitle={setEquippedTitle} />}
        {activeSection === ViewSection.SHOP && <PricingView />}
        {activeSection === ViewSection.SETTINGS && <SettingsView />}
        {activeSection === ViewSection.DASHBOARD && (
          <DashboardView 
            stats={stats}
            quests={quests}
            onAddQuest={handleAddQuest}
            onCompleteQuest={handleCompleteQuest}
            activeSection={activeSection}
            onNavigate={setActiveSection}
            performanceData={PERFORMANCE_DATA}
          />
        )}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans selection:bg-cyber-cyan selection:text-black flex items-center justify-center p-4 lg:p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="w-full max-w-7xl relative">
        {/* Header HUD */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-cyber-cyan/20 pb-4 relative gap-4">
          <CornerDeco className="bottom-0 left-0 -translate-x-1 translate-y-1 rotate-180 scale-50" />
          
          <div className="flex items-center gap-6">
            <HexagonImage src={user.imageUrl} />
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-3xl font-hud font-bold text-white tracking-widest cursor-pointer hover:text-cyber-cyan transition-colors" onClick={() => setActiveSection(ViewSection.DASHBOARD)}>
                  <GlitchText text={user.firstName ? user.firstName.toUpperCase() : "OPERATOR_ONE"} />
                </h1>
                <span className="text-cyber-yellow font-mono text-sm border border-cyber-yellow px-1 rounded">NÍVEL {stats.level}</span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <p className="text-cyber-pink font-mono text-xs tracking-wider">
                  PATENTE: {equippedTitle}
                </p>
                <p className="text-cyber-cyan/60 font-mono text-xs flex items-center gap-2">
                  <Globe size={12} className="animate-pulse" />
                  ONLINE // <span className="text-cyber-green">CONEXÃO SEGURA</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveSection(ViewSection.SHOP)}
                className={`px-3 py-2 border flex items-center gap-2 font-mono text-xs transition-colors ${activeSection === ViewSection.SHOP ? 'bg-cyber-yellow text-black border-cyber-yellow' : 'border-cyber-yellow text-cyber-yellow hover:bg-cyber-yellow/10'}`}
              >
                <ShoppingCart size={14} /> UPGRADE
              </button>

              {isAuthEnabled ? (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all font-mono text-xs flex items-center gap-2">
                        <LogIn size={14} /> AUTENTICAR
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                     <UserButton 
                       appearance={{
                         elements: {
                           avatarBox: "w-8 h-8 border border-cyber-cyan",
                           userButtonTrigger: "focus:shadow-none"
                         }
                       }}
                     />
                  </SignedIn>
                </>
              ) : (
                <div className="px-3 py-1 border border-gray-700 text-gray-500 font-mono text-xs">MODO_LOCAL</div>
              )}
            </div>
          </div>
        </header>

        {/* View Content */}
        <ErrorBoundary>
          <main className="min-h-[500px]">
            {renderContent()}
          </main>
        </ErrorBoundary>
      </div>
      
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat"></div>
    </div>
  );
};

// Wrapper for Clerk-enabled mode
const ClerkWrapper = () => {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div className="h-screen w-full bg-cyber-black flex items-center justify-center text-cyber-cyan font-mono animate-pulse">CONECTANDO AO SERVIDOR DE AUTENTICAÇÃO...</div>;

  const userData: CyberHudUser = {
    firstName: user?.firstName || "Operador",
    imageUrl: user?.imageUrl || "https://picsum.photos/200/200"
  };

  return <CyberHudContent user={userData} isAuthEnabled={true} />;
}

// Wrapper for Local mode
const LocalWrapper = () => {
  const mockUser: CyberHudUser = {
    firstName: "Operador_Local",
    imageUrl: "https://picsum.photos/200/200"
  };
  return <CyberHudContent user={mockUser} isAuthEnabled={false} />;
}

// Root Component
export default function App() {
  const AppContent = CLERK_KEY ? (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <ClerkWrapper />
    </ClerkProvider>
  ) : (
    <LocalWrapper />
  );

  return (
    <ToastProvider>
      {AppContent}
    </ToastProvider>
  );
}
