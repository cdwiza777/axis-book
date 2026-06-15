"use client";

import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen bg-[#050506] flex items-center justify-center p-4 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-2xl bg-[#09090b] border border-[#18181b] text-center space-y-6 shadow-2xl relative z-10">

        {/* Icône */}
        <div className="flex justify-center">
          <div className="p-3 bg-[#050506] border border-[#18181b] rounded-full">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Titre */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Merci pour votre achat.
          </h1>
          <p className="text-xs text-[#71717a] leading-relaxed px-2">
            Votre paiement a été confirmé. Vous allez recevoir{" "}
            <strong className="text-zinc-200 font-medium">
              Le Système IA de l'Étudiant
            </strong>{" "}
            par email dans les prochaines minutes.
          </p>
        </div>

        {/* Bloc email */}
        <div className="p-4 bg-[#050506] border border-[#18181b] rounded-xl space-y-2">
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-medium">Vérifiez votre boîte mail</span>
          </div>
          <p className="text-[11px] text-[#71717a] leading-relaxed">
            Un email contenant votre lien de téléchargement vous a été envoyé.
            Pensez à vérifier vos spams si vous ne le recevez pas.
          </p>
        </div>

        <p className="text-[10px] text-zinc-600 px-4">
          Conservez cet email — il contient votre lien d'accès permanent au PDF.
        </p>

        {/* Retour */}
        <div className="pt-2 border-t border-[#18181b]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#71717a] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}