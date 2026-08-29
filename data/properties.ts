import { Property, NavigationLink, LocationHub, Amenity, DeveloperStat } from '@/types';

export const NAV_LINKS: NavigationLink[] = [
  { label: 'Properties', href: '/properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-solstice-penthouse',
    slug: 'the-solstice-penthouse',
    name: 'The Solstice Penthouse',
    location: 'New York, USA',
    description: 'Crown penthouse occupying the entire 88th floor with panoramic Manhattan skyline and East River vistas.',
    price: 24500000,
    propertyType: 'Penthouse',
    bedrooms: 5,
    bathrooms: 6,
    area: 8200,
    status: 'available',
    isFeatured: true,
    locationData: {
      city: 'New York',
      country: 'USA',
      address: '432 Park Avenue, Penthouse 88',
      coordinates: { latitude: 40.7615, longitude: -73.9712 },
      neighborhoodOverview: 'Midtown East luxury corridor steps away from Central Park and Fifth Avenue flagship ateliers.',
    },
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        alt: 'Solstice Penthouse Main Living Area',
        isPrimary: true,
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        alt: 'Terrace Skyline View',
      },
    ],
    amenities: [
      { id: 'am-1', title: 'Private Helipad Access', category: 'Aviation' },
      { id: 'am-2', title: 'Private Elevator', category: 'Access' },
      { id: 'am-3', title: 'Wine Cellar (2,000 Bottles)', category: 'Gastronomy' },
    ],
    floors: [
      {
        id: 'fl-88',
        floorNumber: 88,
        title: 'Level 88 Penthouse Suite Collection',
        totalUnits: 2,
        apartments: [
          {
            id: 'apt-88a',
            number: 'PH-8801',
            floorNumber: 88,
            type: 'Crown Duplex Penthouse',
            bedrooms: 5,
            bathrooms: 6,
            bhk: '5 BHK',
            facing: 'South-East',
            areaSqft: 8200,
            price: 24500000,
            status: 'available',
            floorPlan: {
              id: 'fp-8801',
              title: 'PH-8801 Architectural Layout',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            },
            images: [
              {
                id: 'img-88a',
                url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
                alt: 'PH-8801 Living Room',
              },
            ],
          },
          {
            id: 'apt-88b',
            number: 'PH-8802',
            floorNumber: 88,
            type: 'Sky Villa Penthouse',
            bedrooms: 4,
            bathrooms: 5,
            bhk: '4 BHK',
            facing: 'North-West',
            areaSqft: 6400,
            price: 19800000,
            status: 'reserved',
            floorPlan: {
              id: 'fp-8802',
              title: 'PH-8802 Layout',
              image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
            },
            images: [
              {
                id: 'img-88b',
                url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
                alt: 'PH-8802 Terrace',
              },
            ],
          },
        ],
      },
      {
        id: 'fl-87',
        floorNumber: 87,
        title: 'Level 87 Executive Residences',
        totalUnits: 3,
        apartments: [
          {
            id: 'apt-8701',
            number: 'A8701',
            floorNumber: 87,
            type: 'Corner Residence',
            bedrooms: 3,
            bathrooms: 4,
            bhk: '3 BHK',
            facing: 'East',
            areaSqft: 4200,
            price: 14200000,
            status: 'available',
            floorPlan: {
              id: 'fp-8701',
              title: 'A8701 Floor Plan',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            },
            images: [
              {
                id: 'img-8701',
                url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
                alt: 'A8701 Interior',
              },
            ],
          },
          {
            id: 'apt-8702',
            number: 'A8702',
            floorNumber: 87,
            type: 'Harbor Suite',
            bedrooms: 3,
            bathrooms: 3.5,
            bhk: '3 BHK',
            facing: 'South',
            areaSqft: 3800,
            price: 12900000,
            status: 'sold',
            images: [],
          },
        ],
      },
    ],
  },
];

export const FEATURED_LOCATIONS: LocationHub[] = [
  {
    id: 'loc-1',
    name: 'Manhattan Skyline',
    country: 'United States',
    residencesCount: 14,
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    description: 'Iconic penthouses commanding unobstructed views of Central Park and the skyline.',
  },
  {
    id: 'loc-2',
    name: 'French Riviera',
    country: 'Monaco & Cote d\'Azur',
    residencesCount: 8,
    featuredImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1000&q=80',
    description: 'Sun-drenched Mediterranean estates with private deepwater boat docks.',
  },
  {
    id: 'loc-3',
    name: 'Alpine Alps',
    country: 'Switzerland',
    residencesCount: 6,
    featuredImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1000&q=80',
    description: 'Ski-in ski-out luxury chalets framed by majestic glacial peaks.',
  },
];

export const LIFESTYLE_AMENITIES: Amenity[] = [
  {
    id: 'amenity-1',
    title: 'Private Aviation Access',
    category: 'Logistics',
    description: 'Direct helipad connections and private jet concierge services standard across portfolio.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'amenity-2',
    title: 'Wellness & Hydrotherapy',
    category: 'Sanctuary',
    description: 'Subterranean mineral pools, cryotherapy chambers, and private spa retreats.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'amenity-3',
    title: 'Curated Wine Vaults',
    category: 'Gastronomy',
    description: 'Sommelier-grade climate controlled cellars accommodating multi-thousand bottle reserves.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
];

export const DEVELOPER_STATS: DeveloperStat[] = [
  {
    id: 'stat-1',
    label: 'Portfolio Value',
    value: '4.2',
    unit: '$Billion',
    description: 'Total value of developed and under-management luxury assets worldwide.',
  },
  {
    id: 'stat-2',
    label: 'Architectural Awards',
    value: '38',
    unit: 'Global',
    description: 'International recognitions for structural innovation and sustainable luxury.',
  },
  {
    id: 'stat-3',
    label: 'Client Retention',
    value: '98',
    unit: '%',
    description: 'Repeat ultra-high-net-worth clients and private family office partnerships.',
  },
  {
    id: 'stat-4',
    label: 'Landmark Completed',
    value: '64',
    unit: 'Estates',
    description: 'Bespoke residential sanctuaries across 12 tier-one global cities.',
  },
];
