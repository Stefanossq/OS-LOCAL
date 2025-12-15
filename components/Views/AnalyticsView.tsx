
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
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

const TECH_DATA = [
  { name: 'TypeScript', value: 45, color: '#06b6d4' }, // cyan
  { name: 'Rust', value: 25, color: '#d946ef' },       // pink
  { name: 'Python', value: 20, color: '#10b981' },     // green
  { name: 'Go', value: 10, color: '#facc15' },         // yellow
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-end mb-4 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl font-hud text-white">ANÁLISE DE DADOS</h2>
          <p className="font-mono text-cyber-cyan text-sm">RELATÓRIO SEMANAL // SEMANA 42</p>
        </div>
        <button className="px-4 py-2 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 font-mono text-xs transition-colors uppercase flex items-center gap-2">
          <span>DOWNLOAD_RELATÓRIO</span>
          <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Horas', value: '34.5h', sub: '+12% vs last week', color: 'text-cyber-green' },
          { label: 'Eficiência', value: '92%', sub: 'Nível Otimizado', color: 'text-cyber-yellow' },
          { label: 'Streak', value: '12 Dias', sub: 'Recorde Pessoal', color: 'text-cyber-pink' },
          { label: 'Bugs', value: '0', sub: 'Sistema Limpo', color: 'text-cyber-cyan' },
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-4 text-center hover:border-white/30 transition-colors group cursor-default">
            <p className="text-gray-500 text-xs font-mono uppercase mb-1 group-hover:text-white transition-colors">{kpi.label}</p>
            <p className={`text-3xl font-hud ${kpi.color} mb-1`}>{kpi.value}</p>
            <p className="text-[10px] font-mono text-gray-600">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Productivity Bar Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-hud text-cyber-pink mb-4 flex justify-between items-center">
            <span>PRODUTIVIDADE (TAREFAS)</span>
            <span className="text-xs font-mono bg-cyber-pink/10 text-cyber-pink px-2 py-1 rounded">LIVE</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontFamily: 'monospace', fontSize: 10}} />
                <YAxis stroke="#9ca3af" tick={{fontFamily: 'monospace', fontSize: 10}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111827', borderColor: '#d946ef', color: '#fff', fontFamily: 'monospace' }}
                   cursor={{fill: 'rgba(217, 70, 239, 0.1)'}}
                />
                <Bar dataKey="tasks" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Focus Line Chart */}
        <div className="glass-panel p-6 relative">
          <CornerDeco className="top-0 right-0 rotate-90" />
          <h3 className="text-lg font-hud text-cyber-cyan mb-4 flex justify-between items-center">
             <span>TENDÊNCIA DE FOCO</span>
             <span className="text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan px-2 py-1 rounded">NEURO-LINK</span>
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fontFamily: 'monospace', fontSize: 10}} />
                <YAxis stroke="#9ca3af" tick={{fontFamily: 'monospace', fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#06b6d4', color: '#fff', fontFamily: 'monospace' }} />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  dot={{fill: '#111827', stroke: '#06b6d4', strokeWidth: 2, r: 4}} 
                  activeDot={{r: 6, fill: '#06b6d4'}} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tech Distribution Pie Chart (New) */}
        <div className="glass-panel p-6 relative lg:col-span-2">
           <h3 className="text-lg font-hud text-white mb-4">DISTRIBUIÇÃO DE LINGUAGEM</h3>
           <div className="flex flex-col md:flex-row items-center justify-around h-64">
              <div className="h-full w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TECH_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {TECH_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: '4px', border: '1px solid #374151', fontFamily: 'monospace' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Custom Legend */}
              <div className="grid grid-cols-2 gap-4 w-full md:w-1/3">
                 {TECH_DATA.map((tech) => (
                   <div key={tech.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }}></div>
                      <div>
                        <p className="text-white font-hud text-sm">{tech.name}</p>
                        <p className="text-gray-500 font-mono text-xs">{tech.value}% USO</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
