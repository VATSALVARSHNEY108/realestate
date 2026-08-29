import { Property, PropertyStatus, PropertyType } from '@/types';
import { PropertyEnquiryPayload } from '@/types/enquiry';
import { PropertyRepository } from './repositories/PropertyRepository';
import { EnquiryRepository } from './repositories/EnquiryRepository';
import { unstable_cache } from 'next/cache';

/**
 * Cached property list query with 60-second revalidation window.
 * Dramatically speeds up repeat requests across /properties, /, and /projects.
 */
export const getProperties = unstable_cache(
  async (filters?: {
    featuredOnly?: boolean;
    status?: PropertyStatus;
    propertyType?: PropertyType;
  }): Promise<Property[]> => {
    return PropertyRepository.getAll(filters);
  },
  ['all-properties-cache'],
  { revalidate: 60, tags: ['properties'] }
);

/**
 * Cached single property lookup by slug with 300-second revalidation window.
 */
export const getPropertyBySlug = unstable_cache(
  async (slug: string): Promise<Property | null> => {
    return PropertyRepository.getBySlug(slug);
  },
  ['single-property-by-slug'],
  { revalidate: 300, tags: ['properties'] }
);

export async function submitPropertyEnquiry(payload: PropertyEnquiryPayload): Promise<{ success: boolean; id: string }> {
  return EnquiryRepository.createEnquiry(payload);
}
