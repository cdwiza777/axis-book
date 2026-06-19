import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, stars, content } = body;

    // Validation basique
    if (!name || !content || !stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    // Limite la longueur pour éviter le spam
    if (content.length > 1000 || name.length > 100) {
      return NextResponse.json({ error: 'Contenu trop long' }, { status: 400 });
    }

    // Insertion dans Supabase (table reviews à créer — SQL ci-dessous)
    const { error } = await supabaseAdmin
      .from('reviews')
      .insert({
        name:      name.trim(),
        role:      role?.trim() ?? null,
        stars:     Number(stars),
        content:   content.trim(),
        approved:  false, // Modération manuelle avant publication
      });

    if (error) {
      console.error('[Reviews] Erreur Supabase :', error.message);
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[Reviews] Erreur inattendue :', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

