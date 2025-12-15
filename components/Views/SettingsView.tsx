
import React from 'react';
import { Settings, Volume2, Eye, Database, LogOut } from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const SettingsView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
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
                <span className="text-gray-200">Modo Alta Performance (Sem Animações)</span>
              </div>
              <Toggle active={false} />
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="glass-panel p-6 border-l-4 border-red-500/50">
          <h3 className="text-red-400 font-mono text-sm mb-4 uppercase">Zona de Perigo</h3>
          
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <Database className="text-gray-400" size={18} />
                <div>
                   <span className="text-gray-200 block">Resetar Dados Locais</span>
                   <span className="text-gray-600 text-xs">Apaga todas as missões e status.</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  if(confirm('Tem certeza que deseja resetar o sistema?')) {
                    StorageService.resetData();
                  }
                }}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500/20 font-mono text-xs transition-colors"
              >
                EXECUTAR WIPE
              </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
         <p className="text-gray-600 font-mono text-xs">CYBERHUD SYSTEM v2.4.0 // BUILD 2025</p>
      </div>
    </div>
  );
};

const Toggle: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${active ? 'bg-cyber-cyan/30 border border-cyber-cyan' : 'bg-gray-800 border border-gray-700'}`}>
    <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${active ? 'translate-x-6 bg-cyber-cyan' : 'translate-x-0 bg-gray-500'}`}></div>
  </div>
);
