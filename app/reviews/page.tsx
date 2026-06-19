"use client";

import { useState } from "react";
import { Star, ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

type Review = {
  name: string;
  role: string;
  stars: number;
  content: string;
  date: string;
};

// ─── Avis existants (à enrichir au fil du temps) ─────────────────────────────
const PUBLISHED_REVIEWS: Review[] = [
  {
    name: "Sophie M.",
    role: "L3 Droit, Paris",
    stars: 5,
    content: "J'ai réduit mon temps de révision de moitié. Les méthodes IA sont directement applicables, pas du tout du blabla théorique.",
    date: "Juin 2026",
  },
  {
    name: "Karim B.",
    role: "Master Informatique, Lyon",
    stars: 5,
    content: "Le chapitre sur la synthèse automatique de cours vaut à lui seul le prix du guide. Résultat immédiat.",
    date: "Juin 2026",
  },
  {
    name: "Léa T.",
    role: "BTS Communication, Bordeaux",
    stars: 4,
    content: "Sceptique au départ, mais les techniques sont vraiment adaptées au rythme d'un étudiant. Clair et applicable.",
    date: "Juin 2026",
  },
];

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i + 1)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              i < (hovered || value)
                ? "text-white fill-white"
                : "text-zinc-700 fill-zinc-700"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [form, setForm] = useState({ name: "", role: "", stars: 0, content: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.content || form.stars === 0) {
      setErrorMsg("Merci de remplir votre nom, votre avis et de noter le guide.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", role: "", stars: 0, content: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050506] text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#71717a] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour à l'accueil
        </Link>

        {/* Header */}
        <div className="space-y-2 border-b border-[#18181b] pb-8">
          <p className="text-[11px] text-[#71717a] tracking-widest uppercase">Retours lecteurs</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">Avis clients</h1>
          <p className="text-xs text-[#71717a]">
            {PUBLISHED_REVIEWS.length} avis vérifiés
          </p>
        </div>

        {/* Avis publiés */}
        <div className="space-y-4">
          {PUBLISHED_REVIEWS.map((r, i) => (
            <div key={i} className="p-5 bg-[#09090b] border border-[#18181b] rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{r.name}</p>
                  <p className="text-[10px] text-[#71717a]">{r.role} · {r.date}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s < r.stars ? "text-white fill-white" : "text-zinc-700 fill-zinc-700"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">"{r.content}"</p>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div className="space-y-6 pt-4 border-t border-[#18181b]">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-white">Laisser votre avis</h2>
            <p className="text-xs text-[#71717a]">
              Vous avez lu le guide ? Partagez votre retour honnête.
            </p>
          </div>

          <div className="space-y-4">
            {/* Nom */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">Prénom et initiale *</label>
              <input
                type="text"
                placeholder="Sophie M."
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[#09090b] border border-[#18181b] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            {/* Rôle */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">Votre profil (optionnel)</label>
              <input
                type="text"
                placeholder="L3 Droit, Paris"
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full bg-[#09090b] border border-[#18181b] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            {/* Étoiles */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">Note *</label>
              <StarPicker value={form.stars} onChange={v => setForm(f => ({ ...f, stars: v }))} />
            </div>

            {/* Contenu */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">Votre avis *</label>
              <textarea
                rows={4}
                placeholder="Qu'avez-vous pensé du guide ? Qu'est-ce qui vous a le plus aidé ?"
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                className="w-full bg-[#09090b] border border-[#18181b] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400">{errorMsg}</p>
            )}

            {status === "success" ? (
              <div className="flex items-center gap-2 text-sm text-zinc-300 py-2">
                <CheckCircle className="w-4 h-4" />
                Merci pour votre retour — il sera publié après vérification.
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-semibold rounded-lg transition-all hover:bg-zinc-200 disabled:opacity-50"
              >
                {status === "loading" ? (
                  "Envoi en cours…"
                ) : (
                  <><Send className="w-3.5 h-3.5" /> Soumettre mon avis</>
                )}
              </button>
            )}

            {status === "error" && (
              <p className="text-xs text-red-400">
                Une erreur est survenue. Réessayez ou contactez-nous par email.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}