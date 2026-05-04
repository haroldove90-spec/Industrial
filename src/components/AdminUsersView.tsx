/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Clock
} from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { UserProfile, UserRole } from '../types';

export default function AdminUsersView() {
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'management': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'quality': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'maintenance': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'operator': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0a0a0a] p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-3xl font-serif italic text-white flex items-center gap-4">
            <Settings className="text-blue-500 w-8 h-8" /> Gestión de Accesos
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Control de Roles y Permisos del Sistema (RBAC)</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="Buscar usuario o correo..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-blue-500 transition-all outline-none text-white h-[52px]"
          />
        </div>
      </div>

      <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Usuario</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Rol Asignado</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Último Acceso</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Estado</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user.name}</p>
                        <p className="text-[10px] text-white/30 font-mono">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-white/40">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-mono">{user.lastAccess}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      {user.isActive ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-[10px] font-bold text-green-500/80 uppercase">Activo</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-[10px] font-bold text-red-500/80 uppercase">Suspendido</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-2 rounded-xl transition-all h-[44px] w-[44px] flex items-center justify-center ${
                          user.isActive ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                        }`}
                        title={user.isActive ? 'Desactivar Usuario' : 'Activar Usuario'}
                       >
                         {user.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                       </button>
                       <button className="p-2 bg-white/5 rounded-xl text-white/40 hover:bg-white/10 transition-all h-[44px] w-[44px] flex items-center justify-center">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#D4AF37] mb-4 flex items-center gap-2">
               <ShieldCheck className="w-4 h-4" /> Política de Seguridad
            </h3>
            <p className="text-[10px] text-white/40 leading-relaxed font-medium">
               Todos los cambios en roles son auditados. La desactivación inmediata revoca todos los tokens persistentes en la aplicación del cliente.
            </p>
         </div>
         <div className="md:col-span-2 bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 p-8 rounded-3xl flex items-center justify-between">
            <div>
               <h4 className="text-lg font-serif italic text-white">Nuevos Usuarios</h4>
               <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Requiere aprobación nivel gerencial</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 h-[52px]">
               Invitar Usuario
            </button>
         </div>
      </div>
    </motion.div>
  );
}
