import React from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { DEVELOPER_STATS } from '@/data/properties';

export function DeveloperStatsSection() {
  return (
    <Section spacing="lg" bordered>
      <Container size="xl" className="space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Badge variant="outline">Track Record</Badge>
          <Heading level="h2">Developer Performance Metrics</Heading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEVELOPER_STATS.map((stat) => (
            <div key={stat.id} className="glass-card p-8 rounded-xl space-y-3 border border-white/5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">
                {stat.label}
              </p>
              <div className="flex items-baseline justify-center space-x-1">
                <span className="font-serif text-4xl sm:text-5xl text-luxury-primary font-normal">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-xs uppercase text-luxury-accent font-medium tracking-wider">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-luxury-muted text-xs font-light leading-relaxed pt-2 border-t border-white/5">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
