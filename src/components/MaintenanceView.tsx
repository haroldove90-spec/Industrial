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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center bg-[#010b1a] p-8 rounded-3xl border border-blue-500/20 shadow-2xl">
        <div>
          <h2 className="text-3xl font-serif italic text-white flex items-center gap-4">
            <Wrench className="text-blue-500 w-8 h-8" /> Mantenimiento Preventivo
          </h2>
          <p className="text-blue-200/40 text-xs font-bold uppercase tracking-widest mt-2">Gestión de activos y herramental</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
             <p className="text-[10px] font-black uppercase text-blue-500 mb-1">Status Global</p>
             <span className="text-sm font-bold text-white">92% Operativo</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Machine List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-500/60 mb-4">Parque de Maquinaria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MACHINES.map((machine) => (
              <div 
                key={machine.id}
                onClick={() => setSelectedMachine(machine)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
                  selectedMachine?.id === machine.id 
                    ? 'bg-blue-600/10 border-blue-500 shadow-lg' 
                    : 'bg-[#0a0a0a] border-white/5 hover:border-blue-500/40'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    machine.status === 'operational' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                  }`}>
                    <Wrench className="w-5 h-5" />
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${
                    machine.status === 'operational' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-orange-500/10 border-orange-500 text-orange-500'
                  }`}>
                    {machine.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{machine.name}</h4>
                <p className="text-xs text-white/40 mb-4">{machine.type}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <div className="text-[10px]">
                      <p className="text-white/20 uppercase font-black tracking-tighter">OEE</p>
                      <p className="text-blue-400 font-bold">{machine.oee}%</p>
                   </div>
                   <div className="text-[10px] text-right">
                      <p className="text-white/20 uppercase font-black tracking-tighter">Siguiente</p>
                      <p className="text-white/60 font-bold">{machine.nextMaintenance}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Calendar (Visual representation) */}
          <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5">
             <h3 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Calendario de Preventivos (Mayo 2024)
             </h3>
             <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-12 border rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      [4, 15, 22].includes(i+1) 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/20' 
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
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-500/60 mb-4">Ficha Técnica Detallada</h3>
          {selectedMachine ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-blue-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-blue-600 flex items-center justify-center rounded-2xl shadow-lg">
                    <History className="text-white w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold text-white">{selectedMachine.name}</h4>
                    <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">Repair History</p>
                 </div>
              </div>

              <div className="space-y-6">
                {selectedMachine.repairHistory.map((repair, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="w-px flex-1 bg-white/10 my-1"></div>
                     </div>
                     <div>
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{repair.date}</p>
                        <p className="text-sm text-white/80 font-medium mb-1">{repair.description}</p>
                        <p className="text-[10px] font-mono text-blue-400 font-bold">Coste: ${repair.cost}</p>
                     </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                 <div className="flex items-center gap-2 text-orange-500 mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Alerta de Herramental</span>
                 </div>
                 <p className="text-xs text-white/60 leading-relaxed italic">
                    Inserción en cabezal primario muestra desgaste del 85%. Recambio recomendado para evitar pérdida de precisión dimensional.
                 </p>
              </div>

              <button className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
                Programar Intervención
              </button>
            </motion.div>
          ) : (
            <div className="h-[400px] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-8 opacity-40">
              <ShieldAlert className="w-12 h-12 mb-4 text-blue-500/50" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Selecciona una máquina</p>
              <p className="text-[10px] mt-2">Para ver detalles técnicos, historial de reparaciones y alertas de desgaste.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
