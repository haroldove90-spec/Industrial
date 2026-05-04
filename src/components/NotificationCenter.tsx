import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Bell, 
  Wrench, 
  AlertTriangle, 
  Package, 
  ClipboardCheck,
  Check,
  Zap
} from 'lucide-react';
import { AppNotification } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-industrial-bg border-l border-white/10 z-[201] shadow-[0_0_80px_rgba(0,0,0,0.8)] pb-12 flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <Bell className="w-3 h-3 text-industrial-cyan" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-industrial-cyan">Centro de Notificaciones</span>
                 </div>
                 <h2 className="text-2xl font-serif italic text-white">Alertas de Planta</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scrollbar-hide">
              {MOCK_NOTIFICATIONS.map((notif, idx) => {
                const Icon = notif.type === 'maintenance' ? Wrench : 
                           notif.type === 'production' ? Zap :
                           notif.type === 'inventory' ? Package : ClipboardCheck;
                
                return (
                  <motion.div 
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                      notif.isRead 
                      ? 'bg-industrial-card/20 border-white/5 grayscale' 
                      : 'bg-industrial-card border-white/10 hover:border-industrial-cyan/30'
                    }`}
                  >
                    <div className="flex gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${
                        notif.priority === 'high' ? 'bg-industrial-red/10 border-industrial-red/20 text-industrial-red' :
                        notif.priority === 'medium' ? 'bg-industrial-orange/10 border-industrial-orange/20 text-industrial-orange' :
                        'bg-industrial-cyan/10 border-industrial-cyan/20 text-industrial-cyan'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                           <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{notif.type} • {notif.timestamp}</span>
                           {!notif.isRead && (
                             <div className="w-1.5 h-1.5 rounded-full bg-industrial-cyan animate-pulse"></div>
                           )}
                        </div>
                        <p className="text-sm text-white/80 font-medium leading-relaxed mb-4">{notif.message}</p>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="flex items-center gap-2 px-4 py-2 bg-industrial-cyan rounded-xl text-[9px] font-black uppercase tracking-widest text-white">
                               Gestionar
                           </button>
                           <button className="flex items-center justify-center p-2 bg-white/5 rounded-xl border border-white/10 text-white/40 hover:text-white transition-colors">
                               <Check className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="pt-8 text-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/10">No hay más notificaciones recientes</p>
              </div>
            </div>

            <div className="p-8 border-t border-white/5">
               <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:bg-white/10 hover:text-white transition-all">
                  Limpiar todas las alertas
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
