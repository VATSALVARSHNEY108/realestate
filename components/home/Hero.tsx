'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden border-b border-white/5 bg-luxury-bg">
      {/* Subtle Background Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-surface/40 via-luxury-bg to-luxury-bg pointer-events-none" />

      <Container size="xl" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
        {/* Left Column: Editorial Typography & Actions */}
        <div className="lg:col-span-6 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge variant="gold" className="animate-in fade-in duration-1000">
            ESTATE COLLECTION
          </Badge>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal text-luxury-primary leading-[1.08] tracking-tight">
            ARCHITECTURE <br />
            <span className="italic font-light text-luxury-accent">THAT FEELS</span> <br />
            LIKE HOME.
          </h1>

          <p className="text-luxury-muted text-sm sm:text-base max-w-lg font-light leading-relaxed tracking-wide">
            Discover exceptional properties designed around space, light and modern living.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link href="/properties">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={onExploreClick}
              >
                EXPLORE PROPERTIES
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                DISCOVER PROJECTS
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Architectural Visual Canvas Area (Three.js ready container) */}
        <div className="lg:col-span-6 relative group animate-in fade-in slide-in-from-right-6 duration-1000">
          {/* Glass Canvas Frame */}
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 p-2 sm:p-4 shadow-2xl">
            <ImageWrapper
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
              alt="Architectural Landmark Building"
              aspectRatio="portrait"
              priority
              className="rounded-lg h-[460px] sm:h-[540px] xl:h-[600px] w-full"
            />

            {/* 3D Canvas Canvas Overlay Badge (Ready for Three.js Canvas mount) */}
            <div className="absolute top-6 left-6 z-20 flex items-center space-x-2 glass-card px-3.5 py-2 rounded-full border border-luxury-accent/30">
              <Compass className="w-3.5 h-3.5 text-luxury-accent animate-spin-slow" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-primary font-medium">
                3D Interactive View Canvas Ready
              </span>
            </div>

            {/* Architectural Spec Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 glass-panel p-4 sm:p-6 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-accent">Featured Architecture</p>
                <p className="font-serif text-lg text-luxury-primary">The Solstice Tower</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Height / Floors</p>
                <p className="font-serif text-base text-luxury-primary">280m · 72 Levels</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
