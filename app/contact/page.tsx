import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { PropertyEnquiryForm } from '@/components/enquiry/PropertyEnquiryForm';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 space-y-0">
      <Section spacing="lg">
        <Container size="xl" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Advisory Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <Badge variant="gold">Private Advisory</Badge>
              <Heading level="h1">Global Client Concierge</Heading>
              <p className="text-luxury-muted text-sm font-light leading-relaxed">
                Connect directly with our senior principals in New York, Monaco, and Tokyo for off-market access and architectural advisory.
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5 text-xs">
              <div className="glass-panel p-5 rounded-xl border border-white/5 flex items-center space-x-4">
                <Mail className="w-5 h-5 text-luxury-accent flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Private Email</p>
                  <p className="font-serif text-base text-luxury-primary mt-0.5">concierge@aureusestates.com</p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/5 flex items-center space-x-4">
                <Phone className="w-5 h-5 text-luxury-accent flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Global Direct Desk</p>
                  <p className="font-serif text-base text-luxury-primary mt-0.5">+1 (800) 888-AUREUS</p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/5 flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-luxury-accent flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Principal Atelier</p>
                  <p className="font-serif text-base text-luxury-primary mt-0.5">432 Park Avenue, Suite 500, New York</p>
                </div>
              </div>
            </div>

            <div className="p-4 glass-card rounded-xl border border-emerald-500/20 flex items-center space-x-3 text-emerald-400 text-xs">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>Strict non-disclosure agreements (NDA) enforced standard across all client inquiries.</span>
            </div>
          </div>

          {/* Right Column: Reusable Production PropertyEnquiryForm */}
          <div className="lg:col-span-7">
            <PropertyEnquiryForm />
          </div>
        </Container>
      </Section>
    </div>
  );
}
