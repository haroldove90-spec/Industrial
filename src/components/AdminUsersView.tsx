/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Settings, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  MoreVertical, 
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Mail,
  Shield,
  ArrowRight
} from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { UserProfile, UserRole } from '../types';

export default function AdminUsersView() {
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const handleInvite = () => {
    setIsSendingInvite(true);
    setTimeout(() => {
      setIsSendingInvite(false);
      setIsInviteModalOpen(false);
      alert('Invitación enviada correctamente al nuevo usuario.');
    }, 1500);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'text-industrial-purple bg-industrial-purple/10 border-industrial-purple/20';
      case 'management': return 'text-industrial-red bg-industrial-red/10 border-industrial-red/20';
      case 'quality': return 'text-industrial-green bg-industrial-green/10 border-industrial-green/20';
      case 'maintenance': return 'text-industrial-orange bg-industrial-orange/10 border-industrial-orange/20';
      case 'operator': return 'text-white/40 bg-white/5 border-white/10';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-industrial-card p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif italic text-white flex items-center gap-4">
            <Settings className="text-industrial-red w-6 h-6 md:w-8 md:h-8" /> Gestión de Accesos
          </h2>
          <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Control de Roles y Permisos del Sistema (RBAC)</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Buscar usuario o correo..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-6 text-sm focus:border-industrial-red transition-all outline-none text-white h-12 md:h-[52px]"
            />
        </div>
      </div>

      <div className="bg-industrial-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 font-black">
                <th className="px-6 md:px-8 py-5 md:py-6 text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">Usuario</th>
                <th className="px-6 md:px-8 py-5 md:py-6 text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">Rol</th>
                <th className="px-6 md:px-8 py-5 md:py-6 text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">Acceso</th>
                <th className="px-6 md:px-8 py-5 md:py-6 text-[9px] md:text-[10px] uppercase tracking-widest text-white/40">Estado</th>
                <th className="px-6 md:px-8 py-5 md:py-6 text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-industrial-red/10 border border-industrial-red/20 flex items-center justify-center text-industrial-red font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-industrial-red transition-colors truncate max-w-[150px]">{user.name}</p>
                        <p className="text-[10px] text-white/30 font-mono truncate max-w-[150px]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <span className={`text-[8px] md:text-[9px] font-black uppercase px-2.5 md:px-3 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <div className="flex items-center gap-2 text-white/40">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-mono">{user.lastAccess}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6">
                    <div className="flex items-center gap-3">
                      {user.isActive ? (
                        <div className="flex items-center gap-1.5 font-bold text-[10px] text-industrial-green uppercase tracking-tight">
                           <div className="w-1.5 h-1.5 rounded-full bg-industrial-green shadow-[0_0_8px_#00C853]"></div> Activo
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-[10px] text-industrial-red uppercase tracking-tight">
                            <div className="w-1.5 h-1.5 rounded-full bg-industrial-red"></div> Suspendido
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 md:py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-2 rounded-lg transition-all h-[40px] w-[40px] flex items-center justify-center ${
                          user.isActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        }`}
                       >
                         {user.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                       </button>
                       <button className="p-2 bg-white/5 rounded-lg text-white/40 hover:bg-white/10 h-[40px] w-[40px] flex items-center justify-center">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
         <div className="bg-industrial-card border border-white/5 p-6 md:p-8 rounded-3xl shadow-xl">
            <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-industrial-orange mb-4 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Política de Seguridad
            </h3>
            <p className="text-[10px] text-white/40 leading-relaxed font-medium">
               Todos los cambios en roles son auditados automáticamente por el sistema central.
            </p>
         </div>
         <div className="md:col-span-2 bg-gradient-to-r from-industrial-red/10 to-transparent border border-industrial-red/20 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
               <h4 className="text-lg font-serif italic text-white">Nuevos Usuarios</h4>
               <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Requiere aprobación nivel gerencial</p>
            </div>
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="bg-industrial-red hover:bg-red-500 text-white px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-industrial-red/20 h-[52px] w-full sm:w-auto"
            >
               Invitar Usuario
            </button>
         </div>
      </div>

      <AnimatePresence>
        {isInviteModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-industrial-card border border-white/10 w-full max-w-lg rounded-[3rem] p-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-industrial-red/20 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-industrial-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Invitar Usuario</h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Control de Acceso Industrial</p>
                  </div>
                </div>
                <button onClick={() => setIsInviteModalOpen(false)} className="text-white/20 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-white/40 tracking-widest ml-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    placeholder="usuario@planta.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:border-industrial-red outline-none text-white h-[52px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-white/40 tracking-widest ml-1">Rol de Acceso</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['operator', 'maintenance', 'quality', 'management'].map(role => (
                      <button 
                        key={role}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-industrial-red/40 transition-all group"
                      >
                        <span className="text-[10px] font-bold uppercase text-white/60 group-hover:text-white">{role}</span>
                        <Shield className="w-3 h-3 text-white/20 group-hover:text-industrial-red" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleInvite}
                disabled={isSendingInvite}
                className="w-full bg-industrial-red text-white font-black uppercase text-xs py-5 rounded-2xl shadow-xl shadow-industrial-red/20 flex items-center justify-center gap-3"
              >
                {isSendingInvite ? (
                   <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Enviando Invitación...
                   </>
                ) : (
                  <>
                    Enviar Acceso
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
