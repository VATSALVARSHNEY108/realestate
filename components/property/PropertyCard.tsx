import Link from 'next/link';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { PropertyStat } from '@/components/ui/PropertyStat';
import { ArrowUpRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.images.find((img) => img.isPrimary)?.url || property.images[0]?.url || '';

  return (
    <Link href={`/properties/${property.slug}`} className="group block focus:outline-none focus:ring-1 focus:ring-luxury-accent/50 rounded-xl">
      <div className="glass-card overflow-hidden rounded-xl border border-white/5 group-hover:border-luxury-accent/40 group-hover:shadow-2xl group-hover:shadow-luxury-accent/5 transition-all duration-500 flex flex-col h-full">
        {/* Visual Container with Zoom Effect */}
        <div className="relative overflow-hidden">
          <ImageWrapper
            src={primaryImage}
            alt={property.name}
            aspectRatio="video"
            className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-10">
            <Badge variant={property.status === 'available' ? 'gold' : property.status === 'reserved' ? 'surface' : 'outline'}>
              {property.status.toUpperCase()}
            </Badge>
          </div>
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="surface" className="backdrop-blur-md bg-luxury-bg/70">
              {property.propertyType}
            </Badge>
          </div>
        </div>

        {/* Info & Specs */}
        <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-accent font-medium">
              {property.location}
            </p>
            <h3 className="font-serif text-2xl text-luxury-primary tracking-wide group-hover:text-luxury-accent transition-colors duration-300 flex items-center justify-between">
              <span>{property.name}</span>
              <ArrowUpRight className="w-5 h-5 text-luxury-muted group-hover:text-luxury-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </h3>
            <p className="text-luxury-muted text-xs font-light leading-relaxed line-clamp-2">
              {property.description}
            </p>
          </div>

          <div className="pt-5 border-t border-white/5 grid grid-cols-3 gap-3">
            <PropertyStat label="Bedrooms" value={property.bedrooms} />
            <PropertyStat label="Bathrooms" value={property.bathrooms} />
            <PropertyStat label="Area" value={property.area.toLocaleString()} unit="SQFT" />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-luxury-muted">Guide Price</p>
              <p className="font-serif text-luxury-accent text-xl font-normal">
                ${(property.price / 1000000).toFixed(1)}M USD
              </p>
            </div>
            <Button variant="secondary" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              View Property
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
