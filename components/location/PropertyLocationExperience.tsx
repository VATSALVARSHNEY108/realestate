'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { MapComponent } from './MapComponent';
import { LocationExperienceData, NearbyLandmark, MOCK_LOCATION_DATA } from '@/data/locations';
import { MapPin, Navigation, Car, Footprints, Train, Plane, Building2, School, Hospital, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyLocationExperienceProps {
  locationData?: LocationExperienceData;
}

const CATEGORIES = ['All', 'Airport', 'Metro', 'School', 'Hospital', 'Shopping', 'Downtown'];

export function PropertyLocationExperience({ locationData = MOCK_LOCATION_DATA }: PropertyLocationExperienceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredLandmarks = React.useMemo(() => {
    if (selectedCategory === 'All') return locationData.landmarks;
    return locationData.landmarks.filter((l) => l.category === selectedCategory);
  }, [locationData.landmarks, selectedCategory]);

  const getCategoryIcon = (category: NearbyLandmark['category']) => {
    switch (category) {
      case 'Airport': return <Plane className="w-4 h-4 text-luxury-accent" />;
      case 'Metro': return <Train className="w-4 h-4 text-luxury-accent" />;
      case 'School': return <School className="w-4 h-4 text-luxury-accent" />;
      case 'Hospital': return <Hospital className="w-4 h-4 text-luxury-accent" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-luxury-accent" />;
      case 'Downtown': return <Building2 className="w-4 h-4 text-luxury-accent" />;
    }
  };

  return (
    <Section spacing="lg" className="bg-luxury-surface/20" bordered id="location">
      <Container size="xl" className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <Badge variant="gold">Prime Infrastructure</Badge>
            <Heading level="h2">Location & Nearby Access</Heading>
            <p className="text-luxury-accent text-xs uppercase tracking-widest flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {locationData.address}, {locationData.city}, {locationData.country}
            </p>
          </div>
          <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
            Positioned in prime urban luxury corridors with immediate proximity to international transit hubs, premier shopping, and elite medical facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Reusable Map Viewport */}
          <div className="lg:col-span-6 space-y-4">
            <MapComponent coordinates={locationData.coordinates} address={locationData.address} className="w-full h-[450px]" />
          </div>

          {/* Right Column: Category Filterable Nearby Landmarks List */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs uppercase tracking-widest text-luxury-accent font-medium flex items-center gap-1.5">
                <Navigation className="w-4 h-4" />
                Nearby Key Destinations
              </span>
              <span className="text-[10px] text-luxury-muted uppercase tracking-wider">
                {filteredLandmarks.length} Points of Interest
              </span>
            </div>

            {/* Category Pill Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 text-[10px] uppercase tracking-widest rounded-lg border transition-all duration-300',
                    selectedCategory === cat
                      ? 'bg-luxury-accent text-luxury-bg border-luxury-accent font-medium'
                      : 'border-white/10 text-luxury-muted hover:border-white/30 hover:text-luxury-primary'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Landmarks List */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {filteredLandmarks.map((lm) => (
                <div key={lm.id} className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-luxury-accent/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-luxury-surface border border-white/5">
                      {getCategoryIcon(lm.category)}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-muted">{lm.category}</p>
                      <p className="font-serif text-sm text-luxury-primary">{lm.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-luxury-accent text-sm font-medium">
                      {lm.distanceKm} km
                    </p>
                    <p className="text-[10px] text-luxury-muted flex items-center justify-end gap-1">
                      {lm.travelMode === 'walking' ? <Footprints className="w-3 h-3 text-luxury-accent" /> : <Car className="w-3 h-3 text-luxury-accent" />}
                      {lm.travelTimeMinutes} mins
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
