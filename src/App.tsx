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
  ChevronRight,
  Factory,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Wrench,
  LayoutDashboard
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
  BarChart,
  Bar
} from 'recharts';
import { MODULES, MOCK_OEE_DATA, MOCK_QUALITY_DATA, MOCK_INVENTORY_LEVELS } from './constants';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-natural-bg text-natural-text font-sans selection:bg-[#7D8C6920] selection:text-[#3D4035]">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-natural-sidebar text-white flex flex-col z-50 overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-natural-accent flex items-center justify-center rounded-lg shadow-inner">
              <Factory className="text-white w-6 h-6" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-xl tracking-tight uppercase"
              >
                METAL<span className="text-natural-light-accent">CORE</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
          {isSidebarOpen && (
            <div className="mb-4 px-3 text-[10px] uppercase tracking-wider text-natural-light-accent font-bold opacity-80">
              Módulos de Sistema
            </div>
          )}
          <ul className="space-y-1">
            {MODULES.map((module) => (
              <li key={module.id}>
                <button
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all group ${
                    activeModule === module.id 
                      ? 'bg-natural-accent text-white shadow-lg' 
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <module.icon className={`w-5 h-5 shrink-0 ${activeModule === module.id ? 'text-white' : 'text-natural-light-accent opacity-50 group-hover:opacity-100'}`} />
                  {isSidebarOpen && (
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm font-medium">{module.name}</span>
                      {module.count && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeModule === module.id ? 'bg-natural-sidebar text-white' : 'bg-white/10 text-natural-light-accent'}`}>
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

        <div className="p-6 bg-black/10">
          <div className="flex items-center justify-center mb-4">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-full text-white/40 transition-colors group"
            >
              {isSidebarOpen ? <X className="w-5 h-5 group-hover:text-white" /> : <Menu className="w-5 h-5 group-hover:text-white" />}
            </button>
          </div>
          {isSidebarOpen && (
            <div className="flex items-center gap-3 text-[10px] opacity-70 font-medium tracking-wide justify-center">
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              <span className="uppercase italic">Conectado a Producción</span>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-natural-border bg-white flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm">
          <h1 className="text-2xl font-serif italic text-natural-sidebar">Panel de Control Industrial</h1>

          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase text-natural-accent tracking-widest">Ing. de Planta</span>
              <span className="text-sm font-semibold">Alejandro Mendoza</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-natural-bg border border-natural-border p-1">
              <div className="h-full w-full bg-natural-light-accent/20 rounded-full flex items-center justify-center">
                <User className="text-natural-sidebar w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <AnimatePresence mode="wait">
            {activeModule === 'dashboard' ? (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* OEE Card */}
                  <div className="bg-white border border-natural-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold uppercase text-natural-accent mb-2 tracking-widest font-mono">Eficiencia (OEE)</div>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-light text-natural-sidebar">84.2%</p>
                      <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-green-600">
                        <TrendingUp className="w-3 h-3" />
                        ↑ 2.1%
                      </div>
                    </div>
                    <p className="text-[10px] text-natural-text/40 italic mt-2">vs mes anterior</p>
                  </div>

                  {/* Quality Card */}
                  <div className="bg-white border border-natural-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold uppercase text-natural-accent mb-2 tracking-widest font-mono">No Conformidades</div>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-light text-natural-sidebar">1.28%</p>
                      <div className="mb-1 flex items-center gap-1 text-[10px] font-bold text-red-600">
                        <ArrowDownRight className="w-3 h-3" />
                        ↓ 0.4%
                      </div>
                    </div>
                    <p className="text-[10px] text-natural-text/40 italic mt-2">Bajo el límite de 2%</p>
                  </div>

                  {/* Inventory Card */}
                  <div className="bg-white border border-natural-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-[10px] font-bold uppercase text-natural-accent mb-2 tracking-widest font-mono">Stock Crítico</div>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-light text-natural-sidebar">12 <span className="text-lg">SKUs</span></p>
                      <div className="mb-1 text-[10px] font-bold text-orange-600 uppercase tracking-tighter bg-orange-50 px-2 py-0.5 rounded">
                        8 Alertas
                      </div>
                    </div>
                    <p className="text-[10px] text-natural-text/40 italic mt-2">Reponer pronto</p>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Flujo de Trazabilidad (Left side, larger) */}
                  <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-natural-border shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-lg font-semibold tracking-tight">Flujo de Trazabilidad Activo</h2>
                      <span className="text-[9px] bg-natural-bg px-2 py-1 rounded text-natural-accent font-black uppercase tracking-widest">Real-Time Data</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-4">
                      {/* Step 1 */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full border-2 border-natural-accent flex items-center justify-center text-natural-accent font-bold shadow-sm bg-white">01</div>
                        <div className="flex-1 p-4 bg-natural-bg rounded-xl border-l-4 border-natural-accent">
                          <div className="text-[10px] font-black uppercase text-natural-sidebar tracking-widest mb-1">Entrada Materia Prima</div>
                          <div className="text-xs text-natural-text/60 font-medium">Lote #MP-9942 - Acero Inoxidable 304</div>
                        </div>
                      </div>
                      <div className="w-0.5 h-6 bg-natural-border ml-[23px]"></div>
                      {/* Step 2 */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full border-2 border-natural-accent flex items-center justify-center text-natural-accent font-bold shadow-sm bg-white">02</div>
                        <div className="flex-1 p-4 bg-natural-bg rounded-xl border-l-4 border-natural-accent">
                          <div className="text-[10px] font-black uppercase text-natural-sidebar tracking-widest mb-1">Procesamiento y Corte</div>
                          <div className="text-xs text-natural-text/60 font-medium">Operario: Carlos Ruiz | Máquina: CNC-04</div>
                        </div>
                      </div>
                      <div className="w-0.5 h-6 bg-natural-border ml-[23px]"></div>
                      {/* Step 3 */}
                      <div className="flex items-center gap-5 opacity-40">
                        <div className="w-12 h-12 rounded-full border-2 border-natural-sidebar flex items-center justify-center font-bold">03</div>
                        <div className="flex-1 p-4 border border-natural-border bg-white rounded-xl">
                          <div className="text-[10px] font-black uppercase tracking-widest mb-1">Validación de Calidad</div>
                          <div className="text-xs">Pendiente de escaneo dimensional</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schema DB (Right side) */}
                  <div className="lg:col-span-2 bg-natural-sidebar p-8 rounded-2xl shadow-xl text-white flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <Database className="w-4 h-4 text-natural-light-accent" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-natural-light-accent">Arquitectura Modular</h3>
                    </div>
                    <div className="space-y-4 font-mono text-[10px] opacity-90 flex-1 overflow-auto scrollbar-hide">
                      <div className="p-3 bg-black/20 rounded-lg border border-white/5 shadow-inner">
                        <span className="text-[#fbbf24] italic uppercase">TABLE</span> production (<br/>
                        &nbsp;&nbsp;id uuid <span className="text-natural-light-accent">PK</span>,<br/>
                        &nbsp;&nbsp;wo_id <span className="text-natural-light-accent">FK</span>,<br/>
                        &nbsp;&nbsp;machine_id <span className="text-natural-light-accent">FK</span>,<br/>
                        &nbsp;&nbsp;performance <span className="text-blue-300">DECIMAL</span><br/>
                        );
                      </div>
                      <div className="p-3 bg-black/20 rounded-lg border border-white/5 shadow-inner">
                        <span className="text-[#fbbf24] italic uppercase">TABLE</span> traceability (<br/>
                        &nbsp;&nbsp;id uuid <span className="text-natural-light-accent">PK</span>,<br/>
                        &nbsp;&nbsp;batch_no <span className="text-white">TEXT</span>,<br/>
                        &nbsp;&nbsp;logs <span className="text-blue-300">JSONB</span><br/>
                        );
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed italic text-natural-light-accent mt-6 font-medium">
                      Integridad referencial blindada para 10 módulos operativos diseñados para escalabilidad en Supabase.
                    </p>
                  </div>
                </div>

                {/* Performance Chart (Replacing table for dash) */}
                <div className="bg-white border border-natural-border p-8 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Rendimiento Histórico OEE</h3>
                      <p className="text-xs text-natural-text/40 font-medium mt-1 uppercase tracking-widest">Planta de Mecanizado • Últimos 6 días</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest bg-natural-bg px-4 py-2 text-natural-accent rounded-full hover:bg-natural-border transition-colors">Ver Detalles</button>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_OEE_DATA}>
                        <defs>
                          <linearGradient id="colorNatural" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7D8C69" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#7D8C69" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5DB" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fontWeight: 'bold', fill: '#3D4035' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 11, fontWeight: 'bold', fill: '#3D4035' }}
                          domain={[0, 100]}
                        />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: '1px solid #E5E5DB', backgroundColor: 'white', color: '#3D4035' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="oee" 
                          stroke="#7D8C69" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorNatural)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="target" 
                          stroke="#3D4035" 
                          strokeDasharray="8 8" 
                          strokeWidth={1}
                          fill="transparent" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="other-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center h-full text-center space-y-6"
              >
                <div className="w-24 h-24 bg-natural-light-accent/10 rounded-3xl flex items-center justify-center mb-4 shadow-inner border border-natural-border">
                  {React.createElement(MODULES.find(m => m.id === activeModule)?.icon || LayoutDashboard, { className: "w-10 h-10 text-natural-accent" })}
                </div>
                <h2 className="text-3xl font-serif italic text-natural-sidebar lowercase"><span className="uppercase not-italic font-sans font-bold">Módulo:</span> {MODULES.find(m => m.id === activeModule)?.name}</h2>
                <p className="text-natural-text/60 max-w-sm font-medium text-lg italic">
                  "Información operacional vinculada al esquema SQL de integridad."
                </p>
                <div className="grid grid-cols-2 gap-4 pt-12">
                   <div className="p-6 bg-white border border-natural-border rounded-2xl w-52 text-left shadow-sm">
                      <div className="w-10 h-10 bg-natural-bg rounded-xl mb-4 flex items-center justify-center shadow-sm"><CheckCircle2 className="w-5 h-5 text-natural-accent" /></div>
                      <p className="text-[10px] font-black uppercase text-natural-accent mb-1 tracking-widest">Base de Datos</p>
                      <p className="text-xs font-bold leading-tight">Tablas referenciadas en Supabase</p>
                   </div>
                   <div className="p-6 bg-white border border-natural-border rounded-2xl w-52 text-left shadow-sm">
                      <div className="w-10 h-10 bg-natural-bg rounded-xl mb-4 flex items-center justify-center shadow-sm"><Wrench className="w-5 h-5 text-natural-accent" /></div>
                      <p className="text-[10px] font-black uppercase text-natural-accent mb-1 tracking-widest">Estructura</p>
                      <p className="text-xs font-bold leading-tight">Arquitectura modular escalable</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Aesthetic Grain/Paper Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] grayscale brightness-125" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}></div>
    </div>
  );
}
