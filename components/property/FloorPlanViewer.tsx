'use client';

import React, { useState } from 'react';
import { Apartment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { PropertyStat } from '@/components/ui/PropertyStat';
import { Compass, ZoomIn, ZoomOut, Maximize2, Download, FileQuestion, X } from 'lucide-react';

interface FloorPlanViewerProps {
  apartment: Apartment;
  onApartmentSwitch?: (apartment: Apartment) => void;
  availableApartments?: Apartment[];
  onClose?: () => void;
}

export function FloorPlanViewer({
  apartment,
  onApartmentSwitch,
  availableApartments = [],
  onClose,
}: FloorPlanViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const floorPlan = apartment.floorPlan;
  const hasValidFloorPlan = Boolean(floorPlan && floorPlan.image);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className={`glass-panel rounded-2xl border border-luxury-accent/30 p-6 sm:p-8 space-y-6 ${isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto bg-luxury-bg/95' : 'relative'}`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <Badge variant="gold">{apartment.number}</Badge>
            <Badge variant="outline">{apartment.bhk}</Badge>
            <Badge variant="surface">{apartment.facing} Facing</Badge>
          </div>
          <h3 className="font-serif text-2xl text-luxury-primary mt-2">
            Architectural Floor Plan Schematic
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {availableApartments.length > 1 && (
            <div className="flex items-center space-x-1.5 mr-2">
              <span className="text-[10px] uppercase tracking-widest text-luxury-muted">Switch Suite:</span>
              <select
                value={apartment.id}
                onChange={(e) => {
                  const target = availableApartments.find((a) => a.id === e.target.value);
                  if (target && onApartmentSwitch) onApartmentSwitch(target);
                }}
                className="bg-luxury-bg border border-white/10 rounded-lg px-2.5 py-1 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                {availableApartments.map((apt) => (
                  <option key={apt.id} value={apt.id}>
                    {apt.number} ({apt.bhk})
                  </option>
                ))}
              </select>
            </div>
          )}
          {onClose && (
            <Button variant="icon" icon={<X className="w-4 h-4" />} title="Close Floor Plan" onClick={onClose} />
          )}
        </div>
      </div>

      {/* Specifications Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 glass-card rounded-xl border border-white/5">
        <PropertyStat label="Suite Number" value={apartment.number} />
        <PropertyStat label="Configuration" value={apartment.bhk} />
        <PropertyStat label="Interior Area" value={apartment.areaSqft.toLocaleString()} unit="SQFT" />
        <PropertyStat label="Orientation" value={apartment.facing} icon={<Compass className="w-3.5 h-3.5" />} />
      </div>

      {/* Floor Plan Visual Viewer Container */}
      {hasValidFloorPlan ? (
        <div className="relative rounded-xl overflow-hidden glass-card border border-white/10 p-4 space-y-4">
          {/* Top Controls Overlay Bar */}
          <div className="flex items-center justify-between z-10 border-b border-white/5 pb-3">
            <span className="text-xs uppercase tracking-widest text-luxury-accent font-medium">
              {floorPlan?.title || `${apartment.number} Schematic`}
            </span>

            <div className="flex items-center space-x-2">
              <Button variant="icon" icon={<ZoomIn className="w-4 h-4" />} title="Zoom In" onClick={handleZoomIn} />
              <Button variant="icon" icon={<ZoomOut className="w-4 h-4" />} title="Zoom Out" onClick={handleZoomOut} />
              <Button variant="icon" icon={<Maximize2 className="w-4 h-4" />} title="Toggle Fullscreen" onClick={() => setIsFullscreen(!isFullscreen)} />
              {floorPlan?.pdfUrl && (
                <a href={floorPlan.pdfUrl} download target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                    Download PDF
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* Scalable Image Canvas Container */}
          <div className="overflow-auto min-h-[350px] sm:min-h-[450px] flex items-center justify-center p-4">
            <div
              className="transition-transform duration-300 ease-out origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <ImageWrapper
                src={floorPlan!.image}
                alt={`${apartment.number} Architectural Floor Plan`}
                aspectRatio="video"
                className="rounded-lg max-w-full h-auto max-h-[500px]"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center glass-card max-w-lg mx-auto rounded-xl p-10 space-y-4 border border-white/5">
          <FileQuestion className="w-10 h-10 text-luxury-accent mx-auto" />
          <h4 className="font-serif text-xl text-luxury-primary">Floor Plan Prospectus Pending</h4>
          <p className="text-luxury-muted text-xs font-light leading-relaxed">
            The architectural CAD schematic for Suite {apartment.number} is currently being updated by the lead architect. Please request the private brochure via concierge.
          </p>
          <Button variant="secondary" size="sm" onClick={handleResetZoom}>
            Request Private CAD Prospectus
          </Button>
        </div>
      )}
    </div>
  );
}
