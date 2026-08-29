import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { ImageWrapper } from '@/components/ui/ImageWrapper';

export function LifestyleStory() {
  return (
    <Section spacing="lg" bordered>
      <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Aspect Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
          <ImageWrapper
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
            alt="Editorial Interior Architecture"
            aspectRatio="portrait"
            className="rounded-xl"
          />
          <ImageWrapper
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
            alt="Editorial Living Area"
            aspectRatio="portrait"
            className="rounded-xl mt-8 sm:mt-12"
          />
        </div>

        {/* Right Editorial Story Content */}
        <div className="lg:col-span-6 space-y-6">
          <Badge variant="gold">Editorial Philosophy</Badge>

          <Heading level="h2">
            DESIGNED FOR SANCTUARY, <br />
            <span className="italic font-light text-luxury-accent">CRAFTED FOR ETERNITY.</span>
          </Heading>

          <p className="text-luxury-muted text-sm sm:text-base font-light leading-relaxed">
            Every Aureus development is conceived as a living sculpture. We reject generic luxury in favor of rare materials, natural illumination, and seamless transitions between interior living and raw landscape.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/5 text-xs">
            <div>
              <p className="text-luxury-accent uppercase tracking-widest font-medium text-[10px]">Pure Materials</p>
              <p className="text-luxury-primary mt-1 font-light">Travertine, hand-finished bronze, and floor-to-ceiling acoustic glass.</p>
            </div>
            <div>
              <p className="text-luxury-accent uppercase tracking-widest font-medium text-[10px]">Discrete Security</p>
              <p className="text-luxury-primary mt-1 font-light">Biometric access infrastructure integrated invisible within architectural joinery.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
