import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';

export function AboutDeveloper() {
  return (
    <Section spacing="lg" className="bg-luxury-surface/20" bordered>
      <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="gold">Legacy & Leadership</Badge>

          <Heading level="h2">
            TWO DECADES OF ARCHITECTURAL <br />
            <span className="italic font-light text-luxury-accent">DISTINCTION.</span>
          </Heading>

          <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
            Founded in 2006, Aureus Estates functions as both private real estate developer and global architectural advisory. We partner exclusively with Pritzker-laureate architects and master artisans to create timeless residential legacies.
          </p>

          <div className="p-6 glass-panel rounded-xl border border-white/5 space-y-2">
            <p className="font-serif italic text-luxury-primary text-base">
              &ldquo;Architecture is not merely about volume and glass; it is the art of sculpting light and time into sanctuary.&rdquo;
            </p>
            <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium pt-2">
              Julian Vance · Founder & Managing Director
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <ImageWrapper
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            alt="Aureus Founder & Studio Atelier"
            aspectRatio="video"
            className="rounded-xl h-[420px]"
          />
        </div>
      </Container>
    </Section>
  );
}
