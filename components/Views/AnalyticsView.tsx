
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';
import { CornerDeco } from '../HUD/HudComponents';

const WEEKLY_DATA = [
  { name: 'SEG', tasks: 4, focus: 2400 },
  { name: 'TER', tasks: 3, focus: 1398 },
  { name: 'QUA', tasks: 8, focus: 9800 },
  { name: 'QUI', tasks: 6, focus: 3908 },
  { name: 'SEX', tasks: 5, focus: 4800 },
  { name: 'SAB', tasks: 2, focus: 3800 },
  { name: 'DOM', tasks: 1, focus: 4300 },
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-hud text-white">ANÁLISE DE DADOS</h2>
          <p className="font-mono text-cyber-cyan text-sm">RELATÓRIO SEMANAL // SEMANA 42</p>
        </div>
        <button className="px-4 py-1 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 font-mono text-xs transition-colors uppercase">
          Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-hud text-cyber-pink mb-4">PRODUTIVIDADE (TAREFAS)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontFamily: 'monospace'}} />
                <YAxis stroke="#9ca3af" tick={{fontFamily: 'monospace'}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111827', borderColor: '#d946ef', color: '#fff' }}
                   cursor={{fill: 'rgba(217, 70, 239, 0.1)'}}
                />
                <Bar dataKey="tasks" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Trend */}
        <div className="glass-panel p-6 relative">
          <CornerDeco className="top-0 right-0 rotate-90" />
          <h3 className="text-lg font-hud text-cyber-cyan mb-4">TENDÊNCIA DE FOCO</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontFamily: 'monospace'}} />
                <YAxis stroke="#9ca3af" tick={{fontFamily: 'monospace'}} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#06b6d4', color: '#fff' }} />
                <Line type="monotone" dataKey="focus" stroke="#06b6d4" strokeWidth={3} dot={{fill: '#06b6d4', r: 4}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Horas', value: '34.5h', color: 'text-cyber-green' },
          { label: 'Eficiência', value: '92%', color: 'text-cyber-yellow' },
          { label: 'Streak', value: '12 Dias', color: 'text-cyber-pink' },
          { label: 'Bugs', value: '0', color: 'text-cyber-cyan' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-4 text-center hover:border-white/30 transition-colors">
            <p className="text-gray-500 text-xs font-mono uppercase mb-1">{kpi.label}</p>
            <p className={`text-2xl font-hud ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
