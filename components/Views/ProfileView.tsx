
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Award, Briefcase, Code, MapPin, Hash, Star, Shield } from 'lucide-react';
import { CornerDeco, GlitchText } from '../HUD/HudComponents';
import { PlayerStats } from '../../types';

const SKILLS_DATA = [
  { subject: 'Coding', A: 120, fullMark: 150 },
  { subject: 'Design', A: 98, fullMark: 150 },
  { subject: 'Logic', A: 130, fullMark: 150 },
  { subject: 'Comms', A: 85, fullMark: 150 },
  { subject: 'Focus', A: 100, fullMark: 150 },
  { subject: 'Stamina', A: 90, fullMark: 150 },
];

const BADGES = [
  { id: 1, name: 'BETA_TESTER', icon: <Hash size={16} />, color: 'text-cyber-cyan', border: 'border-cyber-cyan' },
  { id: 2, name: 'BUG_HUNTER', icon: <Shield size={16} />, color: 'text-cyber-pink', border: 'border-cyber-pink' },
  { id: 3, name: 'NIGHT_OWL', icon: <Star size={16} />, color: 'text-cyber-yellow', border: 'border-cyber-yellow' },
  { id: 4, name: '100_COMMITS', icon: <Code size={16} />, color: 'text-cyber-green', border: 'border-cyber-green' },
];

const RECENT_LOGS = [
  { time: '10:42', action: 'Deploy realizado em prod-v2', status: 'SUCCESS' },
  { time: '09:15', action: 'Refatoração de núcleo', status: 'WARN' },
  { time: '08:00', action: 'Login no sistema', status: 'INFO' },
];

export const ProfileView: React.FC<{ stats: PlayerStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in slide-in-from-bottom-5 duration-500">
      
      {/* Identity Card (Left Col) */}
      <div className="md:col-span-4 lg:col-span-3 space-y-6">
        <div className="glass-panel p-8 relative flex flex-col items-center text-center">
          <CornerDeco className="top-0 left-0" />
          <CornerDeco className="bottom-0 right-0 rotate-180" />
          
          <div className="w-32 h-32 mb-6 relative group cursor-pointer">
             <div className="absolute inset-0 bg-cyber-cyan/20 animate-pulse rounded-full blur-xl group-hover:bg-cyber-pink/30 transition-colors"></div>
             <img src="https://picsum.photos/300/300" alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-cyber-cyan relative z-10 group-hover:border-cyber-pink transition-colors" />
          </div>

          <h2 className="text-2xl font-hud text-white mb-1"><GlitchText text="OPERATOR_ONE" /></h2>
          <p className="font-mono text-cyber-cyan text-sm mb-6">SENIOR FULLSTACK NETRUNNER</p>

          <div className="grid grid-cols-1 gap-4 w-full text-left font-mono text-sm border-t border-gray-800 pt-6">
            <div className="space-y-1">
              <p className="text-gray-500 text-xs">LOCALIZAÇÃO</p>
              <p className="flex items-center gap-2 text-gray-200"><MapPin size={12} className="text-cyber-pink" /> Neo-São Paulo</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-xs">AFILIAÇÃO</p>
              <p className="flex items-center gap-2 text-gray-200"><Briefcase size={12} className="text-cyber-yellow" /> Freelance Corp</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-xs">STACK PRINCIPAL</p>
              <p className="flex items-center gap-2 text-gray-200"><Code size={12} className="text-cyber-green" /> React / Node / Rust</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-xs">RANK GLOBAL</p>
              <p className="flex items-center gap-2 text-gray-200"><Award size={12} className="text-cyber-cyan" /> Top 1% Elite</p>
            </div>
          </div>
        </div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
           <div className="p-2 glass-panel border border-gray-800 rounded hover:border-cyber-yellow transition-colors">
             <span className="block text-gray-500">XP TOTAL</span>
             <span className="text-cyber-yellow text-lg">{stats.xp}</span>
           </div>
           <div className="p-2 glass-panel border border-gray-800 rounded hover:border-white transition-colors">
             <span className="block text-gray-500">NÍVEL</span>
             <span className="text-white text-lg">{stats.level}</span>
           </div>
           <div className="p-2 glass-panel border border-gray-800 rounded hover:border-cyber-green transition-colors">
             <span className="block text-gray-500">PROJETOS</span>
             <span className="text-cyber-green text-lg">{stats.gold}</span>
           </div>
        </div>
      </div>

      {/* Right Col: Radar & Details */}
      <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skills Radar */}
        <div className="glass-panel p-6 relative flex flex-col h-[400px]">
          <h3 className="text-xl font-hud text-white mb-4 tracking-widest flex items-center gap-2">
            <ActivityIcon /> DIAGNÓSTICO_DE_SKILLS
          </h3>
          
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILLS_DATA}>
                <PolarGrid stroke="#1f2937" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#06b6d4', fontSize: 12, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Stats"
                  dataKey="A"
                  stroke="#d946ef"
                  strokeWidth={2}
                  fill="#d946ef"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievements & Logs */}
        <div className="flex flex-col gap-6">
           {/* Badges */}
           <div className="glass-panel p-6">
              <h3 className="text-sm font-hud text-cyber-yellow mb-4 border-b border-cyber-yellow/20 pb-2">CONQUISTAS_DESBLOQUEADAS</h3>
              <div className="grid grid-cols-2 gap-3">
                {BADGES.map((badge) => (
                  <div key={badge.id} className={`flex items-center gap-3 p-2 border ${badge.border} bg-black/40 rounded transition-transform hover:scale-105 cursor-default`}>
                    <div className={`${badge.color}`}>{badge.icon}</div>
                    <span className={`text-xs font-mono ${badge.color}`}>{badge.name}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* Activity Log */}
           <div className="glass-panel p-6 flex-1">
              <h3 className="text-sm font-hud text-gray-400 mb-4 border-b border-gray-700 pb-2">LOGS_DE_SISTEMA</h3>
              <div className="space-y-3 font-mono text-xs">
                {RECENT_LOGS.map((log, i) => (
                  <div key={i} className="flex gap-3 text-gray-300 hover:text-white transition-colors">
                    <span className="text-gray-600">[{log.time}]</span>
                    <span className="flex-1">{log.action}</span>
                    <span className={log.status === 'SUCCESS' ? 'text-cyber-green' : log.status === 'WARN' ? 'text-cyber-yellow' : 'text-cyber-cyan'}>
                      {log.status}
                    </span>
                  </div>
                ))}
                <div className="text-gray-600 animate-pulse">_</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <svg className="w-5 h-5 text-cyber-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
