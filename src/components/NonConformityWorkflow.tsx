/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Plus, 
  FileSearch, 
  Image as ImageIcon, 
  ChevronRight, 
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Archive,
  Zap
} from 'lucide-react';
import { MOCK_NON_CONFORMITIES } from '../constants';
import { NonConformity, RootCauseAnalysis } from '../types';

export default function NonConformityWorkflow() {
  const [tickets, setTickets] = useState<NonConformity[]>(MOCK_NON_CONFORMITIES);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<NonConformity | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseTicket = () => {
    if (!selectedTicket) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setTickets(prev => prev.map(t => 
        t.id === selectedTicket.id 
          ? { ...t, status: 'resolved' as const } 
          : t
      ));
      setSelectedTicket(prev => prev ? { ...prev, status: 'resolved' as const } : null);
      alert('Incidencia cerrada. Se han liberado las unidades en cuarentena tras validación técnica.');
    }, 2000);
  };

  const [newTicket, setNewTicket] = useState({
    orderId: '',
    type: 'Dimensiones',
    description: '',
    priority: 'medium' as const,
    quantity: 1
  });

  const handleCreate = () => {
    const ticket: NonConformity = {
      id: `NC-${Date.now()}`,
      orderId: newTicket.orderId,
      type: newTicket.type,
      description: newTicket.description,
      priority: newTicket.priority,
      costImpact: Math.floor(Math.random() * 5000) + 1000,
      status: 'pending',
      date: TicketDate(),
    };
    setTickets([ticket, ...tickets]);
    setIsCreating(false);
    // Simulating stock deduction logic
    alert(`BLOQUEO DE INVENTARIO: Se han segregado ${newTicket.quantity} unidades de la orden ${newTicket.orderId} a Cuarentena (Lote: QC-${Math.random().toString(36).substr(2, 6).toUpperCase()})`);
  };

  function TicketDate() {
    return new Date().toISOString().split('T')[0];
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-industrial-card p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif italic text-white flex items-center gap-4">
            <ShieldAlert className="text-industrial-red w-6 h-6 md:w-8 md:h-8" /> Control de No Conformidades
          </h2>
          <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2">Aseguramiento de Calidad y Ciclo de Mejora <span className="text-industrial-red animate-pulse ml-2 text-[8px]">• LIVE</span></p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-industrial-red hover:bg-red-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-industrial-red/20 h-12 md:h-[52px] w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Generar Ticket NC</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-red/60 mb-4">Tickets Activos</h3>
          <div className="space-y-3">
            {tickets.map((nc) => (
              <div 
                key={nc.id}
                onClick={() => setSelectedTicket(nc)}
                className={`p-4 md:p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  selectedTicket?.id === nc.id 
                    ? 'bg-industrial-red/5 border-industrial-red/50' 
                    : 'bg-industrial-card border-white/5 hover:border-industrial-red/30'
                }`}
              >
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                   <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border shrink-0 ${
                     nc.status === 'pending' ? 'bg-industrial-red/10 border-industrial-red/20 text-industrial-red' : 'bg-industrial-red/10 border-industrial-red/20 text-industrial-red'
                   }`}>
                      <FileSearch className="w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-base md:text-lg">{nc.orderId}</h4>
                      <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{nc.type} • {nc.date}</p>
                   </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-8 w-full sm:w-auto">
                   <div className="text-left sm:text-right">
                      <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 mb-0.5 md:mb-1">Impacto Previsto</p>
                      <p className="text-xs md:text-sm font-mono font-bold text-industrial-red/70">${nc.costImpact}</p>
                   </div>
                   <span className={`text-[8px] md:text-[9px] font-black uppercase px-2.5 md:px-3 py-1 rounded-full border ${
                     nc.status === 'pending' ? 'bg-industrial-red/10 text-industrial-red border-industrial-red/20' : 'bg-industrial-red/10 text-industrial-red border-industrial-red/20'
                   }`}>
                      {nc.status}
                   </span>
                   <ChevronRight className="hidden sm:block w-5 h-5 text-white/10 group-hover:text-industrial-red transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RCA & Details Panel */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-red/60 mb-4">Análisis de Causa Raíz (RCA)</h3>
          {selectedTicket ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-industrial-card border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                 <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-red rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                    <ClipboardList className="text-white w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tighter">Análisis 5-Porqués</h4>
                    <p className="text-[8px] md:text-[9px] font-black text-industrial-red/70 uppercase tracking-widest">Metodología de Resolución</p>
                 </div>
              </div>

              <div className="space-y-6 relative">
                 <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5"></div>
                 {[1,2,3,4,5].map((i) => (
                   <div key={i} className="flex gap-4 md:gap-6 relative">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20 shrink-0 z-10 border border-white/10">
                        {i}
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] md:text-xs font-bold text-white/40 mb-1.5 md:mb-2 uppercase tracking-tighter">¿Por qué falló?</p>
                         <input 
                          type="text" 
                          placeholder="..." 
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-2.5 md:py-3 px-4 text-xs focus:border-industrial-red outline-none text-white/80 italic font-serif"
                         />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-8 md:mt-10 p-4 md:p-6 bg-industrial-red/5 border border-industrial-red/20 rounded-2xl">
                 <div className="flex items-center gap-2 text-industrial-red mb-2">
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Evidencia Fotográfica</span>
                 </div>
                 <div className="aspect-video bg-white/5 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10">
                    <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-white/10 mb-2" />
                    <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase">Subir Imagen Detalle</span>
                 </div>
              </div>

              <div className="mt-6 md:mt-8 flex gap-3">
                 <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest transition-all h-12 md:h-[52px]">
                    Descartar
                 </button>
                 <button className="flex-1 bg-industrial-red hover:bg-red-500 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-industrial-red/20 h-12 md:h-[52px]">
                    Cerrar Ciclo
                 </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-[300px] md:h-[500px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-6 md:p-10 opacity-30">
               <AlertTriangle className="w-10 md:w-12 h-10 md:h-12 mb-6 text-industrial-red/50" />
               <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#D4AF37]">Seleccione una Incidencia</p>
               <p className="text-[8px] md:text-[10px] mt-4 leading-relaxed">Para iniciar el análisis de causa raíz y definir acciones correctivas inmediatas.</p>
            </div>
          )}
        </div>
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
             <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-industrial-card border border-white/10 w-full max-w-lg rounded-[2rem] p-6 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-hide"
             >
                <div className="flex items-center gap-4 mb-8 md:mb-10">
                   <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-red rounded-2xl flex items-center justify-center shrink-0">
                      <Archive className="text-white w-5 h-5 md:w-6 md:h-6" />
                   </div>
                   <div>
                      <h3 className="text-xl md:text-2xl font-serif italic text-white">Nuevo Ticket de Calidad</h3>
                      <p className="text-[8px] md:text-[10px] font-black text-industrial-red uppercase tracking-widest mt-1">Conexión Automática con Inventario</p>
                   </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                   <div className="space-y-2">
                      <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Orden de Trabajo Relacionada</label>
                      <input 
                        type="text" 
                        value={newTicket.orderId}
                        onChange={e => setNewTicket({...newTicket, orderId: e.target.value})}
                        placeholder="ej: OT-2024-998"
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm focus:border-industrial-red outline-none text-white h-12 md:h-[52px]"
                      />
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Tipo de Defecto</label>
                        <select 
                          value={newTicket.type}
                          onChange={e => setNewTicket({...newTicket, type: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm focus:border-industrial-red outline-none text-white h-12 md:h-[52px] appearance-none"
                        >
                          <option>Dimensiones</option>
                          <option>Material</option>
                          <option>Aparariencia</option>
                          <option>Funcional</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Cantidad a Cuarentena</label>
                        <input 
                          type="number" 
                          value={newTicket.quantity}
                          onChange={e => setNewTicket({...newTicket, quantity: parseInt(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm focus:border-industrial-red outline-none text-white h-12 md:h-[52px]"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Descripción del Hallazgo</label>
                      <textarea 
                        value={newTicket.description}
                        onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm focus:border-industrial-red outline-none text-white h-[80px] md:h-[100px] resize-none"
                        placeholder="Detalle la desviación observada..."
                      />
                   </div>
                </div>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 md:gap-4">
                   <button 
                    onClick={() => setIsCreating(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold h-12 md:h-[52px] rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                   >
                     Cancelar
                   </button>
                   <button 
                    onClick={handleCreate}
                    className="flex-1 bg-industrial-red hover:bg-red-500 text-white font-bold h-12 md:h-[52px] rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-industrial-red/20"
                   >
                     Generar y Bloquear Stock
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
