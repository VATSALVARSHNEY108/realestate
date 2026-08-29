import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Button } from '@/components/ui/Button';
import { PropertyStat } from '@/components/ui/PropertyStat';
import Link from 'next/link';
import { Award, Globe, Shield, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Aureus Estates | Luxury Real Estate Atelier',
  description: 'Aureus Estates is a private luxury real estate advisory founded in New York, Monaco, and Tokyo. Discover our heritage, philosophy, and global principal advisory team.',
};

const TEAM = [
  {
    name: 'Alexander Voss',
    title: 'Founding Principal',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Former Goldman Sachs Managing Director. 28 years architecting ultra-high-net-worth real estate portfolios across 22 countries.',
  },
  {
    name: 'Isabelle Fontaine',
    title: 'Director — Europe & Monaco',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: "Sotheby's International Realty alumni. Specialises in private island estates and Cote d'Azur trophy properties.",
  },
  {
    name: 'Kenji Nakamura',
    title: 'Director — Asia Pacific',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Led $4.2B in Tokyo luxury residential transactions. Advisor to three sovereign wealth funds.',
  },
];

const AWARDS = [
  { year: '2025', title: 'Luxury Real Estate Firm of the Year', org: 'Forbes Global Properties' },
  { year: '2024', title: 'Best Ultra-Premium Advisory', org: 'The Financial Times Wealth Report' },
  { year: '2023', title: 'Top 1% Global Residential Advisor', org: 'Christie\'s International' },
  { year: '2022', title: 'Architecture & Design Excellence', org: 'Architectural Digest' },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Absolute Discretion',
    description: 'Every engagement begins with a mutual NDA. Client confidentiality is non-negotiable at every stage.',
  },
  {
    icon: Globe,
    title: 'Global Architecture',
    description: 'Principal advisors across New York, Monaco, Tokyo, and Dubai provide truly borderless access.',
  },
  {
    icon: Award,
    title: 'Curatorial Excellence',
    description: 'We represent fewer than 40 properties globally at any time, ensuring every residence receives principal-level focus.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 space-y-0">
      {/* Hero */}
      <Section spacing="lg">
        <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="gold">Est. 2008</Badge>
            <Heading level="h1">The Private Architecture of Luxury Real Estate</Heading>
            <p className="text-luxury-muted text-sm font-light leading-relaxed max-w-xl">
              Aureus Estates was founded by a group of former private banking and sovereign wealth principals with a singular conviction: the acquisition of an extraordinary residence deserves the same rigour as a capital markets transaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Begin Private Consultation
                </Button>
              </Link>
              <Link href="/properties">
                <Button variant="secondary" size="lg">
                  Explore Portfolio
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-panel p-3 rounded-2xl border border-white/10">
              <ImageWrapper
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
                alt="Aureus Estates principal offices in New York"
                aspectRatio="video"
                priority
                className="rounded-xl h-[400px] sm:h-[480px] w-full"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Bar */}
      <Section spacing="md" className="bg-luxury-surface/30" bordered>
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <PropertyStat label="Years of Advisory" value={17} />
            <PropertyStat label="Properties Transacted" value="$22B+" />
            <PropertyStat label="Countries Served" value={22} />
            <PropertyStat label="Returning Clients" value="91%" />
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section spacing="lg" bordered>
        <Container size="xl" className="space-y-12">
          <div className="text-center space-y-3">
            <Badge variant="gold">Our Founding Principles</Badge>
            <Heading level="h2">A Philosophy Built on Restraint</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-panel p-8 rounded-2xl border border-white/5 space-y-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-luxury-accent/10 border border-luxury-accent/30 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-luxury-accent" />
                </div>
                <h3 className="font-serif text-lg text-luxury-primary">{title}</h3>
                <p className="text-luxury-muted text-xs font-light leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section spacing="lg" className="bg-luxury-surface/20" bordered>
        <Container size="xl" className="space-y-12">
          <div className="space-y-3">
            <Badge variant="outline">Principal Advisory Team</Badge>
            <Heading level="h2">The Principals</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="glass-panel p-2 rounded-2xl border border-white/10 space-y-0 group">
                <div className="overflow-hidden rounded-xl">
                  <ImageWrapper
                    src={member.image}
                    alt={member.name}
                    aspectRatio="portrait"
                    className="h-[320px] w-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">{member.title}</p>
                  <h3 className="font-serif text-xl text-luxury-primary">{member.name}</h3>
                  <p className="text-luxury-muted text-xs font-light leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Awards */}
      <Section spacing="lg" bordered>
        <Container size="xl" className="space-y-10">
          <div className="space-y-3">
            <Badge variant="gold">Recognition</Badge>
            <Heading level="h2">Awards & Distinctions</Heading>
          </div>
          <div className="space-y-4">
            {AWARDS.map((award) => (
              <div key={award.title} className="glass-panel px-6 py-5 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-luxury-accent/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-luxury-accent text-2xl">{award.year}</span>
                  <div>
                    <p className="text-luxury-primary text-sm font-serif">{award.title}</p>
                    <p className="text-luxury-muted text-[10px] uppercase tracking-widest">{award.org}</p>
                  </div>
                </div>
                <Award className="w-5 h-5 text-luxury-accent opacity-60 hidden sm:block" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="xl" className="bg-luxury-surface/30">
        <Container size="md" className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center space-y-6">
          <Badge variant="gold" className="mx-auto">Private Advisory</Badge>
          <Heading level="h2">Begin Your Residency Journey</Heading>
          <p className="text-luxury-muted text-sm font-light max-w-md mx-auto leading-relaxed">
            Our principals accept a limited number of new mandates each quarter to maintain the calibre of counsel each client deserves.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Private Consultation
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
