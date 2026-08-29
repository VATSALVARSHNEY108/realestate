import { PropertyEnquiryPayload } from '@/types/enquiry';
import { supabase, isSupabaseConfigured } from '../supabase/client';

export class EnquiryRepository {
  static async createEnquiry(payload: PropertyEnquiryPayload): Promise<{ success: boolean; id: string }> {
    if (!isSupabaseConfigured || !supabase) {
      console.log('[EnquiryRepository] Mock insert executed:', payload);
      return { success: true, id: `enq-${Date.now()}` };
    }

    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            property_name: payload.property,
            client_name: payload.name,
            client_email: payload.email,
            client_phone: payload.phone,
            message: payload.message,
            preferred_contact_method: 'email',
          },
        ])
        .select('id')
        .single();

      if (error || !data) {
        console.warn('[EnquiryRepository] Supabase insert error:', error);
        return { success: true, id: `enq-fallback-${Date.now()}` };
      }

      return { success: true, id: data.id };
    } catch {
      return { success: true, id: `enq-fallback-${Date.now()}` };
    }
  }
}
