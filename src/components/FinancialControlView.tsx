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

const COLORS = ['#ED1C24', '#9C27B0', '#00C853', '#FFB300'];

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
            <div className="w-8 h-px bg-industrial-red"></div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-industrial-red">Centro de Control Financiero</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic text-white mb-2 uppercase tracking-tighter line-clamp-1">Rentabilidad Operativa</h2>
          <p className="text-white/40 text-[11px] md:text-sm font-medium">Análisis de costos reales vs presupuestados e impacto de calidad.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-white/70 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-white/10 transition-all">
              Exportar P&L
           </button>
           <button className="flex-1 sm:flex-none bg-industrial-red hover:bg-red-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shadow-xl shadow-industrial-red/30">
              Nuevo Presupuesto
           </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Ingresos Proyectados', value: '$84,200', trend: '+12.5%', isUp: true, icon: TrendingUp },
          { label: 'Costo de No Calidad', value: `$${totalCostOfNC.toLocaleString()}`, trend: '-$1.2k', isUp: false, icon: AlertCircle, color: 'text-industrial-red' },
          { label: 'Margen Bruto', value: '32.8%', trend: '+2.1%', isUp: true, icon: Target },
          { label: 'Costo Op/Hora', value: '$145.2', trend: '-2.4%', isUp: false, icon: CreditCard }
        ].map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-industrial-card border border-industrial-border p-6 md:p-8 rounded-3xl shadow-2xl group hover:border-industrial-red/20 transition-all"
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 border border-white/5 group-hover:border-industrial-red/30 transition-all ${kpi.color || 'text-industrial-red'}`}>
              <kpi.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{kpi.label}</p>
            <div className="flex items-end gap-2 md:gap-3">
              <p className="text-2xl md:text-3xl font-light text-white tracking-tight">{kpi.value}</p>
              <div className={`flex items-center gap-1 text-[8px] md:text-[9px] font-black mb-1 p-0.5 md:p-1 rounded ${kpi.isUp ? 'text-green-500 bg-green-500/5' : 'text-red-500 bg-red-500/5'}`}>
                {kpi.isUp ? <ArrowUpRight className="w-2 md:w-3 h-2 md:h-3" /> : <ArrowDownRight className="w-2 md:w-3 h-2 md:h-3" />}
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cost vs Budget Chart */}
        <div className="lg:col-span-2 bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-industrial-border shadow-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-industrial-red">Costo Real vs Presupuesto</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-industrial-red"></div>
                  <span className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Pres</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <span className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest">Real</span>
               </div>
            </div>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVsActualData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff80', fontSize: 9, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff80', fontSize: 9, fontWeight: 900 }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                />
                <Bar dataKey="presupuesto" fill="#ED1C24" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="real" fill="#ffffff20" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NC Impact Allocation */}
        <div className="bg-industrial-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-industrial-border shadow-2xl flex flex-col">
          <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-industrial-red mb-8 md:mb-10 text-center lg:text-left">Pérdida por No Calidad</h3>
          <div className="flex-1 min-h-[200px] md:min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '10px' }} />
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
             {pieData.map((item, idx) => (
               <div key={idx} className="flex justify-between items-center bg-white/5 p-2.5 md:p-3 rounded-lg md:rounded-xl border border-white/5">
                 <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-[8px] md:text-[10px] font-bold text-white/50 uppercase tracking-widest">{item.name}</span>
                 </div>
                 <span className="text-[9px] md:text-[10px] font-black text-white">$ {item.value.toLocaleString()}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Non-Quality Impact Table */}
      <div className="bg-industrial-card rounded-[2rem] md:rounded-[2.5rem] border border-industrial-border overflow-hidden shadow-2xl">
         <div className="p-6 md:p-8 border-b border-white/5">
            <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-industrial-red">Fugas de Capital por No Conformidad</h3>
         </div>
         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[700px]">
               <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                     <th className="px-6 md:px-8 py-4 md:py-5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30">ID Orden</th>
                     <th className="px-6 md:px-8 py-4 md:py-5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30">Defecto Detectado</th>
                     <th className="px-6 md:px-8 py-4 md:py-5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 text-right">Costo Estimado</th>
                     <th className="px-6 md:px-8 py-4 md:py-5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 text-center">Severidad</th>
                  </tr>
               </thead>
               <tbody>
                  {MOCK_NON_CONFORMITIES.map((nc) => (
                     <tr key={nc.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 md:px-8 py-5 md:py-6 text-xs text-white font-bold">{nc.orderId}</td>
                        <td className="px-6 md:px-8 py-5 md:py-6 text-xs text-white/60">{nc.description}</td>
                        <td className="px-6 md:px-8 py-5 md:py-6 text-xs text-red-500 font-bold text-right">$ {nc.costImpact.toLocaleString()}</td>
                        <td className="px-6 md:px-8 py-5 md:py-6 text-center">
                           <span className={`text-[7px] md:text-[8px] font-black uppercase px-2 py-1 rounded border ${
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
