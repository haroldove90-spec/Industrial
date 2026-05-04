/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardCheck, 
  History, 
  User, 
  Wrench, 
  Package, 
  AlertCircle, 
  CheckCircle2, 
  XSquare, 
  ArrowLeft,
  Settings,
  ShieldCheck,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { WorkOrder, WOStatus } from '../types';

interface WorkOrderDetailProps {
  order: WorkOrder;
  onBack: () => void;
}

export default function WorkOrderDetail({ order, onBack }: WorkOrderDetailProps) {
  const [status, setStatus] = useState<WOStatus>(order.status);
  const [nominal, setNominal] = useState('');
  const [actual, setActual] = useState('');
  const [tolerance, setTolerance] = useState('0.05');
  const [inspectionResult, setInspectionResult] = useState<'pass' | 'fail' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-calculate result
  useEffect(() => {
    if (nominal && actual) {
      const diff = Math.abs(parseFloat(nominal) - parseFloat(actual));
      const tol = parseFloat(tolerance);
      setInspectionResult(diff <= tol ? 'pass' : 'fail');
    } else {
      setInspectionResult(null);
    }
  }, [nominal, actual, tolerance]);

  const handleSubmitInspection = () => {
    setIsSubmitting(true);
    // Simulate API call to register quality check and potentially trigger no-conformity
    setTimeout(() => {
      setIsSubmitting(false);
      if (inspectionResult === 'fail') {
        setStatus('blocked');
        alert('ADVERTENCIA: Se ha generado automáticamente una No-Conformidad en el sistema.');
      } else {
        setStatus('finished');
      }
    }, 1000);
  };

  const getStatusStyle = (s: WOStatus) => {
    switch (s) {
      case 'in_progress': return 'bg-industrial-red/10 text-industrial-red border-industrial-red/20';
      case 'quality_check': return 'bg-industrial-orange/10 text-industrial-orange border-industrial-orange/20';
      case 'finished': return 'bg-industrial-green/10 text-industrial-green border-industrial-green/20';
      case 'blocked': return 'bg-industrial-red text-white border-industrial-red';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Listado
        </button>
        <div className={`px-5 py-2 rounded-xl border text-[11px] font-black uppercase tracking-widest ${getStatusStyle(status)}`}>
          {status.replace('_', ' ')}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Basic Info & Traceability */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-industrial-border shadow-2xl">
            <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-industrial-red/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-industrial-red/20 shrink-0">
                <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8 text-industrial-red" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter truncate">{order.orderNumber}</h2>
                <p className="text-[9px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Cliente: {order.client}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 border-t border-white/5 pt-8 md:pt-10">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-industrial-red/60" />
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Operario</p>
                    <p className="text-xs md:text-sm font-bold text-white/90">{order.operator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <Wrench className="w-4 h-4 md:w-5 md:h-5 text-industrial-red/60" />
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Máquina</p>
                    <p className="text-xs md:text-sm font-bold text-white/90">{order.machine}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-industrial-red/60" />
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Material</p>
                    <p className="text-xs md:text-sm font-bold text-white/90">{order.materialUsed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-industrial-red/60" />
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Lote Trazabilidad</p>
                    <p className="text-xs md:text-sm font-mono font-black text-white/90">{order.batchNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-industrial-card p-6 md:p-10 rounded-[2.2rem] md:rounded-[2.5rem] border border-industrial-border shadow-2xl">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-white/40">
              <History className="w-4 h-4 text-industrial-red" /> Historial Operativo
            </h3>
            <div className="space-y-8">
              {[
                { time: '08:30 AM', event: 'Materia prima retirada de inventario principal.', user: 'Almacén' },
                { time: '09:15 AM', event: 'Inicio de seteo en máquina CNC-04.', user: 'Carlos Ruiz' },
                { time: '11:00 AM', event: 'Producción de primeras 50 unidades.', user: 'Carlos Ruiz' },
              ].map((h, i) => (
                <div key={i} className="flex gap-4 md:gap-6 relative">
                  <div className="text-[9px] md:text-[10px] font-black text-white/20 w-14 md:w-16 pt-1 shrink-0">{h.time}</div>
                  <div className="w-2 h-2 rounded-full bg-industrial-red mt-2 relative z-10 shrink-0 shadow-[0_0_8px_#ED1C24]"></div>
                  {i < 2 && <div className="absolute left-[70px] md:left-[80px] top-4 w-px h-10 md:h-12 bg-white/5"></div>}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white/80">{h.event}</p>
                    <p className="text-[8px] md:text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">Autorizado por: {h.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Inspection Form */}
        <div className="space-y-6 md:space-y-8">
          <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border transition-all shadow-2xl ${inspectionResult === 'fail' ? 'bg-industrial-red/5 border-industrial-red/30' : 'bg-industrial-card border-industrial-border'}`}>
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-8 md:mb-10 flex items-center gap-3 text-white/40">
              <ShieldCheck className="w-4 h-4 text-industrial-red" /> Inspección QC
            </h3>
            
            <form className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-white/40 tracking-widest ml-1">Nominal (mm)</label>
                <input 
                  type="number" 
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="50.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-industrial-red/50 outline-none font-mono text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-white/40 tracking-widest ml-1">Real (mm)</label>
                <input 
                  type="number" 
                  value={actual}
                  onChange={(e) => setActual(e.target.value)}
                  placeholder="50.02"
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-industrial-red/50 outline-none font-mono text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] md:text-[9px] font-black uppercase text-white/40 tracking-widest ml-1">Tolerancia</label>
                <select 
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-industrial-red/50 outline-none font-mono text-white appearance-none"
                >
                  <option value="0.01">± 0.01</option>
                  <option value="0.05">± 0.05</option>
                  <option value="0.1">± 0.10</option>
                </select>
              </div>

              {inspectionResult && (
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`p-4 md:p-6 rounded-xl md:rounded-[1.5rem] flex items-center gap-4 border ${
                    inspectionResult === 'pass' 
                      ? 'bg-industrial-green/10 border-industrial-green/20 text-industrial-green' 
                      : 'bg-industrial-red/20 border-industrial-red/30 text-industrial-red animate-pulse'
                  }`}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 ${inspectionResult === 'pass' ? 'bg-industrial-green/20' : 'bg-industrial-red/20'}`}>
                    {inspectionResult === 'pass' ? <CheckCircle2 className="w-5 h-5" /> : <XSquare className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">{inspectionResult === 'pass' ? 'DICTAMEN: PASA' : 'DICTAMEN: NO PASA'}</p>
                    <p className="text-[8px] md:text-[9px] opacity-60 font-medium uppercase tracking-tight mt-0.5">Validación de rangos.</p>
                  </div>
                </motion.div>
              )}

              <button 
                type="button"
                disabled={!inspectionResult || isSubmitting}
                onClick={handleSubmitInspection}
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.3em] text-[9px] md:text-[10px] transition-all shadow-2xl ${
                  !inspectionResult 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                    : 'bg-industrial-red text-white hover:bg-red-500 shadow-industrial-red/20 active:scale-95'
                }`}
              >
                {isSubmitting ? 'REGISTRANDO...' : 'REGISTRAR INSPECCIÓN'}
              </button>
            </form>

            {inspectionResult === 'fail' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 md:mt-8 border-t border-white/5 pt-6 md:pt-8"
              >
                <button className="w-full flex items-center justify-center gap-3 text-industrial-red bg-industrial-red/10 p-4 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-industrial-red/20 transition-all border border-industrial-red/20">
                  <AlertTriangle className="w-4 h-4" /> Generar NC Automática
                </button>
              </motion.div>
            )}
          </div>

          {/* Quick Stats Sidebar */}
          <div className="bg-industrial-red p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white space-y-6 md:space-y-8 shadow-2xl shadow-industrial-red/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
               <Activity className="w-32 h-32 md:w-40 md:h-40 text-black" />
            </div>
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/60 relative z-10">Resumen Operativo</h4>
            <div className="space-y-4 md:space-y-6 relative z-10 font-bold uppercase">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-[8px] md:text-[10px] font-black text-white/40">Ciclo</span>
                <span className="text-xs md:text-sm">12.5 s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[8px] md:text-[10px] font-black text-white/40">OEE</span>
                <span className="text-xs md:text-sm">92.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
