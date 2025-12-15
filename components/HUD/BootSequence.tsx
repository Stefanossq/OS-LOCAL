
import React, { useState, useEffect } from 'react';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "BIOS CHECK... OK",
    "LOADING KERNEL... OK",
    "MOUNTING FILE SYSTEM...",
    "ESTABLISHING NEURAL LINK...",
    "DECRYPTING USER DATA...",
    "LOADING GRAPHICS DRIVERS...",
    "INITIALIZING HUD INTERFACE...",
    "SYSTEM ONLINE."
  ];

  useEffect(() => {
    let currentLog = 0;
    
    // Log interval
    const logInterval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      }
    }, 400);

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-cyber-black flex flex-col items-center justify-center font-mono text-cyber-cyan z-50">
      <div className="w-80 max-w-full space-y-4">
        <h1 className="text-2xl font-hud text-white text-center mb-8 animate-pulse">CYBERHUD v2.0</h1>
        
        <div className="h-48 overflow-hidden text-xs border border-gray-800 p-2 bg-black/50">
          {logs.map((log, i) => (
            <div key={i} className="mb-1">
              <span className="text-cyber-pink">[{new Date().toLocaleTimeString()}]</span> {log}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs uppercase">
            <span>Loading Modules</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-900 w-full overflow-hidden">
            <div 
              className="h-full bg-cyber-cyan transition-all duration-75"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
