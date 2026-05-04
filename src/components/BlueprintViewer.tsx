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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-industrial-card p-6 md:p-8 rounded-3xl border border-industrial-border shadow-2xl">
        <div>
          <h2 className="text-2xl md:text-3xl font-black italic text-white flex items-center gap-4 uppercase tracking-tighter">
            <FileText className="text-industrial-red w-6 h-6 md:w-8 md:h-8" /> Catálogo de Planos
          </h2>
          <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">Especificaciones técnicas certificadas</p>
        </div>
        
        <div className="relative w-full md:w-72">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
           <input 
            type="text" 
            placeholder="Buscar por código..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 pl-12 pr-6 text-sm focus:border-industrial-red/50 transition-all outline-none text-white tracking-wider h-12 md:h-auto"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 flex-1">
        {/* Sidebar List */}
        <div className="space-y-4 max-h-[300px] lg:max-h-none overflow-y-auto scrollbar-hide lg:border-r lg:border-white/5 lg:pr-4">
           <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-industrial-red/60 mb-2 sticky top-0 bg-industrial-bg py-1 z-10">Documentos Recientes</h3>
           <div className="space-y-3">
            {MOCK_BLUEPRINTS.map((bp) => (
              <div 
               key={bp.id}
               onClick={() => {
                 setSelectedBlueprint(bp);
                 setZoom(1);
               }}
               className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all cursor-pointer group flex items-center gap-3 md:gap-4 ${
                 selectedBlueprint?.id === bp.id 
                   ? 'bg-industrial-red/10 border-industrial-red' 
                   : 'bg-industrial-card border-industrial-border hover:border-industrial-red/40'
               }`}
              >
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 group-hover:bg-industrial-red/20 transition-colors">
                    <FileText className={`w-4 h-4 md:w-5 md:h-5 ${selectedBlueprint?.id === bp.id ? 'text-industrial-red' : 'text-white/20'}`} />
                 </div>
                 <div className="truncate">
                   <h4 className="text-xs md:text-sm font-bold text-white group-hover:text-industrial-red transition-colors truncate">{bp.title}</h4>
                   <p className="text-[9px] md:text-[10px] text-white/20 font-mono mt-0.5">{bp.code}</p>
                 </div>
              </div>
            ))}
           </div>
        </div>

        {/* Viewer Area */}
        <div className="lg:col-span-3 h-full min-h-[400px]">
          {selectedBlueprint ? (
             <div className="bg-industrial-card rounded-[2rem] md:rounded-3xl border border-industrial-border h-full flex flex-col overflow-hidden shadow-2xl relative">
                {/* Viewer Toolbar */}
                <div className="p-3 md:p-4 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10 gap-4">
                   <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      <span className="text-[10px] md:text-xs font-bold text-white/60">{selectedBlueprint.code} <span className="text-industrial-red">v{selectedBlueprint.version}</span></span>
                      <div className="hidden sm:block h-4 w-px bg-white/10"></div>
                      <div className="flex items-center gap-2">
                         <button onClick={handleZoomOut} className="p-1.5 md:p-2 hover:bg-white/5 rounded-lg text-white/40"><ZoomOut className="w-4 h-4" /></button>
                         <span className="text-[9px] md:text-[10px] font-mono text-white/20 w-10 text-center">{Math.round(zoom * 100)}%</span>
                         <button onClick={handleZoomIn} className="p-1.5 md:p-2 hover:bg-white/5 rounded-lg text-white/40"><ZoomIn className="w-4 h-4" /></button>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                      <button 
                        onClick={() => setIsFullScreen(true)}
                        className="p-2 bg-white/5 hover:bg-industrial-red rounded-lg md:rounded-xl transition-all"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div className="flex-1 overflow-auto bg-black p-6 md:p-12 scrollbar-hide flex items-center justify-center min-h-[300px]">
                   <motion.div 
                    animate={{ scale: zoom }}
                    className="relative shadow-2xl transition-transform cursor-grab active:cursor-grabbing origin-center"
                   >
                     <img 
                      src={selectedBlueprint.imageUrl} 
                      alt={selectedBlueprint.title}
                      className="max-w-[300px] sm:max-w-[500px] md:max-w-[800px] w-full h-auto rounded-lg"
                      referrerPolicy="no-referrer"
                     />
                   </motion.div>
                </div>

                {/* Specs Drawer */}
                <div className="p-6 md:p-8 border-t border-white/5 bg-industrial-bg">
                   <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <Info className="w-4 h-4 text-industrial-orange" />
                      <h5 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-industrial-orange">Especificaciones</h5>
                   </div>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
                     {selectedBlueprint.specifications.slice(0, 4).map((spec) => (
                       <div key={spec.label}>
                          <p className="text-[8px] md:text-[9px] font-black uppercase text-white/20 tracking-widest mb-1">{spec.label}</p>
                          <p className="text-xs md:text-sm font-bold text-white truncate">{spec.value}</p>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          ) : (
            <div className="h-full min-h-[300px] border border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center p-8 md:p-12 opacity-30 bg-black/20">
               <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 md:mb-8">
                  <FileText className="w-8 h-8 md:w-10 md:h-10 text-white/20" />
               </div>
               <h4 className="text-lg md:text-xl font-serif italic text-white mb-2 md:mb-4">Visor de Ingeniería</h4>
               <p className="text-[10px] md:text-xs max-w-xs leading-relaxed font-medium">Seleccione un plano del catálogo.</p>
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
