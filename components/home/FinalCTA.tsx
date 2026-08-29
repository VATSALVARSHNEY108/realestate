import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-luxury-bg text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-luxury-accent/10 via-transparent to-transparent pointer-events-none" />
      <Container size="md" className="relative z-10 space-y-8">
        <Badge variant="gold" className="mx-auto">
          Private Client Services
        </Badge>

        <Heading level="display" className="max-w-3xl mx-auto">
          COMMISSION YOUR <br />
          <span className="italic font-light text-luxury-accent">SANCTUARY.</span>
        </Heading>

        <p className="text-luxury-muted text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Access private off-market portfolios or schedule an architectural consultation with our global principals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Schedule Private Inquiry
            </Button>
          </Link>
          <Link href="/properties">
            <Button variant="secondary" size="lg">
              Browse Portfolio
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
