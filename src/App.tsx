/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Factory,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Wrench,
  LayoutDashboard,
  ClipboardCheck,
  BarChart3,
  Activity,
  Boxes
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { MODULES, MOCK_OEE_DATA, MOCK_QUALITY_DATA, MOCK_INVENTORY_LEVELS, MOCK_WORK_ORDERS } from './constants';
import WorkOrderDetail from './components/WorkOrderDetail';
import ManagementDashboard from './components/ManagementDashboard';
import MaintenanceView from './components/MaintenanceView';
import WorkforceView from './components/WorkforceView';
import BlueprintViewer from './components/BlueprintViewer';
import { WorkOrder } from './types';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);

  const renderModuleContent = () => {
    if (activeModule === 'work-orders') {
      if (selectedWO) {
        return <WorkOrderDetail order={selectedWO} onBack={() => setSelectedWO(null)} />;
      }
      return (
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-3xl font-serif italic text-white">Órdenes de Trabajo</h2>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
              Nueva OT
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {MOCK_WORK_ORDERS.map((wo) => (
              <div 
                key={wo.id}
                onClick={() => setSelectedWO(wo as WorkOrder)}
                className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer group backdrop-blur-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                      <ClipboardCheck className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{wo.orderNumber}</h4>
                      <p className="text-[10px] font-black uppercase text-white/30 tracking-widest">{wo.client}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                     <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-white/20 mb-1">Status</p>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                          wo.status === 'in_progress' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        }`}>
                          {wo.status.replace('_', ' ')}
                        </span>
                     </div>
                     <div className="text-left w-32">
                        <p className="text-[10px] font-black uppercase text-white/20 mb-1">Progreso</p>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" style={{ width: `${wo.progress}%` }}></div>
                        </div>
                     </div>
                     <ChevronRight className="hidden lg:block w-5 h-5 text-white/10 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeModule === 'reports') return <ManagementDashboard />;
    if (activeModule === 'maintenance') return <MaintenanceView />;
    if (activeModule === 'workforce') return <WorkforceView />;
    if (activeModule === 'blueprints') return <BlueprintViewer />;

    if (activeModule === 'dashboard') {
      return (
        <motion.div
          key="dashboard-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-8"
        >
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-xl hover:border-blue-500/20 transition-all group">
              <div className="text-[10px] font-black uppercase text-blue-500 mb-4 tracking-[0.2em]">Eficiencia (OEE)</div>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-light text-white">84.2%</p>
                <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  ↑ 2.1%
                </div>
              </div>
              <p className="text-[10px] text-white/20 italic mt-4 uppercase font-bold tracking-tight">Rendimiento óptimo en Línea A</p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-xl hover:border-blue-500/20 transition-all group">
              <div className="text-[10px] font-black uppercase text-blue-500 mb-4 tracking-[0.2em]">No Conformidades</div>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-light text-white">1.28%</p>
                <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-red-500">
                  <ArrowDownRight className="w-3 h-3" />
                  ↓ 0.4%
                </div>
              </div>
              <p className="text-[10px] text-white/20 italic mt-4 uppercase font-bold tracking-tight">Meta: &lt; 2.0%</p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-xl hover:border-blue-500/20 transition-all group lg:col-span-1 sm:col-span-2">
              <div className="text-[10px] font-black uppercase text-blue-500 mb-4 tracking-[0.2em]">Stock Crítico</div>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-light text-white">12 <span className="text-lg">SKUs</span></p>
                <div className="mb-1 text-[10px] font-bold text-orange-500 uppercase tracking-tighter bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  8 ALERTAS
                </div>
              </div>
              <p className="text-[10px] text-white/20 italic mt-4 uppercase font-bold tracking-tight">Reponer antes de 48h</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            <div className="xl:col-span-3 bg-[#0a0a0a] p-10 rounded-3xl border border-white/5 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-lg font-bold tracking-tight text-white uppercase tracking-widest text-[12px] text-blue-500">Flujo de Trazabilidad Activo</h2>
                <span className="text-[9px] bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-500 font-black uppercase tracking-widest">Real-Time Data Feed</span>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl border-2 border-blue-600/40 flex items-center justify-center text-blue-500 font-bold shadow-xl bg-blue-600/5 transition-transform hover:scale-105">01</div>
                  <div className="flex-1 p-5 bg-white/5 rounded-2xl border-l-4 border-blue-600 backdrop-blur-md">
                    <div className="text-[9px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">Entrada Materia Prima</div>
                    <div className="text-xs text-white/70 font-bold uppercase tracking-tight">Lote #MP-9942 - Acero Inoxidable 304</div>
                  </div>
                </div>
                <div className="w-0.5 h-8 bg-blue-600/20 ml-[27px]"></div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl border-2 border-blue-600/40 flex items-center justify-center text-blue-500 font-bold shadow-xl bg-blue-600/5 transition-transform hover:scale-105">02</div>
                  <div className="flex-1 p-5 bg-white/5 rounded-2xl border-l-4 border-blue-600 backdrop-blur-md">
                    <div className="text-[9px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">Procesamiento y Corte</div>
                    <div className="text-xs text-white/70 font-bold uppercase tracking-tight">Maquinaria: CNC-04 | Operario: C. Ruiz</div>
                  </div>
                </div>
                <div className="w-0.5 h-8 bg-blue-600/20 ml-[27px]"></div>
                <div className="flex items-center gap-6 opacity-30">
                  <div className="w-14 h-14 rounded-2xl border-2 border-white/5 flex items-center justify-center text-white/20 font-bold">03</div>
                  <div className="flex-1 p-5 border border-white/5 bg-white/[0.02] rounded-2xl">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 text-white/20">Validación de Calidad</div>
                    <div className="text-xs text-white/10 uppercase font-black">Pendiente de escaneo dimensional</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-2 bg-gradient-to-br from-[#0a0a0a] to-[#010b1a] p-10 rounded-3xl border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)] text-white flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Core Industrial</h3>
              </div>
              <div className="space-y-4 font-mono text-[11px] opacity-90 flex-1 overflow-auto scrollbar-hide">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-blue-400 font-bold">SELECT</span> * <span className="text-blue-400">FROM</span> production<br/>
                  <span className="text-blue-400">WHERE</span> efficiency &gt; 80<br/>
                  <span className="text-blue-400">ORDER BY</span> timestamp <span className="text-blue-400">DESC</span>;
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-[#fbbf24] uppercase">SCHEMA</span> traceability (<br/>
                  &nbsp;&nbsp;id uuid <span className="text-blue-300">PRIMARY KEY</span>,<br/>
                  &nbsp;&nbsp;logs <span className="text-blue-300">JSONB</span>,<br/>
                  &nbsp;&nbsp;verified <span className="text-blue-300">BOOLEAN</span><br/>
                  );
                </div>
              </div>
              <p className="text-[12px] leading-relaxed italic text-blue-200/50 mt-10 font-medium">
                Arquitectura de baja latencia con <span className="text-blue-400">Supabase Realtime</span> para monitoreo de planta crítico.
              </p>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/20">
           {React.createElement(MODULES.find(m => m.id === activeModule)?.icon || LayoutDashboard, { className: "w-10 h-10 text-blue-500" })}
        </div>
        <h2 className="text-3xl font-serif italic text-white mb-4">Módulo de {MODULES.find(m => m.id === activeModule)?.name}</h2>
        <p className="text-white/40 max-w-sm text-lg italic">Próximamente disponible en la fase de escalabilidad operativa.</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed inset-y-0 left-0 z-[60] w-80 bg-[#0a0a0a] border-r border-white/5 flex flex-col shadow-2xl"
            >
               <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Activity className="text-white w-6 h-6" />
                     </div>
                     <span className="font-black text-xl tracking-tighter">INDUSTRIAL<span className="text-blue-500">.C</span></span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-lg text-white/40"><X className="w-5 h-5" /></button>
               </div>
               <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {MODULES.map((module) => (
                      <li key={module.id}>
                        <button
                          onClick={() => {
                            setActiveModule(module.id);
                            setSelectedWO(null);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                            activeModule === module.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/40 hover:bg-white/5'
                          }`}
                        >
                          <module.icon className="w-5 h-5" />
                          <span className="text-sm font-bold uppercase tracking-widest">{module.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
               </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 300 : 90 }}
        className="hidden lg:flex flex-col bg-[#0a0a0a] border-r border-white/5 z-40 transition-all shadow-2xl"
      >
        <div className="p-10 border-b border-white/5 overflow-hidden">
          <div className="flex items-center gap-4 min-w-max">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/10">
              <Activity className="text-white w-7 h-7" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-black text-xl tracking-tighter"
              >
                INDUSTRIAL<span className="text-blue-500">.C</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-10 scrollbar-hide">
          <ul className="space-y-4">
            {MODULES.map((module) => (
              <li key={module.id}>
                <button
                  onClick={() => {
                    setActiveModule(module.id);
                    setSelectedWO(null);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group overflow-hidden ${
                    activeModule === module.id 
                      ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20' 
                      : 'hover:bg-white/5 text-white/40 hover:text-white'
                  }`}
                >
                  <module.icon className={`w-6 h-6 shrink-0 transition-transform group-hover:scale-110 ${activeModule === module.id ? 'text-white' : 'text-blue-500/40 group-hover:text-blue-500'}`} />
                  {isSidebarOpen && (
                    <div className="flex flex-1 items-center justify-between min-w-max">
                      <span className="text-xs font-black uppercase tracking-widest">{module.name}</span>
                      {module.count && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${activeModule === module.id ? 'bg-black/20' : 'bg-white/5'}`}>
                          {module.count}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-8 border-t border-white/5 flex items-center justify-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-white/5 rounded-2xl text-white/20 transition-all hover:text-blue-500"
            >
              {isSidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 lg:px-12 z-30 sticky top-0">
          <div className="flex items-center gap-6">
             <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-white/5 rounded-xl text-white/40"
             >
                <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:block">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-1 block">Operational Status</span>
                <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                   <h1 className="text-sm font-bold uppercase tracking-tight text-white/80">Planta General Mecanizado II</h1>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em] mb-1">Chief Engineer</span>
              <span className="text-sm font-bold tracking-tight">Alejandro Mendoza</span>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 p-1 group cursor-pointer transition-all hover:border-blue-500">
              <div className="h-full w-full bg-blue-600 flex items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-95">
                <User className="text-white w-6 h-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 space-y-12 pb-24 scrollbar-hide">
          <AnimatePresence mode="wait">
            {renderModuleContent()}
          </AnimatePresence>
        </div>
      </main>

      {/* Overlay Glow Background Effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
}
