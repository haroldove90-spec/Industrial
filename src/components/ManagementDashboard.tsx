/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  AlertOctagon, 
  ChevronRight, 
  FileDown, 
  Share2, 
  TrendingUp, 
  Timer,
  ShieldAlert,
  ArrowRightCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { 
  MOCK_OPERATOR_PRODUCTIVITY, 
  MOCK_QUALITY_HEATMAP, 
  MOCK_NON_CONFORMITIES 
} from '../constants';
import { NonConformity, UserRole } from '../types';

interface ManagementDashboardProps {
  role?: UserRole;
}

export default function ManagementDashboard({ role = 'admin' }: ManagementDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'kanban'>('analytics');
  const isOperator = role === 'operator';

  const OEE_DATA = [
    { name: 'Efficiency', value: 84.2 },
    { name: 'Gap', value: 15.8 },
  ];
  const COLORS = ['#2563eb', '#1A1A1A']; // Blue and Dark

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Top row: OEE & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <Timer className="w-32 h-32 text-white" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Disponibilidad Planta (OEE)</h3>
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={OEE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {OEE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-light text-white">84.2%</span>
              <span className="text-[9px] font-bold text-green-500 uppercase mt-1">↑ Excelente</span>
            </div>
          </div>
          <p className="text-[10px] text-white/40 mt-8 text-center max-w-[200px]">
             Calculado basado en Disponibilidad, Rendimiento y Calidad real.
          </p>
        </div>

        <div className="lg:col-span-2 bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Productividad por Operario (Real vs Est.)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[9px] text-white/40 uppercase font-bold">Real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                <span className="text-[9px] text-white/40 uppercase font-bold">Estimado</span>
              </div>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_OPERATOR_PRODUCTIVITY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="actual" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="estimated" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second row: Heatmap & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 shadow-2xl">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Heatmap: Incidencias de Calidad por Máquina</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_QUALITY_HEATMAP.map((item) => (
                <div 
                  key={item.machine}
                  className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${
                    item.failures > 3 
                      ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                      : 'bg-white/[0.02] border-white/5 text-white/60'
                  }`}
                >
                  <span className="text-[10px] font-black tracking-widest">{item.machine}</span>
                  <span className="text-2xl font-light">{item.failures}</span>
                  <span className="text-[9px] uppercase font-bold opacity-40">Fallas este mes</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Alertas Predictivas
           </h3>
           <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                 <div className="flex items-center gap-2 text-orange-500 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Mantenimiento Crítico</span>
                 </div>
                 <p className="text-xs text-white/80 leading-relaxed">Máquina 3 requiere cambio de rodamientos en <span className="font-bold text-orange-400 font-mono">24h</span>.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                 <div className="flex items-center gap-2 text-red-500 mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-tight">Quiebre de Stock</span>
                 </div>
                 <p className="text-xs text-white/80 leading-relaxed">Stock de Acero 304 al <span className="font-bold text-red-400 font-mono">8.5%</span>. Peligro de detención de línea.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderKanban = () => {
    const columns = [
      { id: 'pending', title: 'Pendiente', color: 'bg-red-500' },
      { id: 'analysis', title: 'En Análisis', color: 'bg-orange-500' },
      { id: 'corrective', title: 'Acción Correctiva', color: 'bg-blue-500' },
      { id: 'closed', title: 'Cerrado', color: 'bg-green-500' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
        {columns.map((col) => (
          <div key={col.id} className="bg-black/20 rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
               <div className={`w-1.5 h-1.5 rounded-full ${col.color}`}></div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/60">{col.title}</h4>
               <span className="ml-auto text-[10px] font-mono text-white/20">
                 {MOCK_NON_CONFORMITIES.filter(nc => nc.status === col.id).length}
               </span>
            </div>
            <div className="space-y-4">
              {MOCK_NON_CONFORMITIES.filter(nc => nc.status === col.id).map((nc) => (
                <motion.div 
                  layoutId={nc.id}
                  key={nc.id}
                  className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/[0.08] shadow-lg group hover:border-blue-500/40 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      nc.priority === 'urgent' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
                    }`}>
                      {nc.priority}
                    </span>
                    {!isOperator && (
                      <span className="text-[10px] font-mono text-blue-500 font-bold">${nc.costImpact.toLocaleString()} lost</span>
                    )}
                  </div>
                  <h5 className="text-sm font-medium text-white/90 mb-4 group-hover:text-white transition-colors">{nc.description}</h5>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 bg-white/5 rounded-md flex items-center justify-center">
                          <AlertOctagon className="w-3 h-3 text-white/40" />
                       </div>
                       <span className="text-[10px] font-bold text-white/40">{nc.orderId}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-blue-500 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-black text-white min-h-screen -m-8 p-12 space-y-12"
    >
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-blue-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Control Gerencial</span>
          </div>
          <h1 className="text-5xl font-serif italic mb-2">Industrial Control V.2</h1>
          <p className="text-white/40 text-sm font-medium">Análisis de rendimiento, rentabilidad y aseguramiento de calidad.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex bg-[#111] p-1 rounded-full border border-white/10">
              <button 
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                Analítica
              </button>
              <button 
                onClick={() => setActiveTab('kanban')}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'kanban' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                No Conformidades
              </button>
           </div>
           
           <div className="h-10 w-px bg-white/10 mx-2"></div>

           <div className="flex gap-2">
              <button className="p-3 bg-[#111] rounded-xl border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <FileDown className="w-5 h-5 text-white/40 group-hover:text-[#D4AF37]" />
              </button>
              <button className="p-3 bg-[#111] rounded-xl border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <Share2 className="w-5 h-5 text-white/40 group-hover:text-[#D4AF37]" />
              </button>
           </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.4 }}
        >
          {activeTab === 'analytics' ? renderAnalytics() : renderKanban()}
        </motion.div>
      </AnimatePresence>

      {/* Business Value Footer */}
      <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
        <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Optimización de Costos Activa: -14% Rechazos este Q
        </p>
        <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-tighter">
           <span>Integración Supabase Realtime</span>
           <span>AES-256 Encryption Baseline</span>
        </div>
      </div>
    </motion.div>
  );
}
