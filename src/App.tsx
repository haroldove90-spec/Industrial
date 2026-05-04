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
  Boxes,
  ShieldCheck,
  DollarSign,
  HelpCircle,
  Lock,
  LogOut
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
import AdminUsersView from './components/AdminUsersView';
import NonConformityWorkflow from './components/NonConformityWorkflow';
import { FinancialControlView } from './components/FinancialControlView';
import { NotificationCenter } from './components/NotificationCenter';
import { WorkOrder, UserRole } from './types';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState(false);
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  // Simulation state
  const [simValue, setSimValue] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSimValue(v => (v + 1) % 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter modules based on current role
  const allowedModules = MODULES.filter(m => m.roles.includes(currentRole));

  const renderModuleContent = () => {
    if (activeModule === 'orders') {
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
            <h2 className="text-3xl font-black italic text-white flex items-center gap-4">
              <ClipboardCheck className="text-industrial-red w-8 h-8" />
              Órdenes de Trabajo
            </h2>
            {currentRole !== 'operator' && (
              <button className="bg-industrial-red text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all shadow-xl shadow-industrial-red/20">
                Nueva OT
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {MOCK_WORK_ORDERS.map((wo) => (
              <div 
                key={wo.id}
                onClick={() => setSelectedWO(wo as WorkOrder)}
                className="bg-industrial-card p-6 rounded-3xl border border-white/5 hover:border-industrial-red/40 transition-all cursor-pointer group backdrop-blur-sm shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-industrial-red/10 rounded-2xl flex items-center justify-center border border-industrial-red/20">
                      <ClipboardCheck className="w-6 h-6 text-industrial-red" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white tracking-tight">{wo.orderNumber}</h4>
                      <p className="text-[10px] font-black uppercase text-white/30 tracking-widest leading-none mt-1">{wo.client}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                     <div className="text-left">
                        <p className="text-[10px] font-black uppercase text-white/20 mb-1">Status</p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                          wo.status === 'in_progress' ? 'bg-industrial-red/10 border-industrial-red/20 text-industrial-red' : 
                          wo.status === 'completed' ? 'bg-industrial-green/10 border-industrial-green/20 text-industrial-green' :
                          'bg-industrial-orange/10 border-industrial-orange/20 text-industrial-orange'
                        }`}>
                          {wo.status.replace('_', ' ')}
                        </span>
                     </div>
                     <div className="text-left w-32 md:w-48">
                        <p className="text-[10px] font-black uppercase text-white/20 mb-1">Progreso</p>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                           <div 
                              className="h-full bg-industrial-red shadow-[0_0_12px_#ED1C24] transition-all duration-1000" 
                              style={{ width: `${Math.min(100, wo.progress + (simValue / 20))}%` }}
                           ></div>
                        </div>
                     </div>
                     {currentRole === 'operator' && (
                        <button className="bg-industrial-red/10 hover:bg-industrial-red text-industrial-red hover:text-white px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-industrial-red/20">
                           Gestionar OT
                        </button>
                     )}
                     <ChevronRight className="hidden lg:block w-5 h-5 text-white/10 group-hover:text-industrial-red transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeModule === 'reports') return <ManagementDashboard role={currentRole} />;
    if (activeModule === 'maintenance') return <MaintenanceView />;
    if (activeModule === 'workforce') return <WorkforceView />;
    if (activeModule === 'blueprints') return <BlueprintViewer />;
    if (activeModule === 'admin') return <AdminUsersView />;
    if (activeModule === 'quality') return <NonConformityWorkflow />;

    if (activeModule === 'dashboard') {
      return (
        <motion.div
           key="dashboard-view"
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -15 }}
        >
           <ManagementDashboard role={currentRole} />
        </motion.div>
      );
    }

    if (activeModule === 'finance' && currentRole === 'admin') {
      return (
        <motion.div
          key="finance-view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <FinancialControlView />
        </motion.div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12">
        <div className="w-24 h-24 bg-industrial-red/10 rounded-3xl flex items-center justify-center mb-8 border border-industrial-red/20 shadow-[0_0_30px_#ED1C2410]">
           {React.createElement(MODULES.find(m => m.id === activeModule)?.icon || LayoutDashboard, { className: "w-10 h-10 text-industrial-red" })}
        </div>
        <h2 className="text-3xl font-black italic text-white mb-4 uppercase tracking-tighter">Módulo {MODULES.find(m => m.id === activeModule)?.name}</h2>
        <p className="text-white/40 max-w-sm text-lg font-medium italic">Próximamente disponible en la fase de escalabilidad operativa.</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-industrial-bg text-white font-sans selection:bg-industrial-red/30 selection:text-white">
      {/* Floating Demo Role Selector */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-industrial-card/80 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl flex items-center gap-1 sm:gap-2 max-w-[95vw]">
         <div className="px-3 md:px-4 border-r border-white/10 hidden md:block">
            <span className="text-[7px] font-black uppercase text-white/40 tracking-[0.3em] block mb-0.5">Role Switch</span>
            <span className="text-[9px] font-black text-industrial-red uppercase tracking-widest">{currentRole}</span>
         </div>
         <div className="flex items-center gap-1 sm:gap-1.5">
            {[
              { id: 'admin', label: 'Admin', icon: ShieldCheck },
              { id: 'quality', label: 'QC', icon: CheckCircle2 },
              { id: 'operator', label: 'Ops', icon: Activity }
            ].map((role) => (
              <button 
                key={role.id}
                onClick={() => {
                  setCurrentRole(role.id as UserRole);
                  setActiveModule('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 ${
                  currentRole === role.id ? 'bg-industrial-red text-white shadow-lg' : 'text-white/20 hover:text-white/40 hover:bg-white/5'
                }`}
              >
                <role.icon className="w-3 h-3" />
                <span className="xs:inline">{role.label}</span>
              </button>
            ))}
         </div>
      </div>

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
              className="lg:hidden fixed inset-y-0 left-0 z-[60] w-80 bg-industrial-bg border-r border-white/5 flex flex-col shadow-2xl"
            >
               <div className="p-8 border-b border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-industrial-red rounded-xl flex items-center justify-center shadow-lg shadow-industrial-red/40">
                   <Activity className="text-white w-6 h-6" />
                </div>
                <span className="font-black text-xl tracking-tighter">INDUSTRIAL<span className="text-industrial-red opacity-50">.C</span></span>
             </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-lg text-white/40"><X className="w-5 h-5" /></button>
               </div>
               <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {allowedModules.map((module) => (
                      <li key={module.id}>
                        <button
                          onClick={() => {
                            setActiveModule(module.id);
                            setSelectedWO(null);
                            setIsMobileMenuOpen(false);
                          }}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                              activeModule === module.id ? 'bg-industrial-red text-white shadow-xl shadow-industrial-red/20' : 'text-white/40 hover:bg-white/5'
                            }`}
                          >
                            <module.icon className="w-5 h-5" />
                            <span className="text-sm font-black uppercase tracking-widest">{module.name}</span>
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
        animate={{ width: isSidebarOpen ? 100 : 100 }}
        className="hidden lg:flex flex-col bg-industrial-red m-4 rounded-[3.5rem] z-40 transition-all shadow-[0_0_50px_rgba(237,28,36,0.2)] shrink-0 items-center py-10"
      >
        <div className="mb-12">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-black text-lg shadow-2xl">
              IC
            </div>
        </div>

        <nav className="flex-1 w-full px-4 overflow-y-auto scrollbar-hide">
          <ul className="space-y-6 flex flex-col items-center">
            {allowedModules.map((module) => (
              <li key={module.id} className="w-full">
                <button
                  onClick={() => {
                    setActiveModule(module.id);
                    setSelectedWO(null);
                  }}
                  className={`w-full flex flex-col items-center justify-center gap-2 group transition-all ${
                    activeModule === module.id 
                      ? 'text-white' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <div className={`p-4 rounded-3xl transition-all ${activeModule === module.id ? 'bg-black/20 shadow-inner' : 'hover:bg-white/5'}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col items-center gap-8">
            <button 
              onClick={() => setCurrentRole(null)}
              className="p-4 rounded-3xl bg-black/10 text-white hover:bg-black/20 transition-all group shadow-lg"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 lg:h-24 flex items-center justify-between px-4 sm:px-8 lg:px-12 z-30 sticky top-0 bg-industrial-bg/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4 sm:gap-6 flex-1">
             <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 sm:p-3 bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
             >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
             </button>
             
             {/* Search Bar - Center Left */}
             <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/5 px-6 py-3 rounded-full w-full max-w-md">
                <span className="text-[10px] font-medium text-white/20 tracking-widest uppercase">Search...</span>
                <Search className="w-4 h-4 text-white/20 ml-auto" />
             </div>

             {/* Brand Small (Mobile Only) */}
             <div className="lg:hidden flex items-center gap-2">
                <div className="w-7 h-7 bg-industrial-red rounded-lg flex items-center justify-center shrink-0">
                   <Activity className="text-white w-4 h-4" />
                </div>
                <span className="font-black text-xs tracking-tighter hidden xs:block">INDUSTRIAL</span>
             </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Toggle Theme / Settings */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 scale-90">
               <div className="p-2 bg-white/10 rounded-full shadow-lg">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
               </div>
               <div className="p-2 opacity-30">
                  <div className="w-4 h-4 border-2 border-white rounded-full translate-x-1"></div>
               </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 bg-industrial-red/10 border border-industrial-red/20 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl group cursor-pointer hover:bg-industrial-red/20 transition-all">
               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-industrial-red rounded-lg flex items-center justify-center shadow-lg shadow-industrial-red/40">
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
               </div>
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white/90">Logout</span>
            </div>
            
            <button 
              onClick={() => setIsNotifCenterOpen(true)}
              className="p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-industrial-red rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:p-12 space-y-8 md:space-y-12 pb-32 scrollbar-hide">
          <AnimatePresence mode="wait">
            {renderModuleContent()}
          </AnimatePresence>

          {/* Footer Integration */}
          <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-8 pb-12">
             <div className="text-center xl:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-red mb-2">Industrial Control System</p>
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">© 2024 Industrial.C • Versión de Prototipo 1.0</p>
             </div>
             <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                <button 
                  onClick={() => alert("Abriendo Manual Técnico de Industrial Control v1.0...")}
                  className="flex items-center gap-2 group"
                >
                   <HelpCircle className="w-4 h-4 text-white/20 group-hover:text-industrial-red transition-colors" />
                   <span className="text-[9px] font-black uppercase text-white/30 tracking-widest group-hover:text-white transition-colors">Ayuda/Soporte</span>
                </button>
                <div className="h-4 w-px bg-white/5 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-industrial-green animate-pulse shadow-[0_0_8px_#00C85350]"></div>
                   <span className="text-[8px] sm:text-[9px] font-black uppercase text-white/30 tracking-widest">Server: MX-P1</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-px h-3 bg-white/10"></div>
                   <span className="text-[8px] sm:text-[9px] font-black uppercase text-white/30 tracking-widest">Latencia: 18ms</span>
                </div>
             </div>
          </footer>
        </div>
      </main>

      <NotificationCenter 
        isOpen={isNotifCenterOpen} 
        onClose={() => setIsNotifCenterOpen(false)} 
      />

      {/* Overlay Glow Background Effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-industrial-red/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-red-900/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
}
