export interface DetailedAmenity {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  specs?: string[];
}

export const INTERACTIVE_AMENITIES: DetailedAmenity[] = [
  {
    id: 'infinity-pool',
    title: 'Infinity Pool',
    category: 'Wellness & Aquatic',
    description: '75-foot heated cantilevered pool suspending over the city skyline with underwater acoustic audio systems.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80',
    specs: ['75-Foot Length', 'Heated Saltwater', 'Skyline Panorama'],
  },
  {
    id: 'gym',
    title: 'Fitness & Movement Club',
    category: 'Performance',
    description: 'Technogym ARTIS equipment, private Pilates reform studios, and custom performance coaching suites.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    specs: ['Technogym Suite', 'Reform Pilates', 'Personal Trainers'],
  },
  {
    id: 'sky-lounge',
    title: 'Sky Lounge & Terrace',
    category: 'Social Sanctuary',
    description: 'Enclosed Glass Observatory at level 70 featuring private sommelier service and firepits.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    specs: ['Level 70 Elevation', 'Private Sommelier', 'Panoramic Firepits'],
  },
  {
    id: 'garden',
    title: 'Zen Botanical Sanctuary',
    category: 'Landscape',
    description: 'Multi-tiered courtyard garden curated by master landscape architects with tranquil water features.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80',
    specs: ['Native Flora', 'Cascading Waterfalls', 'Private Reading Nooks'],
  },
  {
    id: 'club-house',
    title: 'Private Club House',
    category: 'Executive',
    description: 'Private screening theater, executive boardrooms, and private dining rooms catered by Michelin chefs.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    specs: ['4K Dolby Cinema', 'Executive Boardroom', 'Private Dining'],
  },
  {
    id: 'rooftop',
    title: 'Rooftop Observatory',
    category: 'Sanctuary',
    description: '360-degree open-air deck with telescope observation points and private cabanas.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    specs: ['Open Air Deck', 'Celestron Telescopes', 'Private Cabanas'],
  },
  {
    id: 'concierge',
    title: '24/7 White-Glove Concierge',
    category: 'Services',
    description: 'Dedicated residential team managing travel logistics, private dining, and security details.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
    specs: ['24/7 Presence', 'Private Valet', 'Secured Parcel Vault'],
  },
  {
    id: 'parking',
    title: 'Subterranean EV Parking',
    category: 'Logistics',
    description: 'Automated robotic parking system with fast EV charging stations for every residence.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80',
    specs: ['Automated Valet', 'Fast EV Chargers', 'Biometric Gate Access'],
  },
];
