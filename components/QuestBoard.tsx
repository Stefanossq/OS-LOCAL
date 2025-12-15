
import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Terminal, Loader2 } from 'lucide-react';
import { Quest, QuestDifficulty, QuestStatus } from '../types';
import { generateQuestDescription } from '../services/geminiService';
import { CornerDeco } from './HUD/HudComponents';

interface QuestBoardProps {
  quests: Quest[];
  onAddQuest: (title: string, description: string) => void;
  onCompleteQuest: (id: string) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onAddQuest, onCompleteQuest }) => {
  const [newQuestInput, setNewQuestInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAdd = async () => {
    if (!newQuestInput.trim()) return;
    
    setIsGenerating(true);
    const flavorText = await generateQuestDescription(newQuestInput);
    onAddQuest(newQuestInput, flavorText);
    setNewQuestInput('');
    setIsGenerating(false);
  };

  return (
    <div className="glass-panel p-6 relative min-h-[400px] flex flex-col h-full">
      <CornerDeco className="top-0 left-0" />
      <CornerDeco className="bottom-0 right-0 rotate-180" />
      
      <div className="flex items-center justify-between mb-6 border-b border-cyber-cyan/30 pb-2">
        <h2 className="text-xl font-hud text-cyber-yellow tracking-widest flex items-center gap-2">
          <Terminal size={20} />
          DIRETRIZES_ATIVAS
        </h2>
        <span className="text-xs font-mono text-cyber-cyan animate-pulse">SINCRONIZADO</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4 custom-scrollbar">
        {quests.map(quest => (
          <div 
            key={quest.id} 
            className={`
              relative p-3 border-l-2 transition-all duration-300 group
              ${quest.status === QuestStatus.COMPLETED ? 'border-cyber-green bg-cyber-green/5 opacity-50' : 'border-cyber-pink bg-cyber-pink/5 hover:bg-cyber-pink/10'}
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`font-hud text-sm ${quest.status === QuestStatus.COMPLETED ? 'text-gray-400 line-through' : 'text-white'}`}>
                  {quest.title}
                </h3>
                <p className="text-xs font-mono text-cyber-cyan/80 mt-1 uppercase tracking-tight">
                  {'>'} {quest.description}
                </p>
              </div>
              <button 
                onClick={() => onCompleteQuest(quest.id)}
                disabled={quest.status === QuestStatus.COMPLETED}
                className="ml-3 text-cyber-cyan hover:text-cyber-green transition-colors"
              >
                {quest.status === QuestStatus.COMPLETED ? <CheckCircle size={18} /> : <Circle size={18} />}
              </button>
            </div>
            
            <div className="mt-2 flex gap-2 text-[10px] font-mono uppercase text-gray-500">
              <span className="border border-gray-700 px-1 rounded text-cyber-yellow">XP +{quest.rewardXP}</span>
              <span className="border border-gray-700 px-1 rounded text-cyber-green">CR$ +{quest.rewardGold}</span>
            </div>
          </div>
        ))}
        {quests.length === 0 && (
          <div className="text-center text-gray-600 font-mono py-10">NENHUMA DIRETRIZ ENCONTRADA. AGUARDANDO INPUT.</div>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2 relative">
          <input 
            type="text" 
            value={newQuestInput}
            onChange={(e) => setNewQuestInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="INSERIR NOVA DIRETRIZ..."
            disabled={isGenerating}
            className="w-full bg-black/50 border border-gray-700 p-2 pl-3 text-sm font-mono text-cyber-cyan focus:outline-none focus:border-cyber-cyan placeholder-gray-700 transition-colors"
          />
          <button 
            onClick={handleAdd}
            disabled={isGenerating}
            className="p-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
