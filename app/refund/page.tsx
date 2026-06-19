import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Politique de remboursement — AXIS",
};

export default function RefundPage() {
  return (
    <div className="relative min-h-screen bg-[#050506] text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#71717a] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="space-y-2 border-b border-[#18181b] pb-8">
          <p className="text-[11px] text-[#71717a] tracking-widest uppercase">Mentions légales</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Politique de remboursement
          </h1>
          <p className="text-xs text-[#71717a]">Dernière mise à jour : juin 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Notre engagement</h2>
            <p>
              Nous voulons que vous soyez satisfait de votre achat. Si ce n'est pas le cas,
              voici ce que nous proposons.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Remboursement sous 7 jours</h2>
            <p>
              Si vous n'êtes pas satisfait du contenu après lecture, vous pouvez demander
              un remboursement complet dans les <strong className="text-zinc-200">7 jours suivant votre achat</strong>,
              sans justification obligatoire.
            </p>
            <p>
              Pour cela, envoyez simplement un email à{" "}
              <a href="mailto:contact@axis-book.vercel.app" className="text-zinc-200 hover:text-white underline underline-offset-2">
                contact@axis-book.vercel.app
              </a>{" "}
              avec votre numéro de commande. Le remboursement sera traité sous 3 à 5 jours ouvrés.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Cas non remboursables</h2>
            <p>Les demandes de remboursement ne sont pas acceptées dans les cas suivants :</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "La demande est formulée après 7 jours suivant l'achat",
                "Le fichier a été partagé ou redistribué à des tiers",
                "La demande fait suite à une incompréhension du format (PDF numérique, pas un livre physique)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-1 h-1 rounded-full bg-[#71717a] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Problème technique</h2>
            <p>
              Si vous n'avez pas reçu votre fichier ou si le téléchargement est défaillant,
              contactez-nous immédiatement. Nous résoudrons le problème ou procéderons à un
              remboursement intégral sans délai.
            </p>
          </section>

          {/* Contact CTA */}
          <div className="p-5 bg-[#09090b] border border-[#18181b] rounded-xl space-y-2">
            <p className="text-xs font-medium text-white">Une question ?</p>
            <p className="text-xs text-[#71717a]">
              Écrivez-nous à{" "}
              <a href="mailto:contact@axis-book.vercel.app" className="text-zinc-200 hover:text-white underline underline-offset-2">
                contact@axis-book.vercel.app
              </a>
              . Nous répondons sous 24h.
            </p>
          </div>

        </div>

        {/* Footer links */}
        <div className="pt-8 border-t border-[#18181b] flex gap-6 text-xs text-[#71717a]">
          <Link href="/terms" className="hover:text-white transition-colors">
            Conditions d'utilisation
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}