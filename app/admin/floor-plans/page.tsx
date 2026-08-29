import { Layers } from 'lucide-react';

export default function AdminFloorPlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-luxury-primary">Floor Plans</h2>
        <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">Manage uploaded floor plan schematics</p>
      </div>
      <div className="glass-panel rounded-xl border border-white/5 px-8 py-20 text-center space-y-4">
        <Layers className="w-8 h-8 text-luxury-accent mx-auto opacity-60" />
        <p className="font-serif text-lg text-luxury-primary">Floor Plan Manager</p>
        <p className="text-luxury-muted text-xs max-w-sm mx-auto">Connect Supabase to manage floor plan uploads. Use the schema migration to create the floor_plans table.</p>
      </div>
    </div>
  );
}
