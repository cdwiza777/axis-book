import type { Metadata } from "next";
import "./globals.css";

// On définit les métadonnées de la page pour le SEO (en évitant tout copyright)
export const metadata: Metadata = {
  title: "AXIS",
  description: "Le guide architectural ultime pour les développeurs modernes.",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-brand-black text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}