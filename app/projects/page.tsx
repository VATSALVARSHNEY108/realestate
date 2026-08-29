import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Flagship Projects | Aureus Estates',
  description: 'Explore Aureus Estates\' curated flagship development projects — architectural landmarks across New York, Monaco, and Tokyo delivering the highest standard of luxury living.',
};

const PROJECTS = [
  {
    name: 'The Solstice',
    location: 'Midtown Manhattan, New York',
    developer: 'Voss Development Group',
    status: 'Under Construction',
    statusColor: 'yellow',
    completion: 'Q4 2027',
    units: 88,
    startingPrice: '$8.2M',
    description: 'A crystalline 92-floor residential tower designed by Bjarke Ingels Group, establishing a new typology for vertical luxury living on Manhattan\'s elite 57th Street corridor.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
    features: ['Sky Infinity Pool at Level 70', 'Private Sommelier & Wine Vault', 'Automated Subterranean Parking', 'Resident Concierge Medical Team'],
  },
  {
    name: 'Tour Lumière',
    location: 'Monaco Ville, Monaco',
    developer: 'Fontaine & Associés',
    status: 'Pre-Launch',
    statusColor: 'blue',
    completion: 'Q2 2028',
    units: 24,
    startingPrice: '€18M',
    description: 'Twenty-four ultra-prime sea-facing residences cascading down the rock of Monaco, each commanding unobstructed panoramas of the Mediterranean from the principality\'s most exclusive promontory.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80',
    features: ['Private Yacht Berth per Residence', 'Michelin-Star In-Residence Chef', 'Helicopter Transfer Service', 'Art Advisory Programme'],
  },
  {
    name: 'Minato Sanctuary',
    location: 'Minato-ku, Tokyo',
    developer: 'Nakamura Holdings',
    status: 'Available Now',
    statusColor: 'green',
    completion: 'Completed 2025',
    units: 32,
    startingPrice: '¥850M',
    description: 'An architectural dialogue between Shigeru Ban\'s timber structural philosophy and Tokyo\'s historic Azabu neighbourhood. Thirty-two residences offering a stillness rarely found in the world\'s most densely innovative city.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    features: ['Onsen Spa & Zen Garden', 'Dedicated Tea Ceremony Room', 'Curated Art Collection', 'Private Sake Cellar'],
  },
];

const STATUS_COLORS: Record<string, string> = {
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 space-y-0">
      {/* Hero */}
      <Section spacing="lg">
        <Container size="xl" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-3">
              <Badge variant="gold">Flagship Developments</Badge>
              <Heading level="h1">Architectural Landmarks in Progress</Heading>
            </div>
            <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
              Aureus Estates holds exclusive advisory mandates on a select number of flagship developments each year — chosen for architectural pedigree, location irreplaceability, and developer credibility.
            </p>
          </div>

          {/* Project Cards */}
          <div className="space-y-12">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.name}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className={`lg:col-span-6 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="glass-panel p-2 rounded-2xl border border-white/10">
                    <ImageWrapper
                      src={project.image}
                      alt={project.name}
                      aspectRatio="video"
                      className="rounded-xl h-[320px] sm:h-[400px] w-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-6 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border ${STATUS_COLORS[project.statusColor]}`}>
                        {project.status}
                      </span>
                      <Badge variant="outline">{project.location}</Badge>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-primary">{project.name}</h2>
                    <p className="text-luxury-muted text-[10px] uppercase tracking-widest">{project.developer}</p>
                  </div>

                  <p className="text-luxury-muted text-sm font-light leading-relaxed">{project.description}</p>

                  {/* Key Figures */}
                  <div className="grid grid-cols-3 gap-4 glass-card p-5 rounded-xl border border-white/5">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-luxury-muted">Units</p>
                      <p className="font-serif text-xl text-luxury-primary mt-1">{project.units}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-luxury-muted">From</p>
                      <p className="font-serif text-xl text-luxury-accent mt-1">{project.startingPrice}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-luxury-muted flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" /> Delivery
                      </p>
                      <p className="font-serif text-xl text-luxury-primary mt-1">{project.completion}</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">Signature Inclusions</p>
                    <ul className="space-y-2">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-luxury-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-luxury-accent flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link href="/contact">
                      <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                        Request Project Prospectus
                      </Button>
                    </Link>
                    <Link href="/properties">
                      <Button variant="secondary" size="md" icon={<Building2 className="w-4 h-4" />}>
                        View Available Units
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="xl" className="bg-luxury-surface/30">
        <Container size="md" className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center space-y-6">
          <Badge variant="gold" className="mx-auto">Co-Development Advisory</Badge>
          <Heading level="h2">Partner with Aureus Estates</Heading>
          <p className="text-luxury-muted text-sm font-light max-w-md mx-auto leading-relaxed">
            Are you a developer seeking an exclusive advisory mandate for an ultra-prime project? Our principals review a limited number of new development partnerships each year.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Discuss Development Mandate
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
