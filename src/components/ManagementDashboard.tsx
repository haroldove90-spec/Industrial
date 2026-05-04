/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  DollarSign,
  X,
  ClipboardList,
  Check
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

  // Operator Simulation State
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [shiftSeconds, setShiftSeconds] = useState(0);
  const [showFaultModal, setShowFaultModal] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [isInspected, setIsInspected] = useState(false);
  const [isSendingFault, setIsSendingFault] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isShiftActive) {
      interval = setInterval(() => {
        setShiftSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReportFault = () => {
    setIsSendingFault(true);
    setTimeout(() => {
      setIsSendingFault(false);
      setShowFaultModal(false);
      alert("Alerta enviada correctamente al equipo de mantenimiento.");
    }, 1500);
  };

  const completeChecklist = () => {
    setIsInspected(true);
    setShowChecklistModal(false);
  };

  const OEE_DATA = [
    { name: 'Efficiency', value: 35 },
    { name: 'Gap', value: 65 },
  ];
  const COLORS = ['#ED1C24', '#1E1E1E'];

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {/* World Map Section - Bento Card */}
      <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-industrial-border shadow-2xl relative overflow-hidden flex flex-col min-h-[400px] md:min-h-0">
          <div className="flex justify-between items-center mb-6 md:mb-10">
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full">Buyer Location</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative min-h-[250px] md:min-h-[300px]">
             {/* Simplified Map Visualization */}
             <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-no-repeat bg-center invert opacity-40 brightness-200 contrast-125"></div>
             {/* Pins with enhanced visibility */}
             <div className="absolute top-1/4 left-1/4 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-green text-black text-[10px] font-black px-2 py-1 rounded-md mb-1 shadow-lg shadow-industrial-green/50">65</div>
                <div className="w-3 h-3 bg-industrial-green rounded-full shadow-[0_0_15px_#00C853] animate-pulse"></div>
             </div>
             <div className="absolute top-1/2 left-1/3 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-orange text-black text-[10px] font-black px-2 py-1 rounded-md mb-1 shadow-lg shadow-industrial-orange/50">250</div>
                <div className="w-3 h-3 bg-industrial-orange rounded-full shadow-[0_0_15px_#FFB300] animate-pulse"></div>
             </div>
             <div className="absolute top-1/3 right-1/4 w-8 h-8 flex flex-col items-center">
                <div className="bg-industrial-red text-white text-[10px] font-black px-2 py-1 rounded-md mb-1 shadow-lg shadow-industrial-red/50">45</div>
                <div className="w-3 h-3 bg-industrial-red rounded-full shadow-[0_0_15px_#ED1C24] animate-pulse"></div>
             </div>
          </div>
          <div className="mt-6 md:mt-auto flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 bg-industrial-green rounded-full"></div>
                   <span className="text-[9px] text-white/40 uppercase font-black">Efficient</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 bg-industrial-orange rounded-full"></div>
                   <span className="text-[9px] text-white/40 uppercase font-black">Warning</span>
                </div>
             </div>
             <div className="bg-white/5 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 scale-90">
                <Timer className="w-3 h-3 text-white/40" />
                <span className="text-[8px] font-black uppercase text-white/40">June 2024</span>
             </div>
          </div>
      </div>

       {/* Progress Section */}
      <div className="lg:col-span-1 bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-industrial-border shadow-2xl space-y-6 md:space-y-10">
          <div className="flex justify-between items-center text-white/40">
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full">Performance</span>
          </div>
           <div className="space-y-6 md:space-y-8">
             {[
               { label: 'OEE Total', value: 88, color: 'bg-industrial-red' },
               { label: 'Disponibilidad', value: 92, color: 'bg-industrial-purple' },
               { label: 'Calidad', value: 98, color: 'bg-industrial-green' },
               { label: 'Rendimiento', value: 85, color: 'bg-industrial-orange' }
             ].map((item, id) => (
               <div key={id} className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>{item.label}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-white">{item.value}%</span>
                        <TrendingUp className="w-3 h-3 text-industrial-green" />
                     </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        className={`h-full ${item.color} rounded-full brightness-125`}
                     ></motion.div>
                  </div>
               </div>
             ))}
          </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-industrial-border shadow-2xl">
          <div className="flex justify-between items-start mb-6 md:mb-10">
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20">Wallet</span>
             <div className="w-10 md:w-12 h-10 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10">
                <DollarSign className="w-5 md:w-6 h-5 md:h-6 text-industrial-red" />
             </div>
          </div>
          <div className="flex items-center justify-between mb-6 md:mb-8">
             <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white font-mono">$ 3,500</span>
             <div className="w-8 md:w-10 h-8 md:h-10 bg-industrial-orange/20 rounded-lg md:rounded-xl flex items-center justify-center border border-industrial-orange/30">
                <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-industrial-orange" />
             </div>
          </div>
          <div className="h-20 md:h-24 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 p-3 md:p-4 flex items-center gap-3 md:gap-4">
             <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-green/20 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                <ArrowRightCircle className="w-5 md:w-6 h-5 md:h-6 text-industrial-green" />
             </div>
             <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase text-white/20">Growth</p>
                <p className="text-base md:text-lg font-bold tracking-tight">+24.5%</p>
             </div>
          </div>
      </div>

       {/* Stock Doughnut */}
      <div className="bg-industrial-card p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-industrial-border shadow-2xl flex flex-col items-center justify-center relative">
          <div className="absolute top-6 md:top-8 left-6 md:left-8">
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-industrial-red bg-industrial-red/10 px-3 md:px-4 py-1.5 rounded-full">Live Stats</span>
          </div>
          <div className="relative w-36 md:w-48 h-36 md:h-48 mt-8 md:mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={OEE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#ED1C24" />
                  <Cell fill="#1E1E1E" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl md:text-3xl font-black text-white">1650</span>
              <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Pcs</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-2 mt-6">
             {['Units', 'WIP', 'Ready', 'Shipped'].map((item, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-industrial-red' : idx === 1 ? 'bg-purple-500' : idx === 2 ? 'bg-industrial-green' : 'bg-industrial-orange'}`}></div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20 truncate">{item}</span>
               </div>
             ))}
          </div>
      </div>

      {/* Bar Chart Section */}
      <div className="md:col-span-2 bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-industrial-border shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-8 md:mb-10">
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20">Annual Flow</span>
             <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <Timer className="w-3 h-3 text-white/20" />
                <span className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Q1-Q2</span>
             </div>
          </div>
          <div className="h-[200px] md:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_OPERATOR_PRODUCTIVITY.slice(0, 4)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <Bar dataKey="actual" radius={[4, 4, 0, 0]} barSize={12}>
                    {MOCK_OPERATOR_PRODUCTIVITY.map((_, index) => (
                       <Cell key={`cell-${index}`} fill={index === 0 ? '#ED1C24' : index === 1 ? '#9C27B0' : index === 2 ? '#00C853' : '#2979FF'} />
                     ))}
                 </Bar>
                <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#ffffff80', fontSize: 9, fontWeight: 900 }}
                   dy={10}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Line A', 'Line B', 'Line C', 'Line D'].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-1.5 py-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-industrial-red' : idx === 1 ? 'bg-purple-500' : idx === 2 ? 'bg-industrial-green' : 'bg-industrial-orange'}`}></div>
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter text-white/40">{item}</span>
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
      { id: 'corrective', title: 'Acción Correctiva', color: 'bg-industrial-red' },
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsShiftActive(!isShiftActive)}
        className={`h-48 md:h-64 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center gap-4 md:gap-6 shadow-2xl relative overflow-hidden group transition-colors ${
          isShiftActive ? 'bg-industrial-green' : 'bg-industrial-red'
        }`}
      >
        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700">
           <Zap className="w-32 md:w-48 h-32 md:h-48 text-white" />
        </div>
        <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center backdrop-blur-xl">
           <Timer className={`w-8 md:w-10 h-8 md:h-10 text-white ${isShiftActive ? 'animate-spin-slow' : ''}`} />
        </div>
        <div className="text-center px-4">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60 mb-1 md:mb-2 block">
            {isShiftActive ? formatTime(shiftSeconds) : 'Producción Activa'}
          </span>
          <span className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter">
            {isShiftActive ? 'PAUSAR TURNO' : 'REANUDAR TURNO'}
          </span>
        </div>
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFaultModal(true)}
        className="h-48 md:h-64 bg-industrial-card border border-industrial-border rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center gap-4 md:gap-6 shadow-2xl hover:border-industrial-orange/40 transition-all group"
      >
        <div className="w-16 md:w-20 h-16 md:h-20 bg-industrial-orange/10 rounded-2xl md:rounded-3xl flex items-center justify-center">
           <AlertTriangle className="w-8 md:w-10 h-8 md:h-10 text-industrial-orange" />
        </div>
        <div className="text-center px-4">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/20 mb-1 md:mb-2 block">Mantenimiento</span>
          <span className="text-xl md:text-3xl font-black italic text-white group-hover:text-industrial-orange transition-colors uppercase tracking-tighter">REPORTAR FALLA</span>
        </div>
      </motion.button>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowChecklistModal(true)}
        className={`h-48 md:h-64 border rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center gap-4 md:gap-6 shadow-2xl transition-all group ${
          isInspected ? 'bg-industrial-green/5 border-industrial-green/40' : 'bg-industrial-card border-industrial-border hover:border-industrial-green/40'
        }`}
      >
        <div className={`w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center ${isInspected ? 'bg-industrial-green text-white' : 'bg-industrial-green/10 text-industrial-green'}`}>
           <CheckCircle2 className="w-8 md:w-10 h-8 md:h-10" />
        </div>
        <div className="text-center px-4">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/20 mb-1 md:mb-2 block">
            {isInspected ? 'VERIFICADO HOY' : 'Checklist'}
          </span>
          <span className="text-xl md:text-3xl font-black italic text-white group-hover:text-industrial-green transition-colors uppercase tracking-tighter">
            {isInspected ? 'O.K. CERTIFICADO' : 'INSPECCIÓN DIARIA'}
          </span>
        </div>
      </motion.button>

      {/* Modals for Simulation */}
      <AnimatePresence>
        {showFaultModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-industrial-card border border-white/10 w-full max-w-lg rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <AlertOctagon className="w-5 md:w-6 h-5 md:h-6 text-industrial-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Reportar Falla Crítica</h3>
                    <p className="text-[8px] md:text-[10px] uppercase font-black tracking-widest text-white/20">Aviso Inmediato a Mantenimiento</p>
                  </div>
                </div>
                <button onClick={() => setShowFaultModal(false)} className="text-white/20 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                {['Error de Hidráulica', 'Falla Eléctrica (Motores)', 'Desviación de Calidad', 'Falta de Material'].map((issue, idx) => (
                  <button 
                    key={idx}
                    className="w-full text-left p-4 md:p-6 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl hover:border-industrial-orange/50 hover:bg-industrial-orange/5 transition-all text-sm font-bold flex justify-between items-center group"
                  >
                    {issue}
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-industrial-orange" />
                  </button>
                ))}
              </div>

              <button 
                onClick={handleReportFault}
                disabled={isSendingFault}
                className="w-full bg-industrial-orange text-black font-black uppercase text-xs py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-industrial-orange/20 flex items-center justify-center gap-3"
              >
                {isSendingFault ? (
                   <>
                    <Timer className="w-4 h-4 animate-spin" />
                    Enviando Alerta...
                   </>
                ) : 'Confirmar Reporte'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {showChecklistModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-industrial-card border border-white/10 w-full max-w-lg rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8 md:mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-industrial-green/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                    <ClipboardList className="w-5 md:w-6 h-5 md:h-6 text-industrial-green" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Checklist de Inicio</h3>
                    <p className="text-[8px] md:text-[10px] uppercase font-black tracking-widest text-white/20">Inspección de Seguridad Estándar</p>
                  </div>
                </div>
                <button onClick={() => setShowChecklistModal(false)} className="text-white/20 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                {[
                  'Nivel de lubricante verificado',
                  'Frenos de emergencia operativos',
                  'Área libre de obstrucciones',
                  'Equipo de protección colocado'
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-4 p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl cursor-pointer hover:border-industrial-green/30 transition-all group">
                    <div className="w-5 md:w-6 h-5 md:h-6 rounded-lg border-2 border-white/10 flex items-center justify-center group-hover:border-industrial-green transition-all">
                       <Check className="w-4 h-4 text-industrial-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-white/80">{item}</span>
                  </label>
                ))}
              </div>

              <button 
                onClick={completeChecklist}
                className="w-full bg-industrial-green text-black font-black uppercase text-xs py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl shadow-industrial-green/20"
              >
                Certificar para Operación
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Machine Status for Operator */}
      <div className="lg:col-span-3 bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border border-industrial-border mt-4">
         <div className="flex flex-col xl:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full xl:w-auto">
               <div className="w-20 md:w-24 h-20 md:h-24 bg-industrial-red/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center border-2 border-industrial-red/20 shadow-[0_0_20px_rgba(217,43,43,0.1)]">
                  <Zap className="w-8 md:w-10 h-8 md:h-10 text-industrial-red" />
               </div>
               <div className="text-center sm:text-left">
                  <h3 className="text-2xl md:text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">Torno CNC-04</h3>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 md:gap-4">
                     <span className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-industrial-green">
                        <div className="w-2 h-2 rounded-full bg-industrial-green animate-pulse"></div> Operación Estable
                     </span>
                     <span className="text-white/20 hidden xs:block">|</span>
                     <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/20">OEE: 88%</span>
                  </div>
               </div>
            </div>
            <div className="flex gap-4 w-full sm:w-auto justify-center">
               <div className="flex-1 sm:flex-none px-6 md:px-10 py-4 md:py-6 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 text-center shadow-inner">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 mb-1 tracking-widest">Producción</p>
                  <p className="text-xl md:text-3xl font-black">142<span className="text-white/20">/</span>200</p>
               </div>
               <div className="flex-1 sm:flex-none px-6 md:px-10 py-4 md:py-6 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 text-center shadow-inner">
                  <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 mb-1 tracking-widest">Ciclo</p>
                  <p className="text-xl md:text-3xl font-black">04:12</p>
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
      className="bg-industrial-bg text-white min-h-screen -m-4 md:-m-8 p-4 md:p-12 space-y-8 md:space-y-12"
    >
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-white/5 pb-6 md:pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-industrial-red"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-red">
              {isOperator ? 'Terminal de Planta' : 'Industrial Control Center'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic mb-2 leading-tight">
            {isOperator ? 'Terminal Operativa' : 'Industrial Control'}
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium max-w-lg">
            {isOperator 
              ? 'Interfaz simplificada para operación y registro táctil en planta.' 
              : 'Análisis de rendimiento, rentabilidad y aseguramiento de calidad.'
            }
          </p>
        </div>

        {!isOperator && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex bg-[#111] p-1 rounded-full border border-white/10 w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'analytics' ? 'bg-industrial-red text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Analítica
                </button>
                <button 
                  onClick={() => setActiveTab('kanban')}
                  className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'kanban' ? 'bg-industrial-red text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  No Conformidades
                </button>
            </div>
            
            <div className="hidden sm:block h-10 w-px bg-white/10 mx-2"></div>

            <div className="flex gap-2 justify-end">
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
