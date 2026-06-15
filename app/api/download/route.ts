import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const MAX_DOWNLOADS = 5;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'ID de commande manquant' }, { status: 400 });
  }

  try {
    // ─── 1. Récupérer la commande ─────────────────────────────────────────
    const { data: order, error: dbError } = await supabaseAdmin
      .from('orders')
      .select('id, payment_status, download_count')
      .eq('checkout_id', orderId)
      .single();

    if (dbError || !order) {
      return NextResponse.json(
        { error: 'Commande introuvable. Vérifiez votre lien.' },
        { status: 404 }
      );
    }

    if (order.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Paiement non confirmé.' },
        { status: 403 }
      );
    }

    // ─── 2. Limite anti-abus ──────────────────────────────────────────────
    if (order.download_count >= MAX_DOWNLOADS) {
      return NextResponse.json(
        { error: `Limite de ${MAX_DOWNLOADS} téléchargements atteinte.` },
        { status: 429 }
      );
    }

    // ─── 3. Incrémenter le compteur ───────────────────────────────────────
    await supabaseAdmin
      .from('orders')
      .update({ download_count: order.download_count + 1 })
      .eq('id', order.id);

    // ─── 4. Générer le Signed URL Supabase Storage (5 minutes) ───────────
    const { data: storageData, error: storageError } = await supabaseAdmin
      .storage
      .from('ebooks')
      .createSignedUrl('IA_Guide_Etudiant.pdf', 300);

    if (storageError || !storageData?.signedUrl) {
      return NextResponse.json(
        { error: 'Impossible de générer le lien de téléchargement.' },
        { status: 500 }
      );
    }

    // ─── 5. Redirection directe ───────────────────────────────────────────
    return NextResponse.redirect(storageData.signedUrl, { status: 302 });

  } catch (error) {
    console.error('[Download] Erreur inattendue :', error);
    return NextResponse.json({ error: 'Erreur serveur interne.' }, { status: 500 });
  }
}