'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Apartment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { PropertyStat } from '@/components/ui/PropertyStat';
import { FloorPlanViewer } from './FloorPlanViewer';
import { Compass, Mail, FileText, Layers } from 'lucide-react';

interface ApartmentDetailCardProps {
  apartment: Apartment;
  availableApartments?: Apartment[];
  onApartmentSwitch?: (apartment: Apartment) => void;
  onClose?: () => void;
}

export function ApartmentDetailCard({
  apartment,
  availableApartments = [],
  onApartmentSwitch,
  onClose,
}: ApartmentDetailCardProps) {
  const [showInteractiveFloorPlan, setShowInteractiveFloorPlan] = useState<boolean>(false);
  const floorPlanImage = apartment.floorPlan?.image || apartment.images[0]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  if (showInteractiveFloorPlan) {
    return (
      <FloorPlanViewer
        apartment={apartment}
        availableApartments={availableApartments}
        onApartmentSwitch={onApartmentSwitch}
        onClose={() => setShowInteractiveFloorPlan(false)}
      />
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-luxury-accent/30 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Apartment Header Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <Badge variant="gold">{apartment.number}</Badge>
            <Badge variant={apartment.status === 'available' ? 'gold' : apartment.status === 'reserved' ? 'surface' : 'outline'}>
              {apartment.status.toUpperCase()}
            </Badge>
          </div>
          <h3 className="font-serif text-2xl text-luxury-primary mt-2">
            {apartment.type} Suite
          </h3>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Suite Price</p>
            <p className="font-serif text-2xl text-luxury-accent">
              ${(apartment.price / 1000000).toFixed(2)}M USD
            </p>
          </div>
          {onClose && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Close ✕
            </Button>
          )}
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 glass-card rounded-xl border border-white/5">
        <PropertyStat label="Configuration" value={apartment.bhk} />
        <PropertyStat label="Interior Area" value={apartment.areaSqft.toLocaleString()} unit="SQFT" />
        <PropertyStat label="Orientation" value={apartment.facing} icon={<Compass className="w-3.5 h-3.5" />} />
        <PropertyStat label="Baths" value={apartment.bathrooms} />
      </div>

      {/* Floor Plan & Visual Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-luxury-accent font-medium flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            Floor Plan Preview
          </span>
          <Button
            variant="text"
            className="text-luxury-accent hover:underline flex items-center gap-1 text-xs"
            onClick={() => setShowInteractiveFloorPlan(true)}
          >
            <Layers className="w-3.5 h-3.5" />
            Open Interactive Floor Plan →
          </Button>
        </div>

        <div
          className="relative rounded-xl overflow-hidden glass-card border border-white/5 p-2 cursor-pointer group"
          onClick={() => setShowInteractiveFloorPlan(true)}
        >
          <ImageWrapper
            src={floorPlanImage}
            alt={`${apartment.number} Floor Plan`}
            aspectRatio="video"
            className="rounded-lg h-[240px] sm:h-[300px] w-full group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-luxury-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Badge variant="gold">Click To Expand Floor Plan</Badge>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 border-t border-white/5">
        <Button
          variant="secondary"
          size="md"
          className="w-full sm:w-auto justify-center"
          icon={<FileText className="w-4 h-4" />}
          onClick={() => setShowInteractiveFloorPlan(true)}
        >
          Interactive Schematic
        </Button>
        <Link href="/contact" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full justify-center" icon={<Mail className="w-4 h-4" />}>
            Enquire About {apartment.number}
          </Button>
        </Link>
      </div>
    </div>
  );
}
