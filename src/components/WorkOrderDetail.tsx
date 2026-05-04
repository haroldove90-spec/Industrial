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
  AlertTriangle
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
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'quality_check': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'finished': return 'bg-green-50 text-green-700 border-green-200';
      case 'blocked': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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
          className="flex items-center gap-2 text-natural-accent font-bold uppercase text-[10px] tracking-widest hover:text-natural-sidebar transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Listado
        </button>
        <div className={`px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest ${getStatusStyle(status)}`}>
          {status.replace('_', ' ')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Basic Info & Traceability */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-natural-border shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-natural-bg rounded-xl">
                <ClipboardCheck className="w-6 h-6 text-natural-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-serif italic text-natural-sidebar">Detalles de {order.orderNumber}</h2>
                <p className="text-xs text-natural-text/40 font-bold uppercase tracking-widest">Cliente: {order.client}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-natural-border pt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-natural-accent" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-natural-text/40">Operario Responsable</p>
                    <p className="text-sm font-bold">{order.operator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-natural-accent" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-natural-text/40">Maquinaria Asignada</p>
                    <p className="text-sm font-bold">{order.machine}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-natural-accent" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-natural-text/40">Materia Prima</p>
                    <p className="text-sm font-bold">{order.materialUsed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-natural-accent" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-natural-text/40">Lote de Trazabilidad</p>
                    <p className="text-sm font-mono font-bold">{order.batchNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-natural-border shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <History className="w-4 h-4 text-natural-accent" /> Historial de Trazabilidad
            </h3>
            <div className="space-y-6">
              {[
                { time: '08:30 AM', event: 'Materia prima retirada de inventario principal.', user: 'Almacén' },
                { time: '09:15 AM', event: 'Inicio de seteo en máquina CNC-04.', user: 'Carlos Ruiz' },
                { time: '11:00 AM', event: 'Producción de primeras 50 unidades.', user: 'Carlos Ruiz' },
              ].map((h, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="text-[10px] font-mono font-bold text-natural-text/40 w-16 pt-1">{h.time}</div>
                  <div className="w-2 h-2 rounded-full bg-natural-accent mt-1.5 relative z-10 shrink-0"></div>
                  {i < 2 && <div className="absolute left-[75px] top-4 w-px h-8 bg-natural-border"></div>}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.event}</p>
                    <p className="text-[10px] text-natural-text/40 italic">Autorizado por: {h.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Inspection Form */}
        <div className="space-y-8">
          <div className={`p-8 rounded-2xl border transition-all shadow-sm ${inspectionResult === 'fail' ? 'bg-red-50 border-red-200' : 'bg-white border-natural-border'}`}>
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-natural-accent" /> Inspección de Calidad
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-natural-text/40 mb-1 block">Medida Nominal (mm)</label>
                <input 
                  type="number" 
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Ej: 50.00"
                  className="w-full bg-natural-bg/50 border border-natural-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-natural-accent outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-natural-text/40 mb-1 block">Medida Real (mm)</label>
                <input 
                  type="number" 
                  value={actual}
                  onChange={(e) => setActual(e.target.value)}
                  placeholder="Ej: 50.02"
                  className="w-full bg-natural-bg/50 border border-natural-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-natural-accent outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-natural-text/40 mb-1 block">Tolerancia (±mm)</label>
                <select 
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                  className="w-full bg-natural-bg/50 border border-natural-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-natural-accent outline-none font-mono"
                >
                  <option value="0.01">± 0.01 (Alta Precisión)</option>
                  <option value="0.05">± 0.05 (Estándar)</option>
                  <option value="0.1">± 0.10 (General)</option>
                </select>
              </div>

              {inspectionResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-6 p-4 rounded-xl flex items-center gap-4 border ${
                    inspectionResult === 'pass' 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-red-100 border-red-300 text-red-800'
                  }`}
                >
                  {inspectionResult === 'pass' ? <CheckCircle2 className="w-6 h-6" /> : <XSquare className="w-6 h-6" />}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">{inspectionResult === 'pass' ? 'DICTAMEN: PASA' : 'DICTAMEN: NO PASA'}</p>
                    <p className="text-[10px] opacity-80">{inspectionResult === 'pass' ? 'Dentro de los rangos de tolerancia permitidos.' : 'Fuera de rango dimensional.'}</p>
                  </div>
                </motion.div>
              )}

              <button 
                type="button"
                disabled={!inspectionResult || isSubmitting}
                onClick={handleSubmitInspection}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                  !inspectionResult 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-natural-sidebar text-white hover:bg-natural-accent shadow-lg shadow-natural-sidebar/20 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Procesando...' : 'Registrar Inspección'}
              </button>
            </form>

            {inspectionResult === 'fail' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 border-t border-red-200 pt-6"
              >
                <button className="w-full flex items-center justify-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg text-xs font-bold uppercase tracking-tight hover:bg-red-200 transition-colors">
                  <AlertTriangle className="w-4 h-4" /> Levantar Reclamo a Calidad
                </button>
              </motion.div>
            )}
          </div>

          {/* Quick Stats Sidebar */}
          <div className="bg-natural-sidebar p-8 rounded-2xl text-white space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-natural-light-accent">Resumen Operacional</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs opacity-60">Tiempo de Ciclo</span>
                <span className="text-xs font-mono font-bold">12.5 seg/unid</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs opacity-60">Meta de Producción</span>
                <span className="text-xs font-mono font-bold">500 Unid.</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-60">Eficiencia Actual</span>
                <span className="text-xs font-mono font-bold text-natural-light-accent">92.4%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
