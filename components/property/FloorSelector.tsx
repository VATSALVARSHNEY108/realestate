'use client';

import React from 'react';
import { Floor, Apartment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ApartmentDetailCard } from './ApartmentDetailCard';
import { Layers, ChevronRight, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloorSelectorProps {
  floors: Floor[];
  selectedFloorNumber: number;
  onSelectFloor: (floorNumber: number) => void;
  selectedApartment?: Apartment | null;
  onSelectApartment?: (apartment: Apartment | null) => void;
  className?: string;
}

export function FloorSelector({
  floors,
  selectedFloorNumber,
  onSelectFloor,
  selectedApartment,
  onSelectApartment,
  className,
}: FloorSelectorProps) {
  const activeFloor = floors.find((f) => f.floorNumber === selectedFloorNumber) || floors[0];

  return (
    <div className={cn('space-y-8', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Vertical Floor Selector List */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/10 space-y-4 max-h-[520px] overflow-y-auto">
          <div className="flex items-center space-x-2 text-luxury-accent border-b border-white/5 pb-3">
            <Layers className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-medium">Select Floor Level</span>
          </div>

          <div className="space-y-2" role="radiogroup" aria-label="Floor Level Selection">
            {floors.map((floor) => {
              const isSelected = floor.floorNumber === selectedFloorNumber;
              return (
                <button
                  key={floor.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    onSelectFloor(floor.floorNumber);
                    onSelectApartment?.(null);
                  }}
                  className={cn(
                    'w-full text-left p-3.5 rounded-xl transition-all duration-300 border flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-luxury-accent/50',
                    isSelected
                      ? 'bg-luxury-accent/15 border-luxury-accent/50 text-luxury-primary shadow-lg'
                      : 'bg-luxury-bg/40 border-white/5 text-luxury-muted hover:border-white/20 hover:text-luxury-primary'
                  )}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">
                      Level {floor.floorNumber}
                    </p>
                    <p className="font-serif text-sm font-normal">{floor.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isSelected ? 'gold' : 'outline'}>
                      {floor.totalUnits} Units
                    </Badge>
                    <ChevronRight className={cn('w-4 h-4 transition-transform', isSelected ? 'rotate-90 text-luxury-accent' : 'text-luxury-muted')} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Floor Detail & Available Apartments List */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          {activeFloor && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                <div>
                  <Badge variant="gold">Selected Floor Details</Badge>
                  <h3 className="font-serif text-2xl text-luxury-primary mt-1">{activeFloor.title}</h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-muted">Floor Elevation</span>
                  <p className="font-serif text-lg text-luxury-accent">+{activeFloor.floorNumber * 4.2}m Height</p>
                </div>
              </div>

              {/* Apartment Suites Grid */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-luxury-accent font-medium">
                  Available Suites on Level {activeFloor.floorNumber}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeFloor.apartments.map((apt) => {
                    const isAptSelected = selectedApartment?.id === apt.id;
                    return (
                      <div
                        key={apt.id}
                        onClick={() => onSelectApartment?.(apt)}
                        className={cn(
                          'glass-card p-5 rounded-xl border transition-all duration-300 cursor-pointer space-y-3',
                          isAptSelected
                            ? 'border-luxury-accent bg-luxury-accent/15 shadow-xl scale-[1.02]'
                            : 'border-white/5 hover:border-luxury-accent/30'
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-base text-luxury-primary">{apt.number} ({apt.type})</span>
                          <Badge variant={apt.status === 'available' ? 'gold' : apt.status === 'reserved' ? 'surface' : 'outline'}>
                            {apt.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-luxury-muted">
                          <span><strong>Config:</strong> {apt.bhk}</span>
                          <span><strong>Area:</strong> {apt.areaSqft.toLocaleString()} SQFT</span>
                          <span className="flex items-center gap-1">
                            <Compass className="w-3 h-3 text-luxury-accent" />
                            {apt.facing}
                          </span>
                          <span><strong>Baths:</strong> {apt.bathrooms}</span>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="font-serif text-luxury-accent text-base">${(apt.price / 1000000).toFixed(2)}M USD</span>
                          <Button variant={isAptSelected ? 'primary' : 'secondary'} size="sm">
                            {isAptSelected ? 'Selected' : 'Inspect Suite'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected Apartment Full Details Card Panel */}
      {selectedApartment && (
        <ApartmentDetailCard
          apartment={selectedApartment}
          onClose={() => onSelectApartment?.(null)}
        />
      )}
    </div>
  );
}
