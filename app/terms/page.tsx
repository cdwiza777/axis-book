import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Conditions d'utilisation — AXIS",
};

export default function TermsPage() {
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
            Conditions d'utilisation
          </h1>
          <p className="text-xs text-[#71717a]">Dernière mise à jour : juin 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">1. Identification du vendeur</h2>
            <p>
              Ce site est édité par un particulier agissant en dehors de tout cadre commercial
              structuré. Les ventes sont réalisées via la plateforme Lemon Squeezy, qui agit
              en tant que Merchant of Record et prend en charge la collecte des paiements,
              la facturation et la conformité fiscale applicable.
            </p>
            <p>
              Pour toute question : <a href="mailto:contact@axis-book.vercel.app" className="text-zinc-200 hover:text-white underline underline-offset-2">contact@axis-book.vercel.app</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">2. Nature du produit</h2>
            <p>
              <strong className="text-zinc-200">Le Système IA de l'Étudiant</strong> est un
              bien numérique dématérialisé (fichier PDF). En procédant à l'achat, vous
              reconnaissez acquérir un contenu numérique et non un bien physique.
            </p>
            <p>
              Le fichier est livré par email immédiatement après confirmation du paiement.
              Aucun support physique n'est expédié.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de cet ebook (textes, structure, exemples, illustrations)
              est protégé. Toute reproduction, redistribution, revente ou partage du fichier,
              même partiel, est strictement interdit sans autorisation écrite préalable.
            </p>
            <p>
              La licence accordée est strictement personnelle et non transférable. Elle vous
              autorise à lire et consulter le contenu pour votre usage personnel uniquement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">4. Limitation de responsabilité</h2>
            <p>
              Le contenu de cet ebook est fourni à titre informatif et pédagogique. Les
              résultats académiques dépendent de nombreux facteurs individuels. Aucune
              garantie de résultat n'est exprimée ou implicite.
            </p>
            <p>
              Le vendeur ne saurait être tenu responsable d'une utilisation inadaptée du
              contenu ou de résultats ne correspondant pas aux attentes de l'acheteur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-white">5. Droit applicable</h2>
            <p>
              Ces conditions sont régies par les lois applicables au lieu de résidence du
              vendeur. Lemon Squeezy, en tant que Merchant of Record, applique ses propres
              conditions générales de vente accessibles sur leur site.
            </p>
          </section>

        </div>

        {/* Footer links */}
        <div className="pt-8 border-t border-[#18181b] flex gap-6 text-xs text-[#71717a]">
          <Link href="/refund" className="hover:text-white transition-colors">
            Politique de remboursement
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}