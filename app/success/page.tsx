"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  // Lemon Squeezy envoie ?order_id=XXXX dans l'URL de succès configurée
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      return;
    }
    // Délai de 2.5s pour laisser le webhook LS insérer la commande dans Supabase
    const timer = setTimeout(() => {
      setStatus("success");
      window.location.href = `/api/download?orderId=${orderId}`;
    }, 2500);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-[#09090b] border border-[#18181b] text-center space-y-6 shadow-2xl relative z-10">

      {status === "loading" && (
        <div className="flex flex-col items-center space-y-4 py-6">
          <Loader2 className="w-12 h-12 text-zinc-400 animate-spin" />
          <h1 className="text-xl font-semibold text-white">
            Confirmation du paiement…
          </h1>
          <p className="text-xs text-[#71717a] px-4 leading-relaxed">
            Nous préparons votre lien de téléchargement sécurisé.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-3 bg-[#050506] border border-[#18181b] rounded-full">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Merci pour votre achat.
            </h1>
            <p className="text-xs text-[#71717a] leading-relaxed px-2">
              Le téléchargement de{" "}
              <strong className="text-zinc-200 font-medium">
                Le Système IA de l'Étudiant
              </strong>{" "}
              a démarré automatiquement.
            </p>
          </div>

          <div className="p-4 bg-[#050506] border border-[#18181b] rounded-xl space-y-3">
            <p className="text-[11px] text-zinc-400">
              Le téléchargement n'a pas démarré ?
            </p>
            <a
              href={`/api/download?orderId=${orderId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-lg transition-transform hover:scale-[1.01]"
            >
              <Download className="w-3.5 h-3.5" />
              Télécharger maintenant
            </a>
          </div>

          <p className="text-[10px] text-zinc-600 px-4">
            Lien valable 5 minutes · Limité à 5 téléchargements · Conservez votre PDF.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4 py-4">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h1 className="text-lg font-bold text-red-400">Lien invalide</h1>
          <p className="text-xs text-[#71717a] leading-relaxed px-2">
            Aucune commande détectée. Si vous avez effectué un paiement,
            contactez le support avec votre email d'achat.
          </p>
        </div>
      )}

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
  );
}

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen bg-[#050506] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <Suspense fallback={
        <div className="flex items-center gap-2 text-xs text-[#71717a]">
          <Loader2 className="w-4 h-4 animate-spin" /> Chargement…
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}