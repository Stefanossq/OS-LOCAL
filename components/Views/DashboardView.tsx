
import React, { useMemo } from 'react';
import { Activity, Battery, Zap, Coins, Clock } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { StatBar, CornerDeco } from '../HUD/HudComponents';
import { QuestBoard } from '../QuestBoard';
import { MiniMap } from '../MiniMap';
import { PlayerStats, Quest, ViewSection } from '../../types';

interface DashboardViewProps {
  stats: PlayerStats;
  quests: Quest[];
  onAddQuest: (t: string, d: string) => void;
  onCompleteQuest: (id: string) => void;
  activeSection: ViewSection;
  onNavigate: (section: ViewSection) => void;
  performanceData: any[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  quests,
  onAddQuest,
  onCompleteQuest,
  activeSection,
  onNavigate,
  performanceData
}) => {
  // Memoize chart data/components to prevent unnecessary re-renders during high-frequency updates (e.g. mana drain)
  const chart = useMemo(() => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={performanceData}>
        <defs>
          <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke="#4b5563" tick={{fill: '#4b5563', fontSize: 10, fontFamily: 'monospace'}} />
        <YAxis stroke="#4b5563" tick={{fill: '#4b5563', fontSize: 10, fontFamily: 'monospace'}} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#111827', borderColor: '#06b6d4', color: '#fff' }}
          itemStyle={{ fontFamily: 'monospace' }}
        />
        <Area type="monotone" dataKey="focus" stroke="#06b6d4" fillOpacity={1} fill="url(#colorFocus)" />
        <Area type="monotone" dataKey="energy" stroke="#d946ef" fillOpacity={1} fill="url(#colorEnergy)" />
      </AreaChart>
    </ResponsiveContainer>
  ), [performanceData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Left Column: Stats (3 cols) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="glass-panel p-5 relative">
          <h3 className="text-cyber-cyan font-hud text-sm mb-4 tracking-wider border-b border-cyber-cyan/20 pb-1">BIO-METRICAS</h3>
          <StatBar 
            label="ENERGIA (HP)" 
            value={stats.hp} 
            max={stats.maxHp} 
            color="green" 
            icon={<Activity size={16} />} 
          />
          <StatBar 
            label="CRONOMETRIA" 
            value={stats.mana} 
            max={stats.maxMana} 
            color="cyan" 
            icon={<Clock size={16} />} 
          />
          <StatBar 
            label="PROGRESSO XP" 
            value={stats.xp % 1000} 
            max={1000} 
            color="pink" 
            icon={<Zap size={16} />} 
          />
        </div>

        <div className="glass-panel p-5 flex items-center justify-between border-l-4 border-cyber-yellow relative overflow-hidden group">
          <div className="absolute inset-0 bg-cyber-yellow/5 group-hover:bg-cyber-yellow/10 transition-colors"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-3 bg-cyber-yellow/10 rounded-full text-cyber-yellow">
              <Coins size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-mono uppercase">CRÉDITOS</p>
              <p className="text-2xl font-hud text-cyber-yellow">{stats.gold}</p>
            </div>
          </div>
          <div className="text-xs font-mono text-cyber-yellow/60 relative z-10">PROJETOS</div>
        </div>

        {/* Mini Map */}
        <div className="glass-panel p-1">
          <MiniMap activeSection={activeSection} onNavigate={(s) => onNavigate(s as ViewSection)} />
        </div>
      </div>

      {/* Middle Column: Quest Log (6 cols) */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        <QuestBoard 
          quests={quests} 
          onAddQuest={onAddQuest}
          onCompleteQuest={onCompleteQuest}
        />
        
        {/* Analytics Graph */}
        <div className="glass-panel p-4 h-64 relative">
          <div className="absolute top-2 right-2 flex gap-2">
            <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse delay-75"></div>
          </div>
          <h3 className="text-xs font-mono text-gray-400 mb-2">MATRIZ_DE_PERFORMANCE</h3>
          {chart}
        </div>
      </div>

      {/* Right Column: Inventory / Context (3 cols) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="glass-panel p-5 min-h-[300px] relative">
          <CornerDeco className="top-0 right-0 rotate-90" />
          <h3 className="text-cyber-pink font-hud text-sm mb-4 tracking-wider border-b border-cyber-pink/20 pb-1">DADOS (RECURSOS)</h3>
          <ul className="space-y-3 font-mono text-sm">
            <li className="flex justify-between text-gray-300 hover:text-cyber-cyan cursor-pointer transition-colors p-2 hover:bg-white/5 rounded border border-transparent hover:border-cyber-cyan/30">
              <span>[DOC] Espec_API_v2.pdf</span>
              <span className="text-xs text-gray-500">2MB</span>
            </li>
            <li className="flex justify-between text-gray-300 hover:text-cyber-cyan cursor-pointer transition-colors p-2 hover:bg-white/5 rounded border border-transparent hover:border-cyber-cyan/30">
              <span>[IMG] Mockup_Final.png</span>
              <span className="text-xs text-gray-500">5MB</span>
            </li>
            <li className="flex justify-between text-gray-300 hover:text-cyber-cyan cursor-pointer transition-colors p-2 hover:bg-white/5 rounded border border-transparent hover:border-cyber-cyan/30">
              <span>[KEY] Chave_SSH_Root</span>
              <span className="text-xs text-gray-500">ENC</span>
            </li>
          </ul>
          
          <div className="mt-8 pt-4 border-t border-gray-800">
            <h4 className="text-xs text-gray-500 uppercase mb-2">Slots de Memória</h4>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-black/40 border border-gray-700 hover:border-cyber-cyan transition-colors rounded flex items-center justify-center group">
                  {i === 1 && <Battery size={14} className="text-cyber-green group-hover:animate-pulse" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather / Env / Extra Data */}
        <div className="glass-panel p-4 flex flex-col items-center text-center">
          <h3 className="text-xs font-mono text-gray-500 mb-1">STATUS_AMBIENTE</h3>
          <div className="text-2xl font-hud text-white">22°C / ESTÁVEL</div>
          <div className="w-full h-1 bg-gray-800 mt-2 rounded overflow-hidden">
            <div className="h-full bg-cyber-green w-[85%] animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
