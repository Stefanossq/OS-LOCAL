import React, { useState } from 'react';
import { Trophy, Lock, Unlock, Medal, Crown, Star, Shield, Target } from 'lucide-react';
import { CornerDeco, GlitchText } from '../HUD/HudComponents';
import { PlayerStats } from '../../types';

interface AchievementsViewProps {
  stats: PlayerStats;
  currentTitle: string;
  onSetTitle: (title: string) => void;
}

// Icons components
const CheckIcon = () => (
  <svg className="w-3 h-3 text-cyber-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const RANK_TITLES = [
  { level: 1, title: 'NEOPHYTE', color: 'text-gray-400' },
  { level: 5, title: 'SCRIPT_KIDDIE', color: 'text-cyber-cyan' },
  { level: 10, title: 'NETRUNNER', color: 'text-cyber-green' },
  { level: 20, title: 'CYBER_DEMON', color: 'text-cyber-pink' },
  { level: 50, title: 'SYSTEM_ARCHITECT', color: 'text-cyber-yellow' },
  { level: 100, title: 'SINGULARITY', color: 'text-white' },
];

const TROPHIES = [
  { id: 1, name: 'HELLO_WORLD', desc: 'Completar a primeira missão', icon: <Star />, req: (s: PlayerStats) => s.xp > 0 },
  { id: 2, name: 'MERCENÁRIO', desc: 'Acumular 50 Créditos (Gold)', icon: <Target />, req: (s: PlayerStats) => s.gold >= 50 },
  { id: 3, name: 'VETERANO', desc: 'Alcançar o Nível 10', icon: <Medal />, req: (s: PlayerStats) => s.level >= 10 },
  { id: 4, name: 'INTOCÁVEL', desc: 'Manter HP acima de 90% por um dia', icon: <Shield />, req: (s: PlayerStats) => s.hp >= 90 && s.level > 5 },
  { id: 5, name: 'OVERCLOCK', desc: 'Atingir Nível 20', icon: <ZapIcon />, req: (s: PlayerStats) => s.level >= 20 },
  { id: 6, name: 'WHALE', desc: 'Acumular 1000 Créditos', icon: <Crown />, req: (s: PlayerStats) => s.gold >= 1000 },
];

export const AchievementsView: React.FC<AchievementsViewProps> = ({ stats, currentTitle, onSetTitle }) => {
  const unlockedCount = TROPHIES.filter(t => t.req(stats)).length;
  const progress = (unlockedCount / TROPHIES.length) * 100;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex items-center gap-4 relative overflow-hidden">
           <div className="absolute right-0 top-0 opacity-10 text-cyber-yellow transform translate-x-1/4 -translate-y-1/4">
             <Trophy size={100} />
           </div>
           <div>
             <p className="font-mono text-gray-500 text-xs uppercase">Conquistas Totais</p>
             <p className="font-hud text-3xl text-white">{unlockedCount} <span className="text-gray-600 text-lg">/ {TROPHIES.length}</span></p>
           </div>
        </div>
        
        <div className="glass-panel p-6 flex items-center gap-4">
           <div>
             <p className="font-mono text-gray-500 text-xs uppercase">Taxa de Completude</p>
             <div className="flex items-end gap-2">
               <p className="font-hud text-3xl text-cyber-cyan">{progress.toFixed(0)}%</p>
             </div>
             <div className="w-32 h-1 bg-gray-800 mt-2">
               <div className="h-full bg-cyber-cyan" style={{ width: `${progress}%` }}></div>
             </div>
           </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4 border-l-2 border-cyber-pink">
           <div>
             <p className="font-mono text-gray-500 text-xs uppercase">Título Atual</p>
             <p className="font-hud text-xl text-cyber-pink tracking-widest animate-pulse">
               [{currentTitle}]
             </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Titles Selection (Left Col) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={16} className="text-cyber-yellow" />
            <h3 className="font-hud text-white tracking-widest">PATENTES DISPONÍVEIS</h3>
          </div>
          
          <div className="glass-panel p-2 space-y-1 max-h-[500px] overflow-y-auto custom-scrollbar">
            {RANK_TITLES.map((rank) => {
              const isUnlocked = stats.level >= rank.level;
              const isEquipped = currentTitle === rank.title;
              
              return (
                <button
                  key={rank.title}
                  disabled={!isUnlocked}
                  onClick={() => onSetTitle(rank.title)}
                  className={`
                    w-full text-left p-3 font-mono text-sm border flex justify-between items-center transition-all duration-300 relative overflow-hidden group
                    ${isEquipped 
                      ? 'border-cyber-pink bg-cyber-pink/10 text-white' 
                      : isUnlocked 
                        ? 'border-gray-800 hover:border-cyber-cyan text-gray-300 hover:bg-white/5' 
                        : 'border-transparent bg-black/50 text-gray-700 cursor-not-allowed opacity-50'}
                  `}
                >
                  <span className={`z-10 relative ${rank.color} ${isEquipped ? 'font-bold' : ''}`}>
                    {rank.title}
                  </span>
                  
                  <div className="z-10 flex items-center gap-2">
                    <span className="text-[10px] uppercase">LVL {rank.level}</span>
                    {isEquipped && <CheckIcon />}
                    {!isUnlocked && <Lock size={12} />}
                  </div>

                  {isEquipped && <div className="absolute inset-0 bg-cyber-pink/5 animate-pulse"></div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trophy Grid (Right Col) */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-6">
            <Medal size={16} className="text-cyber-cyan" />
            <h3 className="font-hud text-white tracking-widest">GALERIA DE TROFÉUS</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TROPHIES.map((trophy) => {
              const isUnlocked = trophy.req(stats);
              
              return (
                <div 
                  key={trophy.id}
                  className={`
                    glass-panel p-4 relative group transition-all duration-500
                    ${isUnlocked ? 'border-cyber-green/30' : 'border-gray-800 grayscale opacity-70'}
                  `}
                >
                  <CornerDeco className={`top-0 right-0 rotate-90 scale-75 ${isUnlocked ? 'text-cyber-green' : 'text-gray-700'}`} />
                  
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-full border 
                      ${isUnlocked 
                        ? 'bg-cyber-green/10 border-cyber-green text-cyber-green shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                        : 'bg-black border-gray-700 text-gray-700'}
                    `}>
                      {isUnlocked ? trophy.icon : <Lock size={20} />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-hud text-sm tracking-wider ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {isUnlocked ? trophy.name : <GlitchText text="ENCRIPTADO" />}
                      </h4>
                      <p className="font-mono text-xs text-gray-500 mt-1">
                        {trophy.desc}
                      </p>
                      
                      <div className="mt-3 flex justify-between items-center text-[10px] font-mono">
                        <span className={isUnlocked ? 'text-cyber-green' : 'text-red-500'}>
                          STATUS: {isUnlocked ? 'DESBLOQUEADO' : 'BLOQUEADO'}
                        </span>
                        {isUnlocked && <Unlock size={10} className="text-cyber-green" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
