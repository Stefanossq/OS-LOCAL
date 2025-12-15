import React from 'react';

// Decorative Corner Piece
export const CornerDeco: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-8 h-8 absolute text-cyber-cyan opacity-80 ${className}`} viewBox="0 0 32 32" fill="none">
    <path d="M1 1H10L14 5H31V12" stroke="currentColor" strokeWidth="2" />
    <rect x="1" y="1" width="4" height="4" fill="currentColor" />
  </svg>
);

// Progress Bar (Health/Mana)
interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: 'cyan' | 'pink' | 'green' | 'yellow';
  icon?: React.ReactNode;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, max, color, icon }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorMap = {
    cyan: 'bg-cyber-cyan shadow-[0_0_10px_#06b6d4]',
    pink: 'bg-cyber-pink shadow-[0_0_10px_#d946ef]',
    green: 'bg-cyber-green shadow-[0_0_10px_#10b981]',
    yellow: 'bg-cyber-yellow shadow-[0_0_10px_#facc15]'
  };

  const textMap = {
    cyan: 'text-cyber-cyan',
    pink: 'text-cyber-pink',
    green: 'text-cyber-green',
    yellow: 'text-cyber-yellow'
  };

  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      <div className="flex justify-between items-end font-mono text-sm uppercase tracking-wider">
        <span className={`flex items-center gap-2 ${textMap[color]} font-bold`}>
          {icon} {label}
        </span>
        <span className="text-gray-400 text-xs">{value}/{max}</span>
      </div>
      <div className="h-4 bg-gray-900 border border-gray-700 relative overflow-hidden skew-x-[-12deg]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:4px_100%]"></div>
        
        {/* Fill */}
        <div 
          className={`h-full transition-all duration-500 ease-out ${colorMap[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Glare effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-20"></div>
      </div>
    </div>
  );
};

export const HexagonImage: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <div className="absolute inset-0 clip-hex bg-cyber-cyan opacity-20 animate-pulse"></div>
      <img 
        src={src} 
        alt="Avatar" 
        className="w-full h-full object-cover clip-hex border-2 border-cyber-cyan"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      />
    </div>
  );
};

export const GlitchText: React.FC<{ text: string, as?: 'h1' | 'h2' | 'h3' | 'span' }> = ({ text, as = 'span' }) => {
  const Component = as;
  return (
    <Component className="font-hud uppercase tracking-widest relative inline-block group hover:text-cyber-cyan transition-colors">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-[2px] -z-10 opacity-0 group-hover:opacity-50 text-red-500 animate-pulse">{text}</span>
      <span className="absolute top-0 -left-[2px] -z-10 opacity-0 group-hover:opacity-50 text-blue-500 animate-pulse delay-75">{text}</span>
    </Component>
  );
};