export interface NearbyLandmark {
  id: string;
  name: string;
  category: 'Airport' | 'Metro' | 'School' | 'Hospital' | 'Shopping' | 'Downtown';
  distanceKm: number;
  travelTimeMinutes: number;
  travelMode: 'driving' | 'transit' | 'walking';
}

export interface LocationExperienceData {
  address: string;
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  mapboxToken?: string;
  landmarks: NearbyLandmark[];
}

export const MOCK_LOCATION_DATA: LocationExperienceData = {
  address: '432 Park Avenue, Penthouse 88',
  city: 'New York',
  country: 'USA',
  coordinates: {
    latitude: 40.7615,
    longitude: -73.9712,
  },
  landmarks: [
    { id: 'lm-1', name: 'JFK International Airport', category: 'Airport', distanceKm: 24, travelTimeMinutes: 35, travelMode: 'driving' },
    { id: 'lm-2', name: '5th Ave & 59th St Station', category: 'Metro', distanceKm: 0.3, travelTimeMinutes: 4, travelMode: 'walking' },
    { id: 'lm-3', name: 'The Brearley School', category: 'School', distanceKm: 2.1, travelTimeMinutes: 8, travelMode: 'driving' },
    { id: 'lm-4', name: 'Mount Sinai Hospital', category: 'Hospital', distanceKm: 3.5, travelTimeMinutes: 10, travelMode: 'driving' },
    { id: 'lm-5', name: 'Fifth Avenue Flagship Ateliers', category: 'Shopping', distanceKm: 0.2, travelTimeMinutes: 3, travelMode: 'walking' },
    { id: 'lm-6', name: 'Midtown Manhattan Business Core', category: 'Downtown', distanceKm: 0.5, travelTimeMinutes: 6, travelMode: 'walking' },
  ],
};
