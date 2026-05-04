/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  X,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { MOCK_BLUEPRINTS } from '../constants';
import { Blueprint } from '../types';

export default function BlueprintViewer() {
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-industrial-card p-8 rounded-3xl border border-industrial-border shadow-2xl">
        <div>
          <h2 className="text-3xl font-black italic text-white flex items-center gap-4 uppercase tracking-tighter">
            <FileText className="text-industrial-red w-8 h-8" /> Catálogo de Planos
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Especificaciones técnicas y planos certificados</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
           <input 
            type="text" 
            placeholder="Buscar por código..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:border-industrial-red/50 transition-all outline-none text-white tracking-wider"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        {/* Sidebar List */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-red/60 mb-2">Documentos Recientes</h3>
           {MOCK_BLUEPRINTS.map((bp) => (
             <div 
              key={bp.id}
              onClick={() => {
                setSelectedBlueprint(bp);
                setZoom(1);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group flex items-center gap-4 ${
                selectedBlueprint?.id === bp.id 
                  ? 'bg-industrial-red/10 border-industrial-red' 
                  : 'bg-industrial-card border-industrial-border hover:border-industrial-red/40'
              }`}
             >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-industrial-red/20 transition-colors">
                   <FileText className={`w-5 h-5 ${selectedBlueprint?.id === bp.id ? 'text-industrial-red' : 'text-white/20'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-industrial-red transition-colors">{bp.title}</h4>
                  <p className="text-[10px] text-white/20 font-mono mt-1">{bp.code}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Viewer Area */}
        <div className="lg:col-span-3">
          {selectedBlueprint ? (
             <div className="bg-industrial-card rounded-3xl border border-industrial-border h-full flex flex-col overflow-hidden shadow-2xl relative">
                {/* Viewer Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10">
                   <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-white/60">{selectedBlueprint.code} <span className="text-industrial-red">v{selectedBlueprint.version}</span></span>
                      <div className="h-4 w-px bg-white/10"></div>
                      <div className="flex items-center gap-2">
                         <button onClick={handleZoomOut} className="p-2 hover:bg-white/5 rounded-lg text-white/40"><ZoomOut className="w-4 h-4" /></button>
                         <span className="text-[10px] font-mono text-white/20 w-10 text-center">{Math.round(zoom * 100)}%</span>
                         <button onClick={handleZoomIn} className="p-2 hover:bg-white/5 rounded-lg text-white/40"><ZoomIn className="w-4 h-4" /></button>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                      <button 
                        onClick={() => setIsFullScreen(true)}
                        className="p-2 bg-white/5 hover:bg-industrial-red rounded-xl transition-all"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div className="flex-1 overflow-auto bg-black p-12 scrollbar-hide flex items-center justify-center">
                   <motion.div 
                    animate={{ scale: zoom }}
                    className="relative shadow-2xl transition-transform cursor-grab active:cursor-grabbing origin-center"
                   >
                     <img 
                      src={selectedBlueprint.imageUrl} 
                      alt={selectedBlueprint.title}
                      className="max-w-[800px] w-full h-auto rounded-lg"
                      referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
                   </motion.div>
                </div>

                {/* Specs Drawer */}
                <div className="p-8 border-t border-white/5 bg-industrial-bg">
                   <div className="flex items-center gap-2 mb-6">
                      <Info className="w-4 h-4 text-[#D4AF37]" />
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Especificaciones de Manufactura</h5>
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     {selectedBlueprint.specifications.map((spec) => (
                       <div key={spec.label}>
                          <p className="text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">{spec.label}</p>
                          <p className="text-sm font-bold text-white">{spec.value}</p>
                       </div>
                     ))}
                     <div className="flex items-center gap-2 text-green-500/50">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase">Planos Verificados V.V.</span>
                     </div>
                   </div>
                </div>
             </div>
          ) : (
            <div className="h-full border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-12 opacity-30 bg-black/20">
               <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                  <FileText className="w-10 h-10 text-white/20" />
               </div>
               <h4 className="text-xl font-serif italic text-white mb-4">Visor de Ingeniería</h4>
               <p className="text-xs max-w-xs leading-relaxed font-medium">Seleccione un plano del catálogo para visualizar especificaciones, tolerancias y materiales certificados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isFullScreen && selectedBlueprint && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
             <div className="p-6 flex justify-between items-center bg-black/80 backdrop-blur-md">
                <h3 className="text-white font-bold">{selectedBlueprint.title}</h3>
                <button onClick={() => setIsFullScreen(false)} className="p-2 hover:bg-white/10 rounded-full text-white">
                  <X className="w-6 h-6" />
                </button>
             </div>
             <div className="flex-1 overflow-auto flex items-center justify-center p-10">
                <img 
                  src={selectedBlueprint.imageUrl} 
                  alt={selectedBlueprint.title}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
