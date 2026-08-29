import { Suspense } from 'react';
import { getProperties } from '@/lib/properties';
import { PropertyGridClient } from '@/components/property/PropertyGridClient';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Sparkles } from 'lucide-react';

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <Suspense
      fallback={
        <Section spacing="lg" className="min-h-[85vh] pt-28">
          <Container size="xl" className="py-24 text-center space-y-4">
            <Sparkles className="w-8 h-8 text-luxury-accent animate-spin-slow mx-auto" />
            <p className="text-xs uppercase tracking-widest text-luxury-muted">
              Loading Luxury Real Estate Portfolio...
            </p>
          </Container>
        </Section>
      }
    >
      <PropertyGridClient initialProperties={properties} />
    </Suspense>
  );
}
