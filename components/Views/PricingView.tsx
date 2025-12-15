
import React from 'react';
import { Check, Zap, Shield, Cpu, CreditCard, Lock } from 'lucide-react';
import { CornerDeco, GlitchText } from '../HUD/HudComponents';

const PLANS = [
  {
    name: 'INICIADO',
    price: '0',
    currency: 'BRL',
    color: 'cyber-cyan',
    features: ['Link Neural Básico', 'Diretrizes Diárias: 3', 'Analytics Padrão', 'Anúncios no HUD'],
    recommended: false
  },
  {
    name: 'NETRUNNER',
    price: '29',
    currency: 'BRL',
    color: 'cyber-pink',
    features: ['Banda Ilimitada', 'Integração Gemini AI', 'Métricas Avançadas', 'Sem Rastreamento'],
    recommended: true
  },
  {
    name: 'CYBERLORD',
    price: '89',
    currency: 'BRL',
    color: 'cyber-yellow',
    features: ['Acesso Admin Neural', 'APIs Customizadas', 'Servidor Dedicado', 'Drone de Suporte 24/7'],
    recommended: false
  }
];

export const PricingView: React.FC = () => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="text-center mb-10 relative">
        <h2 className="text-3xl font-hud text-white tracking-widest mb-2">
          <GlitchText text="UPGRADE_DE_SISTEMA" />
        </h2>
        <p className="font-mono text-cyber-cyan text-sm">SELECIONE SEU PROTOCOLO DE BANDA</p>
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan, idx) => (
          <div 
            key={plan.name}
            className={`
              glass-panel p-1 relative flex flex-col transition-all duration-300 hover:scale-105
              ${plan.recommended ? 'border-cyber-pink shadow-[0_0_20px_rgba(217,70,239,0.2)]' : ''}
            `}
          >
            {/* Holographic Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none"></div>

            <div className="bg-black/40 p-6 flex flex-col h-full relative z-10">
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-pink text-black font-bold font-mono text-xs px-3 py-1 uppercase tracking-wider clip-hex">
                  Recomendado
                </div>
              )}

              <CornerDeco className="top-0 left-0 scale-50" />
              <CornerDeco className="bottom-0 right-0 rotate-180 scale-50" />

              <h3 className={`font-hud text-xl text-${plan.color} tracking-widest mb-2`}>
                {plan.name}
              </h3>
              
              <div className="flex items-end gap-1 mb-6 font-mono">
                <span className="text-gray-500 text-sm mb-2">R$</span>
                <span className="text-3xl text-white font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm mb-1">/mês</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-mono text-gray-300">
                    <div className={`mt-0.5 text-${plan.color}`}>
                      <Check size={14} />
                    </div>
                    {feat}
                  </div>
                ))}
              </div>

              <button className={`
                w-full py-3 px-4 font-hud text-sm uppercase tracking-wider transition-all duration-300 glitch-btn
                ${plan.recommended 
                  ? 'bg-cyber-pink/20 border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black' 
                  : `bg-${plan.color}/10 border border-${plan.color} text-${plan.color} hover:bg-${plan.color} hover:text-black`
                }
              `}>
                <div className="flex items-center justify-center gap-2">
                  <span className="relative z-10">INICIAR UPLINK</span>
                  {plan.recommended ? <Zap size={16} /> : <Cpu size={16} />}
                </div>
              </button>
            </div>
            
            {/* Scanline for cards */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.4)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20"></div>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-panel p-6 border-l-4 border-cyber-green flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyber-green/20 rounded-full text-cyber-green">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-hud text-white">SEGURANÇA CORPORATIVA</h4>
            <p className="font-mono text-xs text-gray-400">Encriptação ponta-a-ponta para todos os fluxos neurais.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs border border-cyber-cyan/30 px-3 py-1 rounded">
          <Lock size={12} />
          PAGAMENTO_SSL_SEGURO
        </div>
      </div>
    </div>
  );
};
