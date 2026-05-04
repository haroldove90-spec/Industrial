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
  Zap,
  CheckCircle2,
  DollarSign
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
    { name: 'Efficiency', value: 35 },
    { name: 'Gap', value: 65 },
  ];
  const COLORS = ['#ED1C24', '#1c1c1c'];

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* World Map Section - Bento Card */}
      <div className="lg:col-span-2 md:row-span-2 bg-industrial-card p-10 rounded-[3rem] border border-industrial-border shadow-2xl relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-10">
             <span className="text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-4 py-2 rounded-full">Buyer Location</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative opacity-80 min-h-[300px]">
             {/* Simplified Map Visualization */}
             <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-no-repeat bg-center invert opacity-10"></div>
             {/* Pins */}
             <div className="absolute top-1/4 left-1/4 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-green text-white text-[10px] font-bold px-2 py-1 rounded-md mb-1">65</div>
                <div className="w-2 h-2 bg-industrial-green rounded-full shadow-[0_0_10px_#10b981]"></div>
             </div>
             <div className="absolute top-1/2 left-1/3 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-orange text-white text-[10px] font-bold px-2 py-1 rounded-md mb-1">250</div>
                <div className="w-2 h-2 bg-industrial-orange rounded-full shadow-[0_0_10px_#f59e0b]"></div>
             </div>
             <div className="absolute top-1/3 right-1/4 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-orange text-white text-[10px] font-bold px-2 py-1 rounded-md mb-1">45</div>
                <div className="w-2 h-2 bg-industrial-orange rounded-full shadow-[0_0_10px_#f59e0b]"></div>
             </div>
          </div>
          <div className="mt-auto flex justify-between items-center">
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-industrial-green rounded-full"></div>
                   <span className="text-[10px] text-white/40 uppercase font-black">Lorem Ipsum</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-industrial-orange rounded-full"></div>
                   <span className="text-[10px] text-white/40 uppercase font-black">Dolor Sit Amet</span>
                </div>
             </div>
             <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 flex items-center gap-3">
                <Timer className="w-3 h-3 text-white/40" />
                <span className="text-[9px] font-black uppercase text-white/40">Sunday, 8 June 2024</span>
             </div>
          </div>
      </div>

       {/* Progress Section */}
      <div className="lg:col-span-1 bg-industrial-card p-10 rounded-[3rem] border border-industrial-border shadow-2xl space-y-10">
          <div className="flex justify-between items-center text-white/40">
             <span className="text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-4 py-2 rounded-full">Performance Metrics</span>
          </div>
           <div className="space-y-8">
             {[
               { label: 'OEE Total', value: 88, color: 'bg-industrial-red' },
               { label: 'Disponibilidad', value: 92, color: 'bg-industrial-purple' },
               { label: 'Calidad', value: 98, color: 'bg-industrial-green' },
               { label: 'Rendimiento', value: 85, color: 'bg-industrial-orange' }
             ].map((item, id) => (
               <div key={id} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>{item.label}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-white">{item.value}%</span>
                        <TrendingUp className="w-3 h-3 text-industrial-green" />
                     </div>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        className={`h-full ${item.color} rounded-full shadow-[0_0_12px_currentColor] brightness-125`}
                     ></motion.div>
                  </div>
               </div>
             ))}
          </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-industrial-card p-10 rounded-[3rem] border border-industrial-border shadow-2xl">
          <div className="flex justify-between items-start mb-10">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Wallet</span>
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                <DollarSign className="w-6 h-6 text-industrial-red" />
             </div>
          </div>
          <div className="flex items-center justify-between mb-8">
             <span className="text-4xl font-black tracking-tighter text-white font-mono">$ 3,500</span>
             <div className="w-10 h-10 bg-industrial-orange/20 rounded-xl flex items-center justify-center border border-industrial-orange/30">
                <TrendingUp className="w-5 h-5 text-industrial-orange" />
             </div>
          </div>
          <div className="h-24 bg-white/5 rounded-3xl border border-white/5 p-4 flex items-center gap-4">
             <div className="w-12 h-12 bg-industrial-green/20 rounded-2xl flex items-center justify-center">
                <ArrowRightCircle className="w-6 h-6 text-industrial-green" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-white/20">Annual Growth</p>
                <p className="text-lg font-bold">+24.5%</p>
             </div>
          </div>
      </div>

       {/* Stock Doughnut */}
      <div className="bg-industrial-card p-8 rounded-[3rem] border border-industrial-border shadow-2xl flex flex-col items-center justify-center relative">
          <div className="absolute top-8 left-8">
             <span className="text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-4 py-1.5 rounded-full">Live Operations</span>
          </div>
          <div className="relative w-48 h-48 mt-10">
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
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#ED1C24" />
                  <Cell fill="#2a2a2a" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">1650</span>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Stock</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2 mt-6">
             {['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'].map((item, idx) => (
               <div key={idx} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-industrial-red' : idx === 1 ? 'bg-purple-500' : idx === 2 ? 'bg-industrial-green' : 'bg-industrial-orange'}`}></div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{item}</span>
               </div>
             ))}
          </div>
      </div>

      {/* Bar Chart Section */}
      <div className="lg:col-span-2 bg-industrial-card p-10 rounded-[3rem] border border-industrial-border shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-10">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Annual Information</span>
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                <Timer className="w-3 h-3 text-white/20" />
                <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">4 Months</span>
             </div>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_OPERATOR_PRODUCTIVITY.slice(0, 4)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <Bar dataKey="actual" radius={[4, 4, 0, 0]} barSize={12}>
                    {MOCK_OPERATOR_PRODUCTIVITY.map((_, index) => (
                       <Cell key={`cell-${index}`} fill={index === 0 ? '#ED1C24' : index === 1 ? '#9c27b0' : index === 2 ? '#00FF00' : '#00bcd4'} />
                     ))}
                 </Bar>
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }}
                   dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1c1c1c', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-2 py-2">
                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-industrial-red' : idx === 1 ? 'bg-purple-500' : idx === 2 ? 'bg-industrial-green' : 'bg-industrial-orange'}`}></div>
                    <span className="text-[9px] font-black uppercase tracking-tighter text-white/40">{item}</span>
                 </div>
              ))}
          </div>
      </div>
    </div>
  );

  const renderKanban = () => {
    const columns = [
      { id: 'pending', title: 'Pendiente', color: 'bg-industrial-red' },
      { id: 'analysis', title: 'En Análisis', color: 'bg-industrial-orange' },
      { id: 'corrective', title: 'Acción Correctiva', color: 'bg-indigo-500' },
      { id: 'closed', title: 'Cerrado', color: 'bg-industrial-green' },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[600px]">
        {columns.map((col) => (
          <div key={col.id} className="bg-industrial-card rounded-[2.5rem] p-8 border border-industrial-border shadow-xl">
            <div className="flex items-center gap-3 mb-8">
               <div className={`w-2 h-2 rounded-full ${col.color} shadow-[0_0_10px_currentColor]`}></div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">{col.title}</h4>
               <span className="ml-auto text-[10px] font-black text-white/10 uppercase">
                 {MOCK_NON_CONFORMITIES.filter(nc => nc.status === col.id).length} Items
               </span>
            </div>
            <div className="space-y-4">
              {MOCK_NON_CONFORMITIES.filter(nc => nc.status === col.id).map((nc) => (
                <motion.div 
                  layoutId={nc.id}
                  key={nc.id}
                  className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-lg group hover:border-industrial-red/40 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                      nc.priority === 'urgent' ? 'bg-industrial-red text-white' : 'bg-white/10 text-white/40'
                    }`}>
                      {nc.priority}
                    </span>
                    {!isOperator && (
                      <span className="text-[10px] font-black text-industrial-red">$ {nc.costImpact.toLocaleString()}</span>
                    )}
                  </div>
                  <h5 className="text-sm font-bold text-white mb-6 group-hover:translate-x-1 transition-transform">{nc.description}</h5>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-white/20 tracking-tighter uppercase">{nc.orderId}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-industrial-red transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOperatorPanel = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-64 bg-industrial-red rounded-[3rem] flex flex-col items-center justify-center gap-6 shadow-2xl shadow-industrial-red/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
           <Zap className="w-48 h-48 text-white" />
        </div>
        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl">
           <Timer className="w-10 h-10 text-white" />
        </div>
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-2 block">Producción Activa</span>
          <span className="text-3xl font-black italic text-white uppercase tracking-tighter">REANUDAR TURNO</span>
        </div>
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-64 bg-industrial-card border border-industrial-border rounded-[3rem] flex flex-col items-center justify-center gap-6 shadow-2xl hover:border-industrial-orange/40 transition-all group"
      >
        <div className="w-20 h-20 bg-industrial-orange/10 rounded-3xl flex items-center justify-center">
           <AlertTriangle className="w-10 h-10 text-industrial-orange" />
        </div>
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 block">Mantenimiento</span>
          <span className="text-3xl font-black italic text-white group-hover:text-industrial-orange transition-colors uppercase tracking-tighter">REPORTAR FALLA</span>
        </div>
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-64 bg-industrial-card border border-industrial-border rounded-[3rem] flex flex-col items-center justify-center gap-6 shadow-2xl hover:border-industrial-green/40 transition-all group"
      >
        <div className="w-20 h-20 bg-industrial-green/10 rounded-3xl flex items-center justify-center">
           <CheckCircle2 className="w-10 h-10 text-industrial-green" />
        </div>
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 block">Checklist</span>
          <span className="text-3xl font-black italic text-white group-hover:text-industrial-green transition-colors uppercase tracking-tighter">INSPECCIÓN DIARIA</span>
        </div>
      </motion.button>

      {/* Machine Status for Operator */}
      <div className="lg:col-span-3 bg-industrial-card p-10 rounded-[3.5rem] border border-industrial-border mt-4">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 bg-industrial-red/10 rounded-[2rem] flex items-center justify-center border-2 border-industrial-red/20 shadow-[0_0_20px_rgba(217,43,43,0.1)]">
                  <Zap className="w-10 h-10 text-industrial-red" />
               </div>
               <div>
                  <h3 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">Torno CNC-04</h3>
                  <div className="flex items-center gap-4">
                     <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-industrial-green">
                        <div className="w-2 h-2 rounded-full bg-industrial-green animate-pulse"></div> Operación Estable
                     </span>
                     <span className="text-white/20">|</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/20">OEE: 88%</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="px-10 py-6 bg-white/5 rounded-[2rem] border border-white/5 text-center shadow-inner">
                  <p className="text-[9px] font-black uppercase text-white/20 mb-1 tracking-widest">Producción</p>
                  <p className="text-3xl font-black">142<span className="text-white/20">/</span>200</p>
               </div>
               <div className="px-10 py-6 bg-white/5 rounded-[2rem] border border-white/5 text-center shadow-inner">
                  <p className="text-[9px] font-black uppercase text-white/20 mb-1 tracking-widest">Ciclo</p>
                  <p className="text-3xl font-black">04:12</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0d0d0d] text-white min-h-screen -m-8 p-12 space-y-12"
    >
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-industrial-red"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-red">
              {isOperator ? 'Terminal de Planta' : 'Industrial Control Center'}
            </span>
          </div>
          <h1 className="text-5xl font-black italic mb-2">
            {isOperator ? 'Terminal Operativa' : 'Industrial Control'}
          </h1>
          <p className="text-white/40 text-sm font-medium">
            {isOperator 
              ? 'Interfaz simplificada para operación y registro táctil en planta.' 
              : 'Análisis de rendimiento, rentabilidad y aseguramiento de calidad.'
            }
          </p>
        </div>

        {!isOperator && (
          <div className="flex items-center gap-4">
            <div className="flex bg-[#111] p-1 rounded-full border border-white/10">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'analytics' ? 'bg-industrial-red text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Analítica
                </button>
                <button 
                  onClick={() => setActiveTab('kanban')}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'kanban' ? 'bg-industrial-red text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  No Conformidades
                </button>
            </div>
            
            <div className="h-10 w-px bg-white/10 mx-2"></div>

            <div className="flex gap-2">
                <button className="p-3 bg-[#111] rounded-xl border border-white/10 hover:border-industrial-red/40 transition-all group">
                  <FileDown className="w-5 h-5 text-white/40 group-hover:text-industrial-red" />
                </button>
                <button className="p-3 bg-[#111] rounded-xl border border-white/10 hover:border-industrial-red/40 transition-all group">
                  <Share2 className="w-5 h-5 text-white/40 group-hover:text-industrial-red" />
                </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab + (isOperator ? '-op' : '-mgmt')}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.4 }}
        >
          {isOperator ? renderOperatorPanel() : (activeTab === 'analytics' ? renderAnalytics() : renderKanban())}
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
