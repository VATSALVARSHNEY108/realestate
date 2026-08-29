import { notFound } from 'next/navigation';
import { getPropertyBySlug } from '@/lib/properties';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { PropertyStat } from '@/components/ui/PropertyStat';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { InteractivePropertyExperience } from '@/components/property/InteractivePropertyExperience';
import { InteriorExperienceSection } from '@/components/property/InteriorExperienceSection';
import { PropertyLocationExperience } from '@/components/location/PropertyLocationExperience';
import { PropertyJsonLd } from '@/components/seo/PropertyJsonLd';
import Link from 'next/link';
import { MapPin, ShieldCheck, ArrowLeft, Mail, Calendar, Layers, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    return {
      title: 'Residence Not Found | Aureus Estates',
      description: 'The requested architectural residence could not be found in our active portfolio.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aureusestates.com';
  const primaryImage = property.images.find((img) => img.isPrimary)?.url || property.images[0]?.url;
  const canonicalUrl = `${baseUrl}/properties/${property.slug}`;

  return {
    title: `${property.name} — ${property.locationData.city} | Aureus Estates`,
    description: property.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${property.name} | Aureus Estates`,
      description: property.description,
      url: canonicalUrl,
      siteName: 'Aureus Estates',
      type: 'article',
      images: primaryImage ? [{ url: primaryImage, width: 1200, height: 630, alt: property.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.name} | Aureus Estates`,
      description: property.description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  const primaryImage = property.images.find((img) => img.isPrimary)?.url || property.images[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80';

  return (
    <div className="pt-24 space-y-0">
      {/* Schema.org Structured Data */}
      <PropertyJsonLd property={property} />

      {/* 1. Cinematic Property Hero */}
      <Section spacing="sm">
        <Container size="xl" className="space-y-8">
          <Link href="/properties">
            <Button variant="secondary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Back To Portfolio
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/5">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge variant="gold">{property.propertyType}</Badge>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {property.status}
                </span>
              </div>
              <Heading level="h1">{property.name}</Heading>
              <p className="text-luxury-accent text-xs font-medium uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {property.locationData.address}, {property.locationData.city}
              </p>
            </div>

            <div className="text-left md:text-right space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Starting Price</p>
              <p className="font-serif text-luxury-accent text-3xl font-normal">
                ${(property.price / 1000000).toFixed(1)}M USD
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 p-2 sm:p-4">
            <ImageWrapper
              src={primaryImage}
              alt={property.name}
              aspectRatio="wide"
              priority
              className="rounded-xl h-[450px] sm:h-[600px] w-full"
            />
          </div>
        </Container>
      </Section>

      {/* PART 17: Premium Property Gallery */}
      {property.images.length > 0 && (
        <Section spacing="md" bordered>
          <Container size="xl">
            <PropertyGallery images={property.images} title={`${property.name} Visual Portfolio`} />
          </Container>
        </Section>
      )}

      {/* PART 13 & 14: Interactive 3D Building & Floor Inspector */}
      <InteractivePropertyExperience property={property} />

      {/* PART 16: Lazy-Loaded 3D Interior Room Walkthrough */}
      <InteriorExperienceSection />

      {/* PART 19: Property Location Experience */}
      <PropertyLocationExperience />

      {/* Overview & Statistics Matrix */}
      <Section spacing="md" className="bg-luxury-surface/30" bordered>
        <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="outline">Sanctuary Overview</Badge>
            <Heading level="h2">Architectural Distinction</Heading>
            <p className="text-luxury-muted text-sm font-light leading-relaxed">
              {property.description}
            </p>
            <p className="text-luxury-muted text-xs font-light leading-relaxed">
              {property.locationData.neighborhoodOverview}
            </p>
          </div>

          <div className="lg:col-span-6 glass-panel p-8 sm:p-10 rounded-2xl border border-white/5 space-y-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-luxury-accent font-medium">
              Property Key Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
              <PropertyStat label="Bedrooms" value={property.bedrooms} />
              <PropertyStat label="Bathrooms" value={property.bathrooms} />
              <PropertyStat label="Interior Area" value={property.area.toLocaleString()} unit="SQFT" />
              <PropertyStat label="Floors" value={property.floors?.length || 1} unit="Levels" icon={<Layers className="w-3.5 h-3.5" />} />
              <PropertyStat label="Completion" value="Q4 2026" icon={<Calendar className="w-3.5 h-3.5" />} />
              <PropertyStat label="Starting Price" value={`$${(property.price / 1000000).toFixed(1)}M`} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Amenities */}
      {property.amenities.length > 0 && (
        <Section spacing="md" className="bg-luxury-surface/20" bordered>
          <Container size="xl" className="space-y-8">
            <div className="space-y-2">
              <Badge variant="outline">Included Privileges</Badge>
              <Heading level="h2">Residence Amenities</Heading>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {property.amenities.map((am) => (
                <div key={am.id} className="glass-card p-6 rounded-xl border border-white/5 flex items-center space-x-4">
                  <CheckCircle2 className="w-5 h-5 text-luxury-accent flex-shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-muted">{am.category}</p>
                    <p className="font-serif text-base text-luxury-primary">{am.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Location & Enquiry CTA */}
      <Section spacing="xl" className="bg-luxury-surface/30">
        <Container size="md" className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center space-y-8">
          <Badge variant="gold" className="mx-auto">
            Private Client Concierge
          </Badge>
          <Heading level="h2">Inquire About {property.name}</Heading>
          <p className="text-luxury-muted text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Connect directly with our senior global advisors to arrange a private viewing or request the off-market prospectus.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" icon={<Mail className="w-4 h-4" />}>
                Submit Private Inquiry
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="secondary" size="lg">
                View Other Residences
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
