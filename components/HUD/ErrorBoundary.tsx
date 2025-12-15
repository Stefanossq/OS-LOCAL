import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { CornerDeco } from './HudComponents';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4">
          <div className="glass-panel p-8 max-w-md w-full relative border-red-500/50">
            <CornerDeco className="top-0 left-0 text-red-500" />
            <CornerDeco className="bottom-0 right-0 rotate-180 text-red-500" />
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-red-500/10 rounded-full animate-pulse">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
              
              <div>
                <h1 className="text-2xl font-hud text-red-500 tracking-widest mb-2">SYSTEM_FAILURE</h1>
                <p className="font-mono text-sm text-gray-400">
                  CRITICAL KERNEL PANIC. NEURAL LINK SEVERED.
                </p>
                {this.state.error && (
                  <div className="mt-4 p-2 bg-black/50 border border-red-900 text-red-400 text-xs font-mono text-left overflow-auto max-h-32">
                    {this.state.error.toString()}
                  </div>
                )}
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-6 py-2 bg-red-500/20 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-all font-mono uppercase tracking-wider"
              >
                <RefreshCw size={16} /> Reboot System
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}