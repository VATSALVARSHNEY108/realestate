export type PropertyStatus = 'available' | 'reserved' | 'sold';

export type PropertyType = 'Penthouse' | 'Villa' | 'Estate' | 'Residence' | 'Chalet';

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface LocationData {
  city: string;
  country: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  neighborhoodOverview?: string;
}

export interface LocationHub {
  id: string;
  name: string;
  country: string;
  residencesCount: number;
  featuredImage: string;
  description: string;
}

export interface Amenity {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface DeveloperStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
}

export interface FloorPlan {
  id: string;
  title: string;
  image: string;
  pdfUrl?: string;
  dimensions?: string;
}

export interface Apartment {
  id: string;
  number: string;
  floorNumber: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  bhk: string;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'South-East' | 'North-West' | 'South-West';
  areaSqft: number;
  price: number;
  status: PropertyStatus;
  floorPlan?: FloorPlan;
  images: GalleryImage[];
}

export interface Floor {
  id: string;
  floorNumber: number;
  title: string;
  apartments: Apartment[];
  totalUnits: number;
}

export interface PropertyAmenity {
  id: string;
  title: string;
  category: string;
  description?: string;
  iconName?: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  price: number;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: PropertyStatus;
  images: GalleryImage[];
  amenities: PropertyAmenity[];
  locationData: LocationData;
  floors?: Floor[];
  isFeatured?: boolean;
  createdAt?: string;
}

export interface Enquiry {
  id?: string;
  propertyId: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message: string;
  preferredContactMethod: 'email' | 'phone';
  createdAt?: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}
