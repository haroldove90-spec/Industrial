/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Wrench, 
  Clock, 
  History, 
  AlertTriangle, 
  ShieldAlert,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { MOCK_MACHINES, MOCK_MAINTENANCE_SCHEDULE } from '../constants';
import { Machine } from '../types';

export default function MaintenanceView() {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [machines, setMachines] = useState<Machine[]>(MOCK_MACHINES);

  const handleScheduleIntervention = () => {
    if (!selectedMachine) return;
    
    setIsScheduling(true);
    // Simulate server processing
    setTimeout(() => {
      setIsScheduling(false);
      setMachines(prev => prev.map(m => 
        m.id === selectedMachine.id 
          ? { ...m, status: 'maintenance' } 
          : m
      ));
      setSelectedMachine(prev => prev ? { ...prev, status: 'maintenance' } : null);
      alert(`Intervención técnica programada para ${selectedMachine.name}. El equipo ha sido notificado.`);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-industrial-card p-6 md:p-8 rounded-3xl border border-industrial-red/20 shadow-2xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif italic text-white flex items-center gap-4">
            <Wrench className="text-industrial-red w-6 h-6 md:w-8 md:h-8" /> Mantenimiento Preventivo
          </h2>
          <p className="text-industrial-red/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">Gestión de activos y herramental</p>
        </div>
        <div className="flex gap-4 self-end sm:self-auto">
          <div className="text-right">
             <p className="text-[10px] font-black uppercase text-industrial-red mb-1">Status Global</p>
             <span className="text-xs md:text-sm font-bold text-white">92% Operativo</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Machine List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-industrial-red/60 mb-4">Parque de Maquinaria</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {machines.map((machine) => (
              <div 
                key={machine.id}
                onClick={() => setSelectedMachine(machine)}
                className={`p-5 md:p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  selectedMachine?.id === machine.id 
                    ? 'bg-industrial-red/10 border-industrial-red shadow-lg' 
                    : 'bg-industrial-card border-white/5 hover:border-industrial-red/40'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      machine.status === 'operational' ? 'bg-industrial-green/10 text-industrial-green' : 
                      machine.status === 'maintenance' ? 'bg-industrial-red/10 text-industrial-red' :
                      'bg-industrial-orange/10 text-industrial-orange'
                    }`}>
                      <Wrench className="w-5 h-5" />
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${
                      machine.status === 'operational' ? 'bg-industrial-green/10 border-industrial-green text-industrial-green' : 
                      machine.status === 'maintenance' ? 'bg-industrial-red/10 border-industrial-red text-industrial-red' :
                      'bg-industrial-orange/10 border-industrial-orange text-industrial-orange'
                    }`}>
                      {machine.status}
                    </span>
                  </div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-1">{machine.name}</h4>
                  <p className="text-[10px] md:text-xs text-white/40 mb-4">{machine.type}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="text-[9px] md:text-[10px]">
                      <p className="text-white/20 uppercase font-black tracking-tighter">OEE</p>
                      <p className="text-industrial-red font-bold">{machine.oee}%</p>
                   </div>
                   <div className="text-[9px] md:text-[10px] text-right">
                      <p className="text-white/20 uppercase font-black tracking-tighter">Siguiente</p>
                      <p className="text-white/60 font-bold">{machine.nextMaintenance}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Calendar (Visual representation) */}
          <div className="bg-industrial-card p-6 md:p-8 rounded-3xl border border-white/5">
             <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-industrial-orange mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Calendario de Preventivos (Mayo 2024)
             </h3>
             <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => (
                   <div 
                    key={i} 
                    className={`h-10 md:h-12 border rounded-lg flex items-center justify-center text-[9px] md:text-[10px] font-bold ${
                      [4, 15, 22].includes(i+1) 
                        ? 'bg-industrial-red border-industrial-red text-white shadow-lg shadow-industrial-red/20' 
                        : 'bg-white/[0.02] border-white/5 text-white/20'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Technical Sheet / Details */}
        <div className="space-y-6">
          <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-industrial-red/60 mb-4">Ficha Técnica Detallada</h3>
          {selectedMachine ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-industrial-card border border-industrial-red/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-red/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-red flex items-center justify-center rounded-2xl shadow-lg shrink-0">
                    <History className="text-white w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <div>
                    <h4 className="text-lg md:text-xl font-bold text-white line-clamp-1">{selectedMachine.name}</h4>
                    <p className="text-[8px] md:text-[10px] font-black uppercase text-industrial-red tracking-[0.2em]">Repair History</p>
                 </div>
              </div>

              <div className="space-y-6">
                {selectedMachine.repairHistory.map((repair, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-industrial-red shrink-0"></div>
                        <div className="w-px flex-1 bg-white/10 my-1"></div>
                     </div>
                     <div>
                        <p className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-widest">{repair.date}</p>
                        <p className="text-xs md:text-sm text-white/80 font-medium mb-1">{repair.description}</p>
                        <p className="text-[9px] md:text-[10px] font-mono text-industrial-red font-bold">Coste: ${repair.cost}</p>
                     </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-industrial-orange/10 border border-industrial-orange/20 rounded-xl">
                 <div className="flex items-center gap-2 text-industrial-orange mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tight">Alerta Herramental</span>
                 </div>
                 <p className="text-[10px] md:text-xs text-white/60 leading-relaxed italic">
                    Recambio recomendado para evitar pérdida de precisión dimensional por desgaste.
                 </p>
              </div>

              <button 
                onClick={handleScheduleIntervention}
                disabled={isScheduling || selectedMachine.status === 'maintenance'}
                className={`w-full mt-8 text-white font-bold py-4 rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl ${
                  selectedMachine.status === 'maintenance'
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-industrial-red hover:bg-red-500 shadow-industrial-red/20'
                }`}
              >
                {isScheduling ? 'Procesando...' : selectedMachine.status === 'maintenance' ? 'En Mantenimiento' : 'Programar Intervención'}
              </button>
            </motion.div>
          ) : (
            <div className="h-[300px] md:h-[400px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-6 md:p-8 opacity-40">
              <ShieldAlert className="w-10 md:w-12 h-10 md:h-12 mb-4 text-industrial-red/50" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Selecciona una máquina</p>
              <p className="text-[8px] md:text-[10px] mt-2">Para ver detalles técnicos e historial de reparaciones.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
