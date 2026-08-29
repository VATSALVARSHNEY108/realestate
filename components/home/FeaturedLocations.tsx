import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { FEATURED_LOCATIONS } from '@/data/properties';
import { MapPin } from 'lucide-react';

export function FeaturedLocations() {
  return (
    <Section spacing="lg" bordered>
      <Container size="xl" className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6">
          <div className="space-y-3">
            <Badge variant="outline">Prime Locations</Badge>
            <Heading level="h2">Landmark Destinations</Heading>
          </div>
          <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
            Discover our curated footprint in the world’s most coveted metropolises and natural retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_LOCATIONS.map((loc) => (
            <div key={loc.id} className="group glass-card overflow-hidden rounded-xl border border-white/5 hover:border-luxury-accent/30 transition-all duration-500 flex flex-col">
              <ImageWrapper
                src={loc.featuredImage}
                alt={loc.name}
                aspectRatio="portrait"
                className="h-80 w-full"
              />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-luxury-accent text-[10px] uppercase tracking-widest mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{loc.country}</span>
                  </div>
                  <h3 className="font-serif text-xl text-luxury-primary group-hover:text-luxury-accent transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-luxury-muted text-xs font-light mt-2 leading-relaxed">
                    {loc.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-luxury-muted uppercase tracking-wider">
                    {loc.residencesCount} Active Residences
                  </span>
                  <Link href="/locations" className="text-xs uppercase tracking-widest text-luxury-accent hover:underline">
                    Explore Hub →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
