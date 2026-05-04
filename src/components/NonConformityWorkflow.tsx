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
      costImpact: 0,
      status: 'pending',
      date: TicketDate(),
    };
    setTickets([ticket, ...tickets]);
    setIsCreating(false);
    // Simulating stock deduction logic
    alert(`LOG: ${newTicket.quantity} unidades de la orden ${newTicket.orderId} movidas a CUARENTENA.`);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0a0a0a] p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-3xl font-serif italic text-white flex items-center gap-4">
            <ShieldAlert className="text-red-500 w-8 h-8" /> Control de No Conformidades
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Aseguramiento de Calidad y Ciclo de Mejora</p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-red-600/20 h-[52px]"
        >
          <Plus className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Generar Ticket NC</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 mb-4">Tickets Activos</h3>
          <div className="space-y-3">
            {tickets.map((nc) => (
              <div 
                key={nc.id}
                onClick={() => setSelectedTicket(nc)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between ${
                  selectedTicket?.id === nc.id 
                    ? 'bg-red-600/5 border-red-500/50' 
                    : 'bg-[#0a0a0a] border-white/5 hover:border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-6">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                     nc.status === 'pending' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                   }`}>
                      <FileSearch className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-lg">{nc.orderId}</h4>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{nc.type} • {nc.date}</p>
                   </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="hidden sm:block text-right">
                      <p className="text-[9px] font-black uppercase text-white/20 mb-1">Impacto Previsto</p>
                      <p className="text-sm font-mono font-bold text-red-400">${nc.costImpact}</p>
                   </div>
                   <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                     nc.status === 'pending' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                   }`}>
                      {nc.status}
                   </span>
                   <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RCA & Details Panel */}
        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60 mb-4">Análisis de Causa Raíz (RCA)</h3>
          {selectedTicket ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <ClipboardList className="text-white w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Análisis 5-Porqués</h4>
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Metodología de Resolución</p>
                 </div>
              </div>

              <div className="space-y-6 relative">
                 <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5"></div>
                 {[1,2,3,4,5].map((i) => (
                   <div key={i} className="flex gap-6 relative">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20 shrink-0 z-10 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {i}
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-tighter">¿Por qué falló?</p>
                         <input 
                          type="text" 
                          placeholder="..." 
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 px-4 text-xs focus:border-blue-500 outline-none text-white/80 italic font-serif"
                         />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-10 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                 <div className="flex items-center gap-2 text-red-500 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Evidencia Fotográfica</span>
                 </div>
                 <div className="aspect-video bg-white/5 rounded-xl flex flex-col items-center justify-center border border-dashed border-white/10">
                    <ImageIcon className="w-8 h-8 text-white/10 mb-2" />
                    <span className="text-[9px] font-black text-white/20 uppercase">Subir Imagen Detalle</span>
                 </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all h-[52px]">
                   Descartar
                 </button>
                 <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 h-[52px]">
                   Cerrar Ciclo
                 </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-[500px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-10 opacity-30">
               <AlertTriangle className="w-12 h-12 mb-6 text-red-500/50" />
               <p className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Seleccione una Incidencia</p>
               <p className="text-[10px] mt-4 leading-relaxed">Para iniciar el análisis de causa raíz y definir acciones correctivas inmediatas.</p>
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
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-[2rem] p-10 shadow-2xl relative"
             >
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                      <Archive className="text-white w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-serif italic text-white">Nuevo Ticket de Calidad</h3>
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">Conexión Automática con Inventario</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Orden de Trabajo Relacionada</label>
                      <input 
                        type="text" 
                        value={newTicket.orderId}
                        onChange={e => setNewTicket({...newTicket, orderId: e.target.value})}
                        placeholder="ej: OT-2024-998"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-red-500 outline-none text-white h-[52px]"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Tipo de Defecto</label>
                        <select 
                          value={newTicket.type}
                          onChange={e => setNewTicket({...newTicket, type: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-red-500 outline-none text-white h-[52px] appearance-none"
                        >
                          <option>Dimensiones</option>
                          <option>Material</option>
                          <option>Aparariencia</option>
                          <option>Funcional</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Cantidad a Cuarentena</label>
                        <input 
                          type="number" 
                          value={newTicket.quantity}
                          onChange={e => setNewTicket({...newTicket, quantity: parseInt(e.target.value)})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-red-500 outline-none text-white h-[52px]"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-white/40 uppercase tracking-widest ml-1">Descripción del Hallazgo</label>
                      <textarea 
                        value={newTicket.description}
                        onChange={e => setNewTicket({...newTicket, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-red-500 outline-none text-white h-[100px] resize-none"
                        placeholder="Detalle la desviación observada..."
                      />
                   </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button 
                    onClick={() => setIsCreating(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold h-[52px] rounded-2xl text-[10px] uppercase tracking-widest transition-all"
                   >
                     Cancelar
                   </button>
                   <button 
                    onClick={handleCreate}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold h-[52px] rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-red-600/20"
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
