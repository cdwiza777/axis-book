import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Lemon Squeezy envoie le body en JSON brut — on doit le lire comme texte
// pour vérifier la signature HMAC avant de le parser
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 });
  }

  // ─── 1. Vérification de la signature HMAC-SHA256 ──────────────────────────
  // Lemon Squeezy signe chaque webhook avec ton secret via HMAC-SHA256
  // Si la signature ne correspond pas → requête rejetée (faux paiement impossible)
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(rawBody);
  const digest = hmac.digest('hex');

  const isValid = crypto.timingSafeEqual(
    Buffer.from(digest, 'hex'),
    Buffer.from(signature, 'hex')
  );

  if (!isValid) {
    console.error('[Webhook] Signature invalide — requête rejetée');
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 });
  }

  // ─── 2. Parser l'événement ────────────────────────────────────────────────
  const event = JSON.parse(rawBody);
  const eventName: string = event?.meta?.event_name ?? '';

  // On ne traite que les commandes réellement payées
  if (eventName !== 'order_created') {
    return NextResponse.json({ received: true, ignored: true });
  }

  const orderData = event?.data?.attributes;
  const checkoutId: string = String(event?.data?.id ?? '');

  // Vérifie que le statut est bien "paid" (pas "pending" ni "refunded")
  if (orderData?.status !== 'paid') {
    return NextResponse.json({ received: true, ignored: true });
  }

  // ─── 3. Idempotence — éviter les doublons en cas de rejeu ────────────────
  const { data: existing } = await supabaseAdmin
    .from('orders')
    .select('id')
    .eq('checkout_id', checkoutId)
    .single();

  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // ─── 4. Insertion dans Supabase ───────────────────────────────────────────
  const { error: insertError } = await supabaseAdmin
    .from('orders')
    .insert({
      customer_email: orderData?.user_email ?? null,
      amount_total:   orderData?.total ?? 0,          // En centimes
      currency:       orderData?.currency ?? 'eur',
      payment_status: 'paid',
      checkout_id:    checkoutId,                      // ID unique de la commande LS
      download_count: 0,
    });

  if (insertError) {
    console.error('[Webhook] Erreur insertion Supabase :', insertError.message);
    // Retourne 500 pour que Lemon Squeezy réessaie automatiquement
    return NextResponse.json({ error: 'Erreur base de données' }, { status: 500 });
  }

  console.log(`[Webhook] Commande enregistrée : ${checkoutId} — ${orderData?.user_email}`);
  return NextResponse.json({ received: true, success: true });
}