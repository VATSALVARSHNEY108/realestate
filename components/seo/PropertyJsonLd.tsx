import React from 'react';
import { Property } from '@/types';

interface PropertyJsonLdProps {
  property: Property;
}

export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aureusestates.com';
  const primaryImage = property.images.find((img) => img.isPrimary)?.url || property.images[0]?.url;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    url: `${baseUrl}/properties/${property.slug}`,
    image: primaryImage,
    datePosted: '2026-01-01',
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability:
        property.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
    realEstateAgent: {
      '@type': 'RealEstateAgent',
      name: 'Aureus Estates Private Advisory',
      url: baseUrl,
      telephone: '+1-800-888-AUREUS',
      priceRange: '$$$$$',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.locationData.address,
      addressLocality: property.locationData.city,
      addressCountry: property.locationData.country,
    },
    geo: property.locationData.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: property.locationData.coordinates.latitude,
          longitude: property.locationData.coordinates.longitude,
        }
      : undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'FTK',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
