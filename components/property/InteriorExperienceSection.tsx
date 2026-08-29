'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FallbackState } from '@/components/3d/FallbackState';
import { Box, Sparkles } from 'lucide-react';

const Interior3DViewer = dynamic(
  () => import('@/components/3d/Interior3DViewer').then((mod) => mod.Interior3DViewer),
  {
    ssr: false,
    loading: () => <FallbackState message="Loading 3D Interior Atelier..." />,
  }
);

export function InteriorExperienceSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Section spacing="lg" className="bg-luxury-surface/30" bordered>
      <Container size="xl" className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
          <div className="space-y-3">
            <Badge variant="gold">Advanced Optional Atelier</Badge>
            <Heading level="h2">3D Interior Room Walkthrough</Heading>
          </div>
          {!isOpen && (
            <Button
              variant="primary"
              size="md"
              icon={<Box className="w-4 h-4" />}
              onClick={() => setIsOpen(true)}
            >
              Launch 3D Room Viewer
            </Button>
          )}
        </div>

        {isOpen ? (
          <Interior3DViewer className="w-full h-[550px]" />
        ) : (
          <div className="glass-panel p-10 rounded-2xl border border-white/5 text-center space-y-4 max-w-xl mx-auto">
            <Sparkles className="w-8 h-8 text-luxury-accent mx-auto" />
            <h3 className="font-serif text-2xl text-luxury-primary">Experience Interior Spatial Lighting</h3>
            <p className="text-luxury-muted text-xs font-light leading-relaxed">
              Launch our optional, lazy-loaded 3D interior suite simulator to experience room transitions (Living Room, Kitchen, Bedroom, Bathroom, Balcony) and toggle Day/Night architectural illumination.
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<Box className="w-4 h-4" />}
              onClick={() => setIsOpen(true)}
            >
              Launch 3D Room Viewer
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
