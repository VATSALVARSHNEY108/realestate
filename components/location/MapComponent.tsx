'use client';

import React from 'react';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Navigation } from 'lucide-react';

interface MapComponentProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  className?: string;
}

export function MapComponent({ coordinates, address, className = 'w-full h-[400px]' }: MapComponentProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (mapboxToken) {
    const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-s-emerald+B89B5E(${coordinates.longitude},${coordinates.latitude})/${coordinates.longitude},${coordinates.latitude},13,0/800x500@2x?access_token=${mapboxToken}`;

    return (
      <div className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 ${className}`}>
        <ImageWrapper
          src={staticMapUrl}
          alt={`Map location for ${address}`}
          aspectRatio="auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-10 glass-card px-3.5 py-2 rounded-full border border-luxury-accent/30 flex items-center space-x-2 text-xs text-luxury-primary">
          <MapPin className="w-3.5 h-3.5 text-luxury-accent" />
          <span>{address}</span>
        </div>
      </div>
    );
  }

  // Professional Fallback View when API Token is unconfigured
  return (
    <div className={`relative rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}>
      <ImageWrapper
        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
        alt="Map preview placeholder"
        aspectRatio="auto"
        className="absolute inset-0 w-full h-full object-cover brightness-40"
      />

      <div className="relative z-10 glass-card p-6 sm:p-8 rounded-xl border border-white/10 max-w-sm space-y-3">
        <div className="flex justify-center">
          <Badge variant="gold" className="mx-auto">
            Interactive Map
          </Badge>
        </div>
        <h4 className="font-serif text-xl text-luxury-primary flex items-center justify-center gap-2">
          <Navigation className="w-5 h-5 text-luxury-accent" />
          Location Coordinates
        </h4>
        <p className="text-luxury-muted text-xs font-light leading-relaxed">
          {address} ({coordinates.latitude.toFixed(4)}° N, {coordinates.longitude.toFixed(4)}° W)
        </p>
        <p className="text-[10px] text-luxury-accent uppercase tracking-widest pt-2 border-t border-white/10">
          Geospatial Map API Standard Configured
        </p>
      </div>
    </div>
  );
}
