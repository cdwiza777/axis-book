"use client";

import { useState, useEffect } from "react";
import { BookOpen, ShieldCheck, Zap, ArrowRight, Star, MessageSquare } from "lucide-react";
import PreviewModal from "@/components/PreviewModal";
import Link from "next/link";

const LS_CHECKOUT_URL =
  "https://axis-book-777.lemonsqueezy.com/checkout/buy/16afd012-a014-4633-bc08-dfa18052b06f";

const PRICE = "7,99€";

const TESTIMONIALS = [
  {
    name: "Sophie M.",
    role: "L3 Droit, Paris",
    content: "J'ai réduit mon temps de révision de moitié. Les méthodes IA sont directement applicables, pas du tout du blabla théorique.",
    stars: 5,
    initial: "S",
  },
  {
    name: "Karim B.",
    role: "Master Informatique, Lyon",
    content: "Le chapitre sur la synthèse automatique de cours vaut à lui seul le prix du guide. Résultat immédiat.",
    stars: 5,
    initial: "K",
  },
  {
    name: "Léa T.",
    role: "BTS Communication, Bordeaux",
    content: "Sceptique au départ, mais les techniques sont vraiment adaptées au rythme d'un étudiant. Clair et applicable.",
    stars: 4,
    initial: "L",
  },
];

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "text-white fill-white" : "text-zinc-800 fill-zinc-800"}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[src*="lemonsqueezy.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://lmsqueezy.blob.core.windows.net/lemonsqueezy/lemonsqueezy.js";
    script.defer = true;
    script.onload = () => {
      if ((window as any).LemonSqueezy) (window as any).LemonSqueezy.Setup();
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
    <div className="relative min-h-screen bg-[#050506] text-zinc-100 overflow-x-hidden">

      {/* Glow ambiant */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-[0.12] select-none z-0">
        <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-zinc-600 to-zinc-300 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      
<header className="relative z-10 w-full border-b border-zinc-900 backdrop-blur-md bg-[#050506]/60">
  <div className="max-w-5xl mx-auto px-6 py-5 flex justify-between items-center">
    <span className="text-sm font-bold tracking-widest text-white">
      AXIS<span className="text-zinc-700 font-light">.EDITION</span>
    </span>
    <button
      onClick={openCheckout}
      className="lemonsqueezy-button px-5 py-2 text-xs font-semibold tracking-wide text-black bg-white rounded-lg transition-all duration-200 hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
    >
      Obtenir le PDF
    </button>
  </div>
</header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 space-y-28">

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-7 flex flex-col space-y-7 text-center lg:text-left">

            <div className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start px-3 py-1 text-[10px] font-medium rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              PDF numérique · Accès immédiat
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-[1.1] text-white">
              Le Système IA<br />
              <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                de l'Étudiant.
              </span>
            </h1>

            {/* Description — couleur zinc explicite, pas de classe text- héritée */}
            <p style={{ color: "#71717a" }} className="text-sm max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Un manuel méthodologique pour structurer vos révisions, automatiser
              vos synthèses et maximiser vos résultats grâce à l'intelligence
              artificielle. Conçu pour les étudiants qui veulent travailler moins
              pour des résultats meilleurs.
            </p>

            {/* Prix */}
            <div className="flex flex-col items-center lg:items-start gap-1">
              <span className="text-3xl font-bold text-white tracking-tight">{PRICE}</span>
              <span className="text-[10px] tracking-wider uppercase" style={{ color: "#52525b" }}>
                Paiement unique · Accès à vie
              </span>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">

              {/* CTA principal — blanc, rectangle légèrement arrondi, glow au hover */}
              <button
                onClick={openCheckout}
                className="lemonsqueezy-button group flex items-center justify-center gap-2.5 px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-zinc-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] active:scale-[0.98]"
              >
                Obtenir mon exemplaire
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              {/* Secondaire — transparent, bordure subtile, pas de fond au hover */}
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="group flex items-center justify-center gap-2.5 px-6 py-3 bg-transparent border border-zinc-800 text-zinc-500 text-sm rounded-lg transition-all duration-200 hover:border-zinc-600 hover:text-zinc-200 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4" />
                Feuilleter un extrait
              </button>
            </div>
          </div>

          {/* Couverture */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
              <div className="absolute inset-0 bg-white/[0.04] blur-3xl rounded-3xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-60 h-[360px] rounded-xl overflow-hidden border border-zinc-800/80 group-hover:-translate-y-1.5 transition-transform duration-500 shadow-2xl bg-zinc-900">
                <img
                  src="/cover.png"
                  alt="AXIS — Le Système IA de l'Étudiant"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Garanties */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              icon: <Zap className="w-4 h-4 text-zinc-500" />,
              title: "Accès immédiat",
              desc: "Votre fichier est disponible dès la confirmation du paiement, via un lien unique et sécurisé.",
            },
            {
              icon: <BookOpen className="w-4 h-4 text-zinc-500" />,
              title: "Format vectoriel",
              desc: "Rendu parfait sur tous les écrans. Lisible sur téléphone, tablette ou ordinateur sans perte de qualité.",
            },
            {
              icon: <ShieldCheck className="w-4 h-4 text-zinc-500" />,
              title: "Remboursé si insatisfait",
              desc: "Pas convaincu dans les 7 jours ? Un email suffit pour être remboursé intégralement.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 flex flex-col gap-3"
            >
              {card.icon}
              <p className="text-xs font-semibold text-zinc-200">{card.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#52525b" }}>{card.desc}</p>
            </div>
          ))}
        </section>

        {/* Témoignages */}
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "#3f3f46" }}>
              Retours lecteurs
            </p>
            <h2 className="text-xl font-bold text-white tracking-tight">Des résultats concrets.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/60 flex flex-col gap-4"
              >
                <Stars count={t.stars} />
                <p className="text-xs leading-relaxed flex-1" style={{ color: "#71717a" }}>
                  {t.content}
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-zinc-800/50">
                  <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-zinc-300">{t.name}</p>
                    <p className="text-[10px]" style={{ color: "#3f3f46" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-xs transition-colors"
              style={{ color: "#3f3f46" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a1a1aa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3f3f46")}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Vous avez lu le guide ? Partagez votre retour
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center space-y-5">
          <p className="text-[10px] tracking-widest uppercase" style={{ color: "#3f3f46" }}>Prêt ?</p>
          <h2 className="text-2xl font-bold text-white tracking-tight">Commencez aujourd'hui.</h2>
          <p className="text-xs" style={{ color: "#52525b" }}>{PRICE} · PDF · Accès immédiat</p>
          <button
            onClick={openCheckout}
            className="lemonsqueezy-button inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-zinc-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] active:scale-[0.98]"
          >
            Obtenir mon exemplaire <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onBuy={() => { setIsPreviewOpen(false); openCheckout(); }}
      />

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-8 bg-[#050506]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs" style={{ color: "#3f3f46" }}>© 2026 AXIS. Tous droits réservés.</span>
          <div className="flex gap-8">
            {[
              { href: "/terms", label: "Conditions d'utilisation" },
              { href: "/refund", label: "Remboursement" },
              { href: "/reviews", label: "Avis clients" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors"
                style={{ color: "#52525b" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#a1a1aa")}
                onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}