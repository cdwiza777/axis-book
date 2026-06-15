"use client";

import { useState, useEffect } from "react";
import { BookOpen, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import PreviewModal from "@/components/PreviewModal";

// ─── Ton lien Lemon Squeezy réel ─────────────────────────────────────────────
// ?embed=1 → ouvre le checkout en pop-up sans quitter le site
const LS_CHECKOUT_URL =
  "https://axis-book-777.lemonsqueezy.com/checkout/buy/73babe07-9e2b-4e9a-b641-5984cc10bdcf?embed=1";

export default function Home() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Charge le script Lemon Squeezy pour le mode pop-up
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = document.querySelector(
      'script[src*="lemonsqueezy.js"]'
    );
    if (existing) return; // Évite les doublons
    const script = document.createElement("script");
    script.src =
      "https://lmsqueezy.blob.core.windows.net/lemonsqueezy/lemonsqueezy.js";
    script.defer = true;
    script.onload = () => {
      if ((window as any).LemonSqueezy) {
        (window as any).LemonSqueezy.Setup();
      }
    };
    document.body.appendChild(script);
  }, []);

  const openCheckout = () => {
    if ((window as any).LemonSqueezy) {
      (window as any).LemonSqueezy.Url.Open(LS_CHECKOUT_URL);
    } else {
      window.location.href = LS_CHECKOUT_URL;
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-black text-zinc-100 overflow-x-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden opacity-20 select-none z-0">
        <div className="absolute -top-[30%] left-[25%] w-[500px] h-[500px] bg-gradient-to-tr from-zinc-700 to-zinc-400 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-brand-border/40 backdrop-blur-md bg-brand-black/40">
        <div className="text-md font-bold tracking-widest text-brand-pure">
          AXIS<span className="text-brand-muted font-light">.EDITION</span>
        </div>
        <button
          onClick={openCheckout}
          className="lemonsqueezy-button px-4 py-2 text-xs font-medium tracking-wide text-brand-black bg-brand-pure rounded-full transition-all duration-300 hover:bg-zinc-200"
        >
          Acheter le PDF
        </button>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Text */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3 py-1 text-[11px] font-medium rounded-full bg-brand-dark border border-brand-border text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              Format Numérique • Téléchargement Immédiat
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-[1.15] text-brand-pure">
              Le Système IA <br />
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                De l'Étudiant.
              </span>
            </h1>

            <p className="text-base text-brand-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Le manuel méthodologique ultime conçu pour structurer vos révisions,
              automatiser vos synthèses de cours et maximiser vos résultats grâce
              à l'intelligence artificielle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={openCheckout}
                className="lemonsqueezy-button flex items-center justify-center gap-2 px-6 py-3 bg-brand-pure text-brand-black font-semibold text-sm rounded-xl transition-transform duration-200 hover:scale-[1.01]"
              >
                Obtenir mon exemplaire <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-dark border border-brand-border text-zinc-300 font-medium text-sm rounded-xl transition-all duration-200 hover:bg-zinc-800/40"
              >
                <BookOpen className="w-4 h-4" /> Feuilleter un extrait
              </button>
            </div>
          </div>

          {/* Cover */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
              <div className="absolute inset-0 bg-white/5 blur-3xl rounded-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="relative w-64 h-[380px] rounded-xl shadow-2xl overflow-hidden border border-brand-border transition-transform duration-500 group-hover:-translate-y-1 bg-brand-dark">
                <img
                  src="/cover.png"
                  alt="AXIS — Le Système IA de l'Étudiant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bento */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-brand-dark border border-brand-border/60 flex flex-col space-y-3">
            <Zap className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-brand-pure">Accès Direct</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Une fois la transaction validée, votre fichier est disponible
              immédiatement via un lien unique et sécurisé.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-brand-dark border border-brand-border/60 flex flex-col space-y-3">
            <BookOpen className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-brand-pure">Format Vectoriel</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Un rendu parfait et net sur tous vos écrans, sans compression
              ni perte de qualité.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-brand-dark border border-brand-border/60 flex flex-col space-y-3">
            <ShieldCheck className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-semibold text-brand-pure">Achat Sécurisé</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Infrastructure de paiement chiffrée de bout en bout, conforme
              aux standards internationaux.
            </p>
          </div>
        </section>
      </main>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onBuy={() => {
          setIsPreviewOpen(false);
          openCheckout();
        }}
      />

      <footer className="w-full border-t border-brand-border/40 py-6 text-center text-[10px] text-brand-muted bg-brand-black">
        © 2026 AXIS. Tous droits réservés.
      </footer>
    </div>
  );
}