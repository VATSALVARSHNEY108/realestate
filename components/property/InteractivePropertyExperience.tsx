'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Property, Apartment } from '@/types';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FloorSelector } from '@/components/property/FloorSelector';
import { FallbackState } from '@/components/3d/FallbackState';
import { Box, Sparkles } from 'lucide-react';

const ThreeDViewer = dynamic(
  () => import('@/components/3d/3DViewer').then((mod) => mod.ThreeDViewer),
  {
    ssr: false,
    loading: () => <FallbackState message="Loading 3D Spatial Building..." />,
  }
);

interface InteractivePropertyExperienceProps {
  property: Property;
}

export function InteractivePropertyExperience({ property }: InteractivePropertyExperienceProps) {
  const floors = property.floors || [];
  const initialFloorNumber = floors[0]?.floorNumber || 88;

  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number>(initialFloorNumber);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [is3DActive, setIs3DActive] = useState<boolean>(false);

  useEffect(() => {
    // Check viewport width and reduced motion to optimize mobile 3D initialization
    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      // Automatically load 3D on desktop; require tap on mobile to save GPU/memory
      if (!mobile) {
        setIs3DActive(true);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleSelectFloor = (floorNumber: number) => {
    setSelectedFloorNumber(floorNumber);
  };

  return (
    <Section spacing="lg" className="bg-luxury-surface/30" bordered>
      <Container size="xl" className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <Badge variant="gold">Interactive Spatial Exploration</Badge>
            <Heading level="h2">3D Building & Apartment Inspector</Heading>
          </div>
          <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
            Select levels or individual suite numbers below to trigger 3D camera zooming, view floor plan schematics, and check unit availability.
          </p>
        </div>

        {/* Interactive 3D Canvas Viewport with Mobile Optimization */}
        <div className="relative">
          {is3DActive ? (
            <ThreeDViewer
              selectedFloorNumber={selectedFloorNumber}
              selectedApartment={selectedApartment}
              autoRotate={false}
              className="w-full h-[450px] sm:h-[600px]"
            />
          ) : (
            <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center space-y-4 h-[400px] flex flex-col items-center justify-center">
              <Sparkles className="w-8 h-8 text-luxury-accent mx-auto" />
              <h3 className="font-serif text-xl text-luxury-primary">Tap to Launch 3D Building Inspector</h3>
              <p className="text-luxury-muted text-xs font-light max-w-xs leading-relaxed">
                Mobile WebGL optimization active. Launch the interactive 3D model when ready.
              </p>
              <Button
                variant="primary"
                size="md"
                icon={<Box className="w-4 h-4" />}
                onClick={() => setIs3DActive(true)}
              >
                Launch 3D Building Model
              </Button>
            </div>
          )}
        </div>

        {/* Floor Selection & Suite Details Component */}
        {floors.length > 0 && (
          <FloorSelector
            floors={floors}
            selectedFloorNumber={selectedFloorNumber}
            onSelectFloor={handleSelectFloor}
            selectedApartment={selectedApartment}
            onSelectApartment={setSelectedApartment}
          />
        )}
      </Container>
    </Section>
  );
}
