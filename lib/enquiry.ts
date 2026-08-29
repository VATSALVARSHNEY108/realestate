import { PropertyEnquiryPayload } from '@/types/enquiry';

/**
 * Abstraction layer for submitting client enquiries.
 * Readily compatible with Next.js Server Actions, Supabase, or API route endpoints.
 */
export async function submitEnquiry(payload: PropertyEnquiryPayload): Promise<{ success: boolean; id: string }> {
  // Simulate network latency and server response
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log('[Enquiry API Abstraction] Received valid payload:', payload);

  return {
    success: true,
    id: `enq-${Date.now()}`,
  };
}
