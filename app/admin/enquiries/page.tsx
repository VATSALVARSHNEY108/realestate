import { Mail, User, Phone, Calendar } from 'lucide-react';

const MOCK_ENQUIRIES = [
  { id: 'enq-1', clientName: 'Julian Vance', clientEmail: 'julian@vance.com', clientPhone: '+1 555 001 2345', propertyName: 'The Solstice Penthouse', message: 'Interested in a private viewing this Saturday.', createdAt: '2026-08-25' },
  { id: 'enq-2', clientName: 'Aria Montclair', clientEmail: 'aria@montclair.io', clientPhone: '+44 7700 900 321', propertyName: 'Sky Residence 88', message: 'Would like floor plan details for suites A1201–A1204.', createdAt: '2026-08-26' },
  { id: 'enq-3', clientName: 'Sebastien Roux', clientEmail: 's.roux@delmarholdings.fr', clientPhone: '+33 6 12 34 56 78', propertyName: 'The Solstice Penthouse', message: 'Requesting NDA and off-market prospectus.', createdAt: '2026-08-27' },
];

export default function AdminEnquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-luxury-primary">Enquiries</h2>
          <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">{MOCK_ENQUIRIES.length} client inquiries received</p>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_ENQUIRIES.map((enq) => (
          <div key={enq.id} className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-luxury-accent/15 border border-luxury-accent/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-luxury-accent" />
                </div>
                <div>
                  <p className="font-serif text-sm text-luxury-primary">{enq.clientName}</p>
                  <p className="text-[10px] text-luxury-muted">{enq.propertyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-luxury-muted">
                <Calendar className="w-3 h-3" />
                {enq.createdAt}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-luxury-muted">
                <Mail className="w-3.5 h-3.5 text-luxury-accent" />
                {enq.clientEmail}
              </div>
              <div className="flex items-center gap-2 text-luxury-muted">
                <Phone className="w-3.5 h-3.5 text-luxury-accent" />
                {enq.clientPhone}
              </div>
            </div>

            <p className="text-xs text-luxury-muted font-light border-t border-white/5 pt-3">
              {enq.message}
            </p>

            <div className="flex gap-3 pt-1">
              <a href={`mailto:${enq.clientEmail}`} className="text-[10px] uppercase tracking-widest text-luxury-accent hover:underline">
                Reply via Email →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
