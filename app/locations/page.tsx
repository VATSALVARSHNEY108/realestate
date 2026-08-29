import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Global Locations | Aureus Estates',
  description: 'Explore Aureus Estates\' curated portfolio of luxury residences across the world\'s most coveted residential addresses: New York, Monaco, Tokyo, Dubai, and beyond.',
};

const LOCATIONS = [
  {
    city: 'New York',
    country: 'United States',
    tagline: 'The Pinnacle of Vertical Living',
    description: 'From the crystalline spires of Billionaires\' Row to the quiet grandeur of the West Village, Aureus Estates\' New York portfolio represents the apex of Manhattan\'s luxury residential market.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    properties: 14,
    slug: 'new-york',
    highlight: 'Billionaires\' Row',
  },
  {
    city: 'Monaco',
    country: 'Principality of Monaco',
    tagline: 'Sovereign Prestige on the Côte d\'Azur',
    description: 'Monaco\'s micro-geography of tax efficiency and Mediterranean splendour makes it the world\'s most concentrated luxury real estate market. Our Monaco team holds exclusive mandates on Tour Odéon and One Monte-Carlo.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    properties: 6,
    slug: 'monaco',
    highlight: 'Monte-Carlo',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    tagline: 'Architectural Precision Meets Ancient Majesty',
    description: 'Tokyo\'s luxury residential market blends Zen spatial philosophy with cutting-edge architectural innovation. Our Minato and Shibuya portfolios offer unrivalled access to Japan\'s most coveted addresses.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    properties: 9,
    slug: 'tokyo',
    highlight: 'Minato-ku',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'The New Capital of Global Ambition',
    description: 'Palm Jumeirah\'s ultra-prime waterfront and Downtown Dubai\'s crystalline towers define a city that has reimagined luxury at civilizational scale. Zero income tax and world-class connectivity make Dubai compelling for global principals.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    properties: 11,
    slug: 'dubai',
    highlight: 'Palm Jumeirah',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    tagline: 'Heritage & Timeless Capital Preservation',
    description: 'Mayfair, Belgravia, and Chelsea continue to command the world\'s most resilient prime property market. Our London advisory accesses off-market Georgian terraces and new ultra-prime developments in Nine Elms.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    properties: 8,
    slug: 'london',
    highlight: 'Mayfair',
  },
  {
    city: 'Singapore',
    country: 'Republic of Singapore',
    tagline: 'Asia\'s Sovereign Financial Capital',
    description: 'Singapore\'s Orchard Road corridor and Sentosa Cove island residences represent the premier destination for Asia-Pacific family offices seeking stability, rule of law, and architectural excellence.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    properties: 7,
    slug: 'singapore',
    highlight: 'Sentosa Cove',
  },
];

export default function LocationsPage() {
  return (
    <div className="pt-24 space-y-0">
      {/* Hero */}
      <Section spacing="lg">
        <Container size="xl" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-3">
              <Badge variant="gold">Global Portfolio</Badge>
              <Heading level="h1">The World&apos;s Finest Residential Addresses</Heading>
            </div>
            <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
              Aureus Estates maintains curated portfolios in six of the world&apos;s most prestigious residential markets, each managed by a dedicated principal with deep local relationships.
            </p>
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.city} className="glass-panel p-2 rounded-2xl border border-white/10 group hover:border-luxury-accent/30 transition-all duration-500">
                <div className="overflow-hidden rounded-xl">
                  <ImageWrapper
                    src={loc.image}
                    alt={`${loc.city} luxury real estate`}
                    aspectRatio="video"
                    className="h-[240px] w-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {loc.country}
                      </p>
                      <h3 className="font-serif text-xl text-luxury-primary mt-0.5">{loc.city}</h3>
                    </div>
                    <Badge variant="surface">{loc.properties} Properties</Badge>
                  </div>

                  <p className="text-luxury-muted text-xs font-light leading-relaxed line-clamp-3">{loc.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-muted">
                      Prime District: <span className="text-luxury-accent">{loc.highlight}</span>
                    </span>
                    <Link href="/properties">
                      <Button variant="text" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Coverage CTA */}
      <Section spacing="xl" className="bg-luxury-surface/30">
        <Container size="md" className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center space-y-6">
          <Badge variant="gold" className="mx-auto">Not Finding Your Market?</Badge>
          <Heading level="h2">We Source Globally on Mandate</Heading>
          <p className="text-luxury-muted text-sm font-light max-w-md mx-auto leading-relaxed">
            If your target market is not listed above, our principals conduct bespoke sourcing across 40+ countries. Contact our global advisory desk to discuss your acquisition brief.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Submit Global Acquisition Brief
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
