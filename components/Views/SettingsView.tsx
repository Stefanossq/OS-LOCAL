
import React, { useState, useEffect, useRef } from 'react';
import { Settings, Volume2, Eye, Database, Activity, Wifi } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left Column: Controls */}
      <div>
        <h2 className="text-2xl font-hud text-white mb-8 border-b border-gray-800 pb-4 flex items-center gap-3">
          <Settings className="text-cyber-cyan" /> CONFIGURAÇÕES DO SISTEMA
        </h2>

        <div className="space-y-6">
          {/* Interface Section */}
          <div className="glass-panel p-6">
            <h3 className="text-cyber-pink font-mono text-sm mb-4 uppercase">Interface Neural</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="text-gray-400" size={18} />
                  <span className="text-gray-200">Feedback Sonoro</span>
                </div>
                <Toggle active={true} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="text-gray-400" size={18} />
                  <span className="text-gray-200">Modo Alta Performance</span>
                </div>
                <Toggle active={false} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wifi className="text-gray-400" size={18} />
                  <span className="text-gray-200">Sincronização Cloud</span>
                </div>
                <Toggle active={true} />
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div className="glass-panel p-6 border-l-4 border-red-500/50">
            <h3 className="text-red-400 font-mono text-sm mb-4 uppercase">Zona de Perigo</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                  <Database className="text-gray-400 mt-1" size={18} />
                  <div>
                    <span className="text-gray-200 block text-sm">Resetar Dados Locais</span>
                    <span className="text-gray-600 text-xs">Apaga todas as missões, XP e configurações salvas no dispositivo local. Irreversível.</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if(confirm('Tem certeza que deseja resetar o sistema?')) {
                      StorageService.resetData();
                    }
                  }}
                  className="w-full py-2 border border-red-500 text-red-500 hover:bg-red-500/20 font-mono text-xs transition-colors uppercase tracking-widest"
                >
                  EXECUTAR WIPE DE MEMÓRIA
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Diagnostics Terminal */}
      <div className="glass-panel p-6 flex flex-col h-full min-h-[400px]">
        <h3 className="text-cyber-green font-mono text-sm mb-4 uppercase flex items-center gap-2">
          <Activity size={16} /> Console de Diagnóstico
        </h3>
        <DiagnosticsTerminal />
      </div>
      
    </div>
  );
};

const Toggle: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${active ? 'bg-cyber-cyan/30 border border-cyber-cyan' : 'bg-gray-800 border border-gray-700'}`}>
    <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${active ? 'translate-x-6 bg-cyber-cyan' : 'translate-x-0 bg-gray-500'}`}></div>
  </div>
);

const DiagnosticsTerminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>(["Inicializando diagnóstico..."]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commands = [
      "Pingando servidor central...",
      "Latência: 12ms [OK]",
      "Verificando integridade de cache...",
      "Cache hash: 0x4F2A9 [OK]",
      "Escaneando portas...",
      "Porta 3000: ABERTA",
      "Porta 8080: FECHADA",
      "Otimizando renderização gráfica...",
      "GPU Load: 34%",
      "Memory Usage: 450MB",
      "Sincronizando com Clerk Auth...",
      "Token renovado.",
      "Aguardando input..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLine = commands[i % commands.length] + (Math.random() > 0.5 ? "" : ` [${Math.floor(Math.random() * 100)}ms]`);
        setLines(prev => [...prev.slice(-15), `> ${newLine}`]);
        i++;
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div ref={scrollRef} className="flex-1 bg-black/50 border border-gray-800 p-4 font-mono text-xs overflow-y-auto custom-scrollbar">
      {lines.map((line, idx) => (
        <div key={idx} className="mb-1 break-all">
          <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString()}</span>
          <span className={line.includes("ERROR") ? "text-red-500" : line.includes("OK") || line.includes("ABERTA") ? "text-cyber-green" : "text-cyber-cyan"}>
            {line}
          </span>
        </div>
      ))}
      <div className="animate-pulse text-cyber-green">_</div>
    </div>
  );
};
