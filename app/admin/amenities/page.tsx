import { Sparkles } from 'lucide-react';

export default function AdminAmenitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-luxury-primary">Amenities</h2>
        <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">Manage property amenities and privileges</p>
      </div>
      <div className="glass-panel rounded-xl border border-white/5 px-8 py-20 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-luxury-accent mx-auto opacity-60" />
        <p className="font-serif text-lg text-luxury-primary">Amenities Manager</p>
        <p className="text-luxury-muted text-xs max-w-sm mx-auto">Connect Supabase to manage amenity records per property. Use the schema migration to create the amenities table.</p>
      </div>
    </div>
  );
}
