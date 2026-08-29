import { Property, PropertyStatus, PropertyType } from '@/types';
import { MOCK_PROPERTIES } from '@/data/properties';
import { supabase, isSupabaseConfigured } from '../supabase/client';

export class PropertyRepository {
  static async getAll(filters?: {
    featuredOnly?: boolean;
    status?: PropertyStatus;
    propertyType?: PropertyType;
  }): Promise<Property[]> {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback to memory dataset if Supabase is unconfigured
      let results = [...MOCK_PROPERTIES];
      if (filters?.featuredOnly) results = results.filter((p) => p.isFeatured);
      if (filters?.status) results = results.filter((p) => p.status === filters.status);
      if (filters?.propertyType) results = results.filter((p) => p.propertyType === filters.propertyType);
      return results;
    }

    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          location_data:locations(*),
          images:gallery_images(*),
          amenities:amenities(*),
          floors:floors(
            *,
            apartments:apartments(
              *,
              floor_plan:floor_plans(*)
            )
          )
        `);

      if (filters?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      const { data, error } = await query;
      if (error || !data) {
        console.warn('[PropertyRepository] Supabase query failed, falling back to mock dataset:', error);
        return MOCK_PROPERTIES;
      }

      return data as unknown as Property[];
    } catch (err) {
      console.warn('[PropertyRepository] Repository exception, returning fallback:', err);
      return MOCK_PROPERTIES;
    }
  }

  static async getBySlug(slug: string): Promise<Property | null> {
    if (!isSupabaseConfigured || !supabase) {
      return MOCK_PROPERTIES.find((p) => p.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          location_data:locations(*),
          images:gallery_images(*),
          amenities:amenities(*),
          floors:floors(
            *,
            apartments:apartments(
              *,
              floor_plan:floor_plans(*)
            )
          )
        `)
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return MOCK_PROPERTIES.find((p) => p.slug === slug) || null;
      }

      return data as unknown as Property;
    } catch {
      return MOCK_PROPERTIES.find((p) => p.slug === slug) || null;
    }
  }
}
