'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { SlidersHorizontal, RotateCcw, Search, Sparkles } from 'lucide-react';

interface PropertyGridClientProps {
  initialProperties: Property[];
}

export function PropertyGridClient({ initialProperties }: PropertyGridClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search & Filter State initialization from URL query params
  const [selectedLocation, setSelectedLocation] = React.useState<string>(searchParams.get('location') || 'all');
  const [selectedType, setSelectedType] = React.useState<string>(searchParams.get('type') || 'all');
  const [minBedrooms, setMinBedrooms] = React.useState<string>(searchParams.get('bedrooms') || 'all');
  const [minPrice, setMinPrice] = React.useState<number>(Number(searchParams.get('minPrice')) || 0);
  const [maxPrice, setMaxPrice] = React.useState<number>(Number(searchParams.get('maxPrice')) || 50000000);
  const [minArea, setMinArea] = React.useState<number>(Number(searchParams.get('minArea')) || 0);
  const [statusFilter, setStatusFilter] = React.useState<string>(searchParams.get('status') || 'all');
  const [sortBy, setSortBy] = React.useState<string>(searchParams.get('sort') || 'recommended');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState<boolean>(false);

  // Sync state changes with URL query parameters
  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedLocation !== 'all') params.set('location', selectedLocation);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (minBedrooms !== 'all') params.set('bedrooms', minBedrooms);
    if (minPrice > 0) params.set('minPrice', minPrice.toString());
    if (maxPrice < 50000000) params.set('maxPrice', maxPrice.toString());
    if (minArea > 0) params.set('minArea', minArea.toString());
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (sortBy !== 'recommended') params.set('sort', sortBy);

    router.replace(`/properties?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    setSelectedLocation('all');
    setSelectedType('all');
    setMinBedrooms('all');
    setMinPrice(0);
    setMaxPrice(50000000);
    setMinArea(0);
    setStatusFilter('all');
    setSortBy('recommended');
    router.replace('/properties', { scroll: false });
  };

  // Filtered and sorted properties computation
  const filteredAndSortedProperties = React.useMemo(() => {
    let result = [...initialProperties];

    if (selectedLocation !== 'all') {
      result = result.filter((p) => p.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    if (selectedType !== 'all') {
      result = result.filter((p) => p.propertyType.toLowerCase() === selectedType.toLowerCase());
    }

    if (minBedrooms !== 'all') {
      result = result.filter((p) => p.bedrooms >= Number(minBedrooms));
    }

    if (minPrice > 0) {
      result = result.filter((p) => p.price >= minPrice);
    }

    if (maxPrice < 50000000) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    if (minArea > 0) {
      result = result.filter((p) => p.area >= minArea);
    }

    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sort evaluation
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'area-asc') {
      result.sort((a, b) => a.area - b.area);
    } else if (sortBy === 'area-desc') {
      result.sort((a, b) => b.area - a.area);
    }

    return result;
  }, [
    initialProperties,
    selectedLocation,
    selectedType,
    minBedrooms,
    minPrice,
    maxPrice,
    minArea,
    statusFilter,
    sortBy,
  ]);

  return (
    <Section spacing="lg" className="min-h-[85vh] pt-28">
      <Container size="xl" className="space-y-8">
        {/* Header Title Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <Badge variant="gold">Private Portfolio Marketplace</Badge>
            <Heading level="h1">Curated Architectural Estates</Heading>
          </div>
          <div className="text-left md:text-right space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Active Listings</p>
            <p className="font-serif text-2xl text-luxury-accent">
              {filteredAndSortedProperties.length} Residences Available
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-luxury-accent" />
              <span className="text-xs uppercase tracking-widest font-medium text-luxury-primary">
                Search & Filter Matrix
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="lg:hidden"
                icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                {isMobileFiltersOpen ? 'Hide Filters' : 'Mobile Filters'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleClearFilters}
              >
                Reset Filters
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Search className="w-3.5 h-3.5" />}
                onClick={updateQueryParams}
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Filter Inputs Grid (Responsive on desktop & collapsible on mobile) */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2 ${
              isMobileFiltersOpen ? 'block' : 'hidden lg:grid'
            }`}
          >
            {/* Location Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="all">All Global Hubs</option>
                <option value="New York">New York</option>
                <option value="Monaco">Monaco</option>
                <option value="Kyoto">Kyoto</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted">Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="all">All Types</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
                <option value="Estate">Estate</option>
              </select>
            </div>

            {/* Min Bedrooms */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted">Min Bedrooms</label>
              <select
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="all">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Availability Status */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted">Availability</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available Only</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Sort Selection & Active Summary Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
            <p className="text-xs text-luxury-muted font-light">
              Showing <span className="text-luxury-primary font-medium">{filteredAndSortedProperties.length}</span> of {initialProperties.length} landmark properties
            </p>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted whitespace-nowrap">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-luxury-bg border border-white/10 rounded-lg px-3 py-1.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-asc">Area: Low to High</option>
                <option value="area-desc">Area: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedProperties.length === 0 && (
          <div className="py-24 text-center glass-panel max-w-lg mx-auto rounded-xl p-10 space-y-4">
            <Sparkles className="w-8 h-8 text-luxury-accent mx-auto" />
            <p className="text-luxury-accent font-serif text-xl">No Residences Match Search Criteria</p>
            <p className="text-luxury-muted text-xs font-light">
              Try adjusting your price range, location filters, or bedroom requirements.
            </p>
            <Button variant="secondary" size="sm" onClick={handleClearFilters}>
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Property Grid: Desktop (3 cols), Tablet (2 cols), Mobile (1 col) */}
        {filteredAndSortedProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
