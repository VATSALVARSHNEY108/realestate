export interface PropertyEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  property: string;
  apartment?: string;
  budget: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  property?: string;
  budget?: string;
  message?: string;
}
