/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  QrCode, 
  Timer, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  UserCheck,
  Smartphone,
  BarChart3,
  LogOut
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MOCK_OPERATOR_PRODUCTIVITY, MOCK_ATTENDANCE } from '../constants';

export default function WorkforceView() {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const simulateScan = () => {
    setAttendanceStatus('scanning');
    setTimeout(() => {
      setAttendanceStatus('success');
      setTimeout(() => {
        setAttendanceStatus('idle');
        setShowQRScanner(false);
      }, 2000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-industrial-card p-8 rounded-3xl border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-3xl font-serif italic text-white flex items-center gap-4">
            <Users className="text-industrial-cyan w-8 h-8" /> Gestión de Operarios
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Control de tiempos y productividad individual</p>
        </div>
        
        <button 
          onClick={() => setShowQRScanner(true)}
          className="bg-industrial-cyan hover:bg-blue-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-industrial-cyan/20 group"
        >
          <QrCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Registrar Check-In/Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Chart */}
        <div className="lg:col-span-2 bg-industrial-card p-8 rounded-3xl border border-white/5 shadow-xl">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-industrial-orange">Rendimiento Individual (Actual vs Meta)</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-industrial-cyan"></div>
                    <span className="text-[9px] text-white/40 font-bold uppercase tracking-tighter">Producción Real</span>
                 </div>
              </div>
           </div>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_OPERATOR_PRODUCTIVITY} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 'bold' }} 
                    width={80}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="actual" radius={[0, 4, 4, 0]} barSize={24}>
                    {MOCK_OPERATOR_PRODUCTIVITY.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.actual >= entry.estimated ? '#2979FF' : '#1A1A1A'} stroke={entry.actual < entry.estimated ? 'rgba(255,255,255,0.1)' : 'none'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Live Attendance */}
        <div className="bg-industrial-card p-8 rounded-3xl border border-white/5 shadow-xl h-fit">
           <h3 className="text-xs font-black uppercase tracking-widest text-industrial-cyan/60 mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Presencia en Planta
           </h3>
           <div className="space-y-4">
              {MOCK_OPERATOR_PRODUCTIVITY.map((op, i) => (
                <div key={op.name} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:bg-white/[0.04] transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="relative">
                         <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center font-bold text-white/40">
                            {op.name.charAt(0)}
                         </div>
                         <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-industrial-card ${i % 2 === 0 ? 'bg-industrial-green' : 'bg-white/10'}`}></div>
                      </div>
                      <div>
                         <p className="text-sm font-bold text-white">{op.name}</p>
                         <p className="text-[10px] text-white/20 font-black uppercase tracking-tighter">
                            {i % 2 === 0 ? 'En Puesto: 08:00 AM' : 'No ha iniciado'}
                         </p>
                      </div>
                   </div>
                   {i % 2 === 0 && (
                      <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <LogOut className="w-4 h-4 text-industrial-red/50" />
                      </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* QR Scanner Overlay (Simulation) */}
      <AnimatePresence>
        {showQRScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
            <button 
              onClick={() => setShowQRScanner(false)}
              className="absolute top-10 right-10 p-4 bg-white/5 rounded-full hover:bg-white/10 text-white/40 transition-colors"
            >
              <Users className="w-6 h-6 rotate-45" />
            </button>

            <div className="w-full max-w-sm text-center">
              <h4 className="text-xl font-serif italic text-white mb-2">Simulador de Check-In Industrial</h4>
              <p className="text-white/40 text-xs mb-12 uppercase font-black tracking-widest">Escanee el código QR ubicado en su estación</p>

              <div className="relative w-72 h-72 mx-auto mb-16">
                 {/* Decorative Scanner Frame */}
                 <div className="absolute inset-0 border-2 border-white/10 rounded-3xl"></div>
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-industrial-cyan rounded-tl-xl"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-industrial-cyan rounded-tr-xl"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-industrial-cyan rounded-bl-xl"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-industrial-cyan rounded-br-xl"></div>
                 
                 <div className="absolute inset-4 overflow-hidden rounded-2xl bg-white/5 flex items-center justify-center">
                    {attendanceStatus === 'idle' && (
                       <button 
                         onClick={simulateScan}
                         className="flex flex-col items-center gap-4 group"
                       >
                         <Smartphone className="w-16 h-16 text-white/20 group-hover:text-industrial-cyan transition-colors" />
                         <span className="text-[10px] font-black uppercase text-industrial-cyan">Tap to start camera</span>
                       </button>
                    )}

                    {attendanceStatus === 'scanning' && (
                       <motion.div 
                         initial={{ y: -100 }}
                         animate={{ y: 100 }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                         className="absolute inset-x-0 h-1 bg-industrial-cyan shadow-[0_0_15px_rgba(41,121,255,0.8)]"
                       />
                    )}

                    {attendanceStatus === 'success' && (
                       <motion.div 
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="flex flex-col items-center gap-4 text-industrial-green"
                       >
                         <CheckCircle2 className="w-20 h-20" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Registro Exitoso</span>
                         <span className="text-white text-xs font-mono">08:00:15 AM</span>
                       </motion.div>
                    )}
                 </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                 <p className="text-[9px] font-black uppercase tracking-widest text-industrial-orange mb-2">Instrucciones</p>
                 <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                    El sistema detecta automáticamente su ubicación mediante Geofencing para asegurar que el registro se realice dentro de los límites de la planta.
                 </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
