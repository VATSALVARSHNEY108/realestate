import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Hero } from '@/components/home/Hero';
import { ThreeDExperiencePreview } from '@/components/home/ThreeDExperiencePreview';
import { LifestyleStory } from '@/components/home/LifestyleStory';
import { FeaturedLocations } from '@/components/home/FeaturedLocations';
import { AmenitiesSection } from '@/components/home/AmenitiesSection';
import { DeveloperStatsSection } from '@/components/home/DeveloperStatsSection';
import { AboutDeveloper } from '@/components/home/AboutDeveloper';
import { FinalCTA } from '@/components/home/FinalCTA';
import { getProperties } from '@/lib/properties';
import Link from 'next/link';

export default async function Home() {
  const featuredProperties = await getProperties({ featuredOnly: true });

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Featured Properties */}
      <Section spacing="lg" id="residences" bordered>
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
            <div className="space-y-3">
              <Badge variant="outline">Curated Collection</Badge>
              <Heading level="h2">Featured Global Residences</Heading>
            </div>
            <Link href="/properties">
              <Button variant="secondary" size="sm">
                View All Residences
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. 3D Experience Preview */}
      <ThreeDExperiencePreview />

      {/* 4. Lifestyle Story */}
      <LifestyleStory />

      {/* 5. Featured Locations */}
      <FeaturedLocations />

      {/* 6. Amenities */}
      <AmenitiesSection />

      {/* 7. Developer Statistics */}
      <DeveloperStatsSection />

      {/* 8. About Developer */}
      <AboutDeveloper />

      {/* 9. Final CTA */}
      <FinalCTA />
    </div>
  );
}
