
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Award, Briefcase, Code, MapPin } from 'lucide-react';
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

export const ProfileView: React.FC<{ stats: PlayerStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-5 duration-500">
      
      {/* Identity Card */}
      <div className="glass-panel p-8 relative flex flex-col items-center text-center">
        <CornerDeco className="top-0 left-0" />
        <CornerDeco className="bottom-0 right-0 rotate-180" />
        
        <div className="w-32 h-32 mb-6 relative">
           <div className="absolute inset-0 bg-cyber-cyan/20 animate-pulse rounded-full blur-xl"></div>
           <img src="https://picsum.photos/300/300" alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-cyber-cyan relative z-10" />
        </div>

        <h2 className="text-2xl font-hud text-white mb-1"><GlitchText text="OPERATOR_ONE" /></h2>
        <p className="font-mono text-cyber-cyan text-sm mb-6">SENIOR FULLSTACK NETRUNNER</p>

        <div className="grid grid-cols-2 gap-4 w-full text-left font-mono text-sm border-t border-gray-800 pt-6">
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">LOCALIZAÇÃO</p>
            <p className="flex items-center gap-2"><MapPin size={12} className="text-cyber-pink" /> Neo-São Paulo</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">AFILIAÇÃO</p>
            <p className="flex items-center gap-2"><Briefcase size={12} className="text-cyber-yellow" /> Freelance</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">STACK</p>
            <p className="flex items-center gap-2"><Code size={12} className="text-cyber-green" /> React / Node</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">RANK</p>
            <p className="flex items-center gap-2"><Award size={12} className="text-cyber-cyan" /> Elite</p>
          </div>
        </div>
      </div>

      {/* Skills Radar */}
      <div className="glass-panel p-6 relative flex flex-col">
        <h3 className="text-xl font-hud text-white mb-4 tracking-widest flex items-center gap-2">
          <ActivityIcon /> DIAGNÓSTICO_DE_HABILIDADES
        </h3>
        
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS_DATA}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#06b6d4', fontSize: 12, fontFamily: 'monospace' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#d946ef"
                strokeWidth={2}
                fill="#d946ef"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-mono">
           <div className="p-2 bg-black/30 border border-gray-800 rounded">
             <span className="block text-gray-500">TOTAL XP</span>
             <span className="text-cyber-yellow">{stats.xp}</span>
           </div>
           <div className="p-2 bg-black/30 border border-gray-800 rounded">
             <span className="block text-gray-500">NÍVEL</span>
             <span className="text-white">{stats.level}</span>
           </div>
           <div className="p-2 bg-black/30 border border-gray-800 rounded">
             <span className="block text-gray-500">PROJETOS</span>
             <span className="text-cyber-green">{stats.gold}</span>
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
