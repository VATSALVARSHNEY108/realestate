'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FallbackState } from '@/components/3d/FallbackState';

const Scroll3DViewer = dynamic(
  () => import('@/components/3d/Scroll3DViewer').then((mod) => mod.Scroll3DViewer),
  {
    ssr: false,
    loading: () => <FallbackState message="Initializing Cinematic 3D Engine..." />,
  }
);

export function ThreeDExperiencePreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <Section spacing="lg" className="bg-luxury-surface/40 overflow-hidden" bordered>
        <Container size="xl" className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-3">
              <Badge variant="gold">Scroll-Driven Spatial Journey</Badge>
              <Heading level="h2">Cinematic 3D Building Experience</Heading>
            </div>
            <p className="text-luxury-muted text-xs max-w-md font-light leading-relaxed">
              Scroll down to navigate our volumetric building model. Watch as the camera approaches, rotates, and focuses on landmark floors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sticky/Scroll Canvas Container */}
            <div className="lg:col-span-8 relative">
              <Scroll3DViewer triggerRef={containerRef} className="w-full h-[500px] sm:h-[600px]" />
            </div>

            {/* Sequence Milestones Legend */}
            <div className="lg:col-span-4 space-y-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">0% - 20%</span>
                <p className="font-serif text-sm text-luxury-primary">Distant Overview & Approach</p>
                <p className="text-luxury-muted text-xs font-light">Panoramic entrance establishing global scale.</p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">40% - 60%</span>
                <p className="font-serif text-sm text-luxury-primary">Orbital Rotation & Facade Focus</p>
                <p className="text-luxury-muted text-xs font-light">Architectural louver and glass detailing reveal.</p>
              </div>

              <div className="glass-card p-5 rounded-xl border border-white/5 space-y-1 border-l-2 border-l-luxury-accent">
                <span className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">80% - 100%</span>
                <p className="font-serif text-sm text-luxury-primary">Penthouse Presentation Position</p>
                <p className="text-luxury-muted text-xs font-light">Final suite spatial focus point.</p>
              </div>

              <Button variant="secondary" size="md" className="w-full justify-center mt-2">
                Explore Floor Plans
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
