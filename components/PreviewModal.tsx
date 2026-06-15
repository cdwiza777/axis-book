"use client";

import { X, ArrowLeft, ArrowRight, Download, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: () => void;
}

export default function PreviewModal({ isOpen, onClose, onBuy }: PreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Ajuste selon le nombre exact d'images que tu as

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Tableau de correspondance pour lier chaque page à son image dans le dossier public/
  const pageImages: { [key: number]: string } = {
    1: "/page1.png",
    2: "/page2.png",
    3: "/page3.png",
    4: "/page4.png",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Arrière-plan flouté */}
      <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-xl transition-opacity duration-300" onClick={onClose} />

      {/* Conteneur de la Modale */}
      <div className="relative w-full max-w-xl h-[85vh] bg-zinc-950 border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10">
        
        {/* Barre supérieure */}
        <div className="px-6 py-4 border-b border-brand-border/60 flex items-center justify-between bg-brand-dark/50 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              <Sparkles className="w-3 h-3 text-zinc-400" /> Extrait Réel : Le Système IA de l'Étudiant
            </span>
            <span className="text-[10px] bg-brand-dark border border-brand-border px-2 py-0.5 rounded text-zinc-400 font-mono">
              Page {currentPage} / {totalPages}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-brand-dark border border-brand-border text-brand-muted hover:text-brand-pure transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zone de rendu de la capture d'écran */}
        <div className="flex-1 bg-[#050506] p-4 sm:p-6 overflow-y-auto flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-[1/1.41] bg-brand-dark border border-brand-border/80 rounded-xl shadow-xl overflow-hidden group select-none">
            
            {/* Image réelle de la page du livre */}
            <img 
              src={pageImages[currentPage]} 
              alt={`Page ${currentPage} du Kit de Survie IA`}
              className="w-full h-full object-contain bg-zinc-900"
            />

            {/* Filigrane discret pour le côté premium / exclusif */}
            <div className="absolute bottom-2 right-3 text-[8px] font-mono tracking-widest text-white/10 pointer-events-none uppercase">
              Aperçu Exclusif AXIS
            </div>
          </div>
        </div>

        {/* Barre de navigation basse */}
        <div className="px-6 py-4 border-t border-brand-border/60 bg-brand-dark/80 flex flex-row justify-between items-center">
          <div className="flex space-x-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)} 
              className="p-2 rounded-lg border border-brand-border text-zinc-400 hover:text-brand-pure bg-brand-black disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)} 
              className="p-2 rounded-lg border border-brand-border text-zinc-400 hover:text-brand-pure bg-brand-black disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <button onClick={onBuy} className="flex items-center gap-2 px-4 py-2 bg-brand-pure text-brand-black font-bold text-xs rounded-lg transition-transform hover:scale-[1.02]">
            <Download className="w-3.5 h-3.5" /> Débloquer le Guide Complet
          </button>
        </div>

      </div>
    </div>
  );
}