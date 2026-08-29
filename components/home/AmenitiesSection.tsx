'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { INTERACTIVE_AMENITIES, DetailedAmenity } from '@/data/amenities';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AmenitiesSection() {
  const [selectedAmenity, setSelectedAmenity] = useState<DetailedAmenity>(INTERACTIVE_AMENITIES[0]);

  return (
    <Section spacing="lg" className="bg-luxury-surface/30" bordered id="amenities">
      <Container size="xl" className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <Badge variant="gold">Bespoke Privileges</Badge>
            <Heading level="h2">Private Lifestyle Amenities</Heading>
          </div>
          <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
            Select amenities from the interactive atelier list below to explore private resident facilities and architectural specs.
          </p>
        </div>

        {/* Desktop Split Layout & Mobile Stacked Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Side Interactive Menu List */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-accent font-medium pb-2 border-b border-white/5">
              Select Resident Amenity
            </p>
            <div className="space-y-2" role="tablist">
              {INTERACTIVE_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenity.id === amenity.id;
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedAmenity(amenity)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-luxury-accent',
                      isSelected
                        ? 'bg-luxury-accent/15 border-luxury-accent/50 text-luxury-primary shadow-lg'
                        : 'bg-luxury-bg/40 border-white/5 text-luxury-muted hover:border-white/20 hover:text-luxury-primary'
                    )}
                  >
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-luxury-accent font-medium">
                        {amenity.category}
                      </p>
                      <p className="font-serif text-base font-normal mt-0.5">{amenity.title}</p>
                    </div>
                    <ChevronRight className={cn('w-4 h-4 transition-transform duration-300', isSelected ? 'rotate-90 text-luxury-accent' : 'text-luxury-muted group-hover:translate-x-1')} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large Visual Display & Specs Container */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 animate-in fade-in duration-500">
            <div className="relative rounded-xl overflow-hidden glass-card border border-white/10 p-2">
              <ImageWrapper
                src={selectedAmenity.image}
                alt={selectedAmenity.title}
                aspectRatio="video"
                className="rounded-lg h-[300px] sm:h-[400px] w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge variant="gold">{selectedAmenity.category}</Badge>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-luxury-primary">
                {selectedAmenity.title}
              </h3>

              <p className="text-luxury-muted text-xs sm:text-sm font-light leading-relaxed">
                {selectedAmenity.description}
              </p>

              {/* Amenity Specs Badges */}
              {selectedAmenity.specs && selectedAmenity.specs.length > 0 && (
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">
                    Architectural Specifications
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedAmenity.specs.map((spec, idx) => (
                      <div key={idx} className="glass-card p-3 rounded-lg border border-white/5 flex items-center space-x-2 text-xs text-luxury-primary">
                        <CheckCircle2 className="w-3.5 h-3.5 text-luxury-accent flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
