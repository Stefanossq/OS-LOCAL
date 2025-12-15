
import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto dismiss
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 p-4 border-l-4 backdrop-blur-md shadow-lg animate-in slide-in-from-right duration-300
              ${toast.type === 'success' ? 'bg-cyber-green/10 border-cyber-green' : 
                toast.type === 'error' ? 'bg-red-500/10 border-red-500' : 
                toast.type === 'warning' ? 'bg-cyber-yellow/10 border-cyber-yellow' : 
                'bg-cyber-cyan/10 border-cyber-cyan'}
            `}
          >
            <div className={`mt-0.5 ${
              toast.type === 'success' ? 'text-cyber-green' : 
              toast.type === 'error' ? 'text-red-500' : 
              toast.type === 'warning' ? 'text-cyber-yellow' : 
              'text-cyber-cyan'
            }`}>
              {toast.type === 'success' ? <CheckCircle size={18} /> : 
               toast.type === 'error' ? <X size={18} /> : 
               toast.type === 'warning' ? <AlertTriangle size={18} /> : 
               <Info size={18} />}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-hud text-xs uppercase tracking-wider mb-1 ${
                 toast.type === 'success' ? 'text-cyber-green' : 
                 toast.type === 'error' ? 'text-red-500' : 
                 toast.type === 'warning' ? 'text-cyber-yellow' : 
                 'text-cyber-cyan'
              }`}>
                {toast.type === 'success' ? 'SUCCESS' : 
                 toast.type === 'error' ? 'ERROR' : 
                 toast.type === 'warning' ? 'ALERT' : 
                 'SYSTEM_MSG'}
              </h4>
              <p className="font-mono text-xs text-gray-200">{toast.message}</p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
