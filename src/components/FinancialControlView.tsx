import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieIcon,
  BarChart3,
  CreditCard,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { MOCK_FINANCIAL_DATA, MOCK_NON_CONFORMITIES } from '../constants';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export const FinancialControlView: React.FC = () => {
  const totalCostOfNC = MOCK_NON_CONFORMITIES.reduce((acc, curr) => acc + curr.costImpact, 0);
  
  const budgetVsActualData = MOCK_FINANCIAL_DATA.map(item => ({
    name: item.orderId,
    presupuesto: item.budget,
    real: item.actualCost,
  }));

  const pieData = [
    { name: 'Produccion', value: 45000 },
    { name: 'No Calidad', value: totalCostOfNC },
    { name: 'Mantenimiento', value: 8500 },
    { name: 'Operativos', value: 12000 },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-blue-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Centro de Control Financiero</span>
          </div>
          <h2 className="text-4xl font-serif italic text-white mb-2">Rentabilidad Operativa</h2>
          <p className="text-white/40 text-sm font-medium">Análisis de costos reales vs presupuestados e impacto de calidad.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white/5 hover:bg-white/10 text-white/70 px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/10 transition-all">
              Exportar P&L
           </button>
           <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/30">
              Nuevo Presupuesto
           </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Ingresos Proyectados', value: '$84,200', trend: '+12.5%', isUp: true, icon: TrendingUp },
          { label: 'Costo de No Calidad', value: `$${totalCostOfNC.toLocaleString()}`, trend: '-$1,200', isUp: false, icon: AlertCircle, color: 'text-red-500' },
          { label: 'Margen Bruto', value: '32.8%', trend: '+2.1%', isUp: true, icon: Target },
          { label: 'Costo Operativo/Hora', value: '$145.2', trend: '-2.4%', isUp: false, icon: CreditCard }
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-2xl group hover:border-blue-500/20 transition-all"
          >
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-blue-500/30 transition-all ${kpi.color || 'text-blue-500'}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{kpi.label}</p>
            <div className="flex items-end gap-3">
              <p className="text-3xl font-light text-white tracking-tight">{kpi.value}</p>
              <div className={`flex items-center gap-1 text-[9px] font-black mb-1 p-1 rounded ${kpi.isUp ? 'text-green-500 bg-green-500/5' : 'text-red-500 bg-red-500/5'}`}>
                {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost vs Budget Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Comparativa Costo Real vs Presupuesto</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">Presupuesto</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">Real</span>
               </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsActualData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
                <Bar dataKey="presupuesto" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="real" fill="#ffffff20" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NC Impact Allocation */}
        <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-10">Pérdida por No Calidad</h3>
          <div className="flex-1 min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="space-y-4">
             {pieData.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{item.name}</span>
                 </div>
                 <span className="text-[10px] font-black text-white">$ {item.value.toLocaleString()}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Non-Quality Impact Table */}
      <div className="bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Fugas de Capital por No Conformidad</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">ID Orden</th>
                     <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Defecto Detectado</th>
                     <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-white/30 text-right">Costo Estimado</th>
                     <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Severidad Financiera</th>
                  </tr>
               </thead>
               <tbody>
                  {MOCK_NON_CONFORMITIES.map((nc) => (
                     <tr key={nc.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 text-xs text-white font-bold">{nc.orderId}</td>
                        <td className="px-8 py-6 text-xs text-white/60">{nc.description}</td>
                        <td className="px-8 py-6 text-xs text-red-500 font-bold text-right">$ {nc.costImpact.toLocaleString()}</td>
                        <td className="px-8 py-6 text-center">
                           <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${
                              nc.priority === 'urgent' || nc.priority === 'critical' 
                              ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                              : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                           }`}>
                              {nc.priority}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
