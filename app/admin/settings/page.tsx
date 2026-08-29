import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-luxury-primary">Settings</h2>
        <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">Platform configuration and integrations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Supabase Project URL', key: 'NEXT_PUBLIC_SUPABASE_URL', placeholder: 'https://xxxx.supabase.co' },
          { label: 'Supabase Anon Key', key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', placeholder: 'eyJhbGci...' },
          { label: 'Mapbox Token', key: 'NEXT_PUBLIC_MAPBOX_TOKEN', placeholder: 'pk.eyJ1...' },
        ].map((setting) => (
          <div key={setting.key} className="glass-panel p-6 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-luxury-accent" />
              <span className="text-xs text-luxury-muted uppercase tracking-widest">{setting.label}</span>
            </div>
            <input
              type="text"
              placeholder={setting.placeholder}
              disabled
              className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2 text-xs text-luxury-muted focus:outline-none cursor-not-allowed"
            />
            <p className="text-[10px] text-luxury-muted">
              Set <code className="text-luxury-accent">{setting.key}</code> in your <code className="text-luxury-accent">.env.local</code> file.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
