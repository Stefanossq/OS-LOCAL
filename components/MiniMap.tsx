
import React from 'react';
import { Home, User, Settings, BarChart2, ShoppingCart, Trophy } from 'lucide-react';
import { ViewSection } from '../types';

interface MiniMapProps {
  activeSection: ViewSection;
  onNavigate: (section: ViewSection) => void;
}

export const MiniMap: React.FC<MiniMapProps> = ({ activeSection, onNavigate }) => {
  // Organized in a Hexagon pattern around center
  const nodes = [
    { id: ViewSection.DASHBOARD, icon: <Home size={14} />, x: 50, y: 50 }, // Center
    { id: ViewSection.SHOP, icon: <ShoppingCart size={14} />, x: 50, y: 20 }, // Top
    { id: ViewSection.ANALYTICS, icon: <BarChart2 size={14} />, x: 80, y: 35 }, // Top Right
    { id: ViewSection.SETTINGS, icon: <Settings size={14} />, x: 80, y: 65 }, // Bottom Right
    { id: ViewSection.ACHIEVEMENTS, icon: <Trophy size={14} />, x: 50, y: 80 }, // Bottom
    { id: ViewSection.PROFILE, icon: <User size={14} />, x: 20, y: 65 }, // Bottom Left
    // Empty spot at 20, 35 for symmetry or future use
  ];

  return (
    <div className="glass-panel w-full aspect-square relative overflow-hidden flex items-center justify-center bg-cyber-dark/80">
      {/* Radar Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>
      <div className="absolute w-[80%] h-[80%] border border-cyber-cyan/20 rounded-full"></div>
      <div className="absolute w-[40%] h-[40%] border border-cyber-cyan/20 rounded-full"></div>
      
      {/* Scanning Line */}
      <div className="absolute w-full h-full animate-[spin_4s_linear_infinite] origin-center">
        <div className="w-1/2 h-1/2 bg-gradient-to-t from-transparent via-cyber-cyan/10 to-transparent border-r border-cyber-cyan/30 absolute top-0 left-1/2 origin-bottom-left"></div>
      </div>

      {/* Nodes */}
      {nodes.map((node) => {
        const isActive = activeSection === node.id;
        return (
          <button
            key={node.id}
            onClick={() => onNavigate(node.id)}
            className={`
              absolute w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10
              ${isActive ? 'border-cyber-yellow bg-cyber-yellow/20 text-cyber-yellow scale-110 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'border-cyber-cyan bg-black/50 text-cyber-cyan hover:bg-cyber-cyan/20'}
            `}
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            title={node.id.toUpperCase()}
          >
            {node.icon}
          </button>
        );
      })}

      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyber-cyan">
        SETOR: {activeSection.toUpperCase()}
      </div>
    </div>
  );
};
