import { fontSerif, fontSans } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aureusestates.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AUREUS ESTATES | Luxury Architectural Residences & Penthouse Advisory',
    template: '%s | Aureus Estates',
  },
  description: 'Exclusive global advisory representing ultra-luxury architectural penthouses, trophy estates, and private residential sanctuaries in New York, Monaco, Tokyo, and Dubai.',
  keywords: [
    'luxury real estate',
    'penthouse for sale',
    'architectural residences',
    'Billionaires Row New York',
    'Monaco ultra prime real estate',
    'Tokyo luxury apartments',
  ],
  authors: [{ name: 'Aureus Estates Private Advisory' }],
  creator: 'Aureus Estates',
  publisher: 'Aureus Estates',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Aureus Estates',
    title: 'AUREUS ESTATES | Luxury Architectural Residences',
    description: 'Exclusive global advisory representing ultra-luxury architectural penthouses and trophy estates.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Aureus Estates Luxury Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AUREUS ESTATES | Luxury Architectural Residences',
    description: 'Exclusive global advisory representing ultra-luxury architectural penthouses and trophy estates.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${fontSerif.variable} ${fontSans.variable}`}>
      <body className="bg-luxury-bg text-gray-100 antialiased selection:bg-luxury-accent selection:text-luxury-bg font-sans">
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
