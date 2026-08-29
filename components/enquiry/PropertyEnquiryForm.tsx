'use client';

import React, { useState } from 'react';
import { PropertyEnquiryPayload, FormErrors } from '@/types/enquiry';
import { submitEnquiry } from '@/lib/enquiry';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';

interface PropertyEnquiryFormProps {
  defaultProperty?: string;
  defaultApartment?: string;
  onSuccess?: () => void;
}

export function PropertyEnquiryForm({
  defaultProperty = 'The Solstice Penthouse',
  defaultApartment = '',
  onSuccess,
}: PropertyEnquiryFormProps) {
  const [formData, setFormData] = useState<PropertyEnquiryPayload>({
    name: '',
    email: '',
    phone: '',
    property: defaultProperty,
    apartment: defaultApartment,
    budget: '$10M - $25M USD',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (!formData.phone.trim() || formData.phone.trim().length < 7 || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid contact phone number.';
    }

    if (!formData.property.trim()) {
      newErrors.property = 'Property selection is required.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message (min 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await submitEnquiry(formData);
      if (response.success) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-luxury-accent/40 text-center space-y-6 animate-in fade-in duration-500">
        <CheckCircle2 className="w-12 h-12 text-luxury-accent mx-auto" />
        <div className="space-y-2">
          <Badge variant="gold" className="mx-auto">
            Inquiry Received
          </Badge>
          <h3 className="font-serif text-3xl text-luxury-primary">Thank you.</h3>
          <p className="text-luxury-muted text-sm max-w-md mx-auto font-light leading-relaxed">
            Your enquiry has been received. A senior principal advisor from Aureus Estates Concierge will contact you within 24 hours.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              phone: '',
              property: defaultProperty,
              apartment: defaultApartment,
              budget: '$10M - $25M USD',
              message: '',
            });
          }}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 space-y-6">
      <div className="space-y-2 border-b border-white/5 pb-4">
        <Badge variant="gold">Private Advisory</Badge>
        <h3 className="font-serif text-2xl text-luxury-primary">Schedule Private Consultation</h3>
        <p className="text-luxury-muted text-xs font-light">
          Complete the advisory prospectus form below for private viewings and off-market portfolio access.
        </p>
      </div>

      {status === 'error' && (
        <div className="glass-card p-4 rounded-xl border border-red-500/30 flex items-center space-x-3 text-red-400 text-xs">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>An error occurred while submitting your inquiry. Please try again or contact concierge directly.</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Julian Vance"
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          />
          {errors.name && <p className="text-red-400 text-[10px]">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="julian@vance-advisory.com"
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          />
          {errors.email && <p className="text-red-400 text-[10px]">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Contact Phone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 234-5678"
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          />
          {errors.phone && <p className="text-red-400 text-[10px]">{errors.phone}</p>}
        </div>

        {/* Property */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Target Residence *
          </label>
          <input
            type="text"
            value={formData.property}
            onChange={(e) => setFormData({ ...formData, property: e.target.value })}
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          />
          {errors.property && <p className="text-red-400 text-[10px]">{errors.property}</p>}
        </div>

        {/* Apartment Suite Optional */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Suite Number (Optional)
          </label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
            placeholder="e.g. PH-8801"
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          />
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
            Acquisition Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
          >
            <option value="Under $10M USD">Under $10M USD</option>
            <option value="$10M - $25M USD">$10M - $25M USD</option>
            <option value="$25M - $50M USD">$25M - $50M USD</option>
            <option value="$50M+ USD">$50M+ USD</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
          Inquiry Message & Requirements *
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Specify desired viewing dates, acoustic/security preferences, or private family office details..."
          className="w-full bg-luxury-bg border border-white/10 rounded-lg p-4 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
        />
        {errors.message && <p className="text-red-400 text-[10px]">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full justify-center"
        disabled={status === 'submitting'}
        icon={status === 'submitting' ? <Sparkles className="w-4 h-4 animate-spin-slow" /> : <Send className="w-4 h-4" />}
      >
        {status === 'submitting' ? 'Submitting Advisory Inquiry...' : 'Submit Confidential Inquiry'}
      </Button>
    </form>
  );
}
