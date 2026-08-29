import { MOCK_PROPERTIES } from '@/data/properties';
import { Building2, Home, Calendar, Mail, TrendingUp } from 'lucide-react';

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: number | string;
  delta?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  accent?: boolean;
}) {
  const borderClass = accent ? 'border-luxury-accent/40 bg-luxury-accent/5' : 'border-white/5';
  const wrapperClass = accent ? 'p-2 rounded-lg bg-luxury-accent/20' : 'p-2 rounded-lg bg-white/5';
  const iconClass = accent ? 'w-4 h-4 text-luxury-accent' : 'w-4 h-4 text-luxury-muted';
  return (
    <div className={`glass-panel p-6 rounded-xl border ${borderClass} space-y-3`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-luxury-muted">{label}</span>
        <div className={wrapperClass}>
          <Icon className={iconClass} />
        </div>
      </div>
      <p className="font-serif text-3xl text-luxury-primary">{value}</p>
      {delta && (
        <p className="text-[10px] text-emerald-400 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {delta}
        </p>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const properties = MOCK_PROPERTIES;
  const apartments = properties.flatMap((p) => p.floors?.flatMap((f) => f.apartments) ?? []);
  const available = apartments.filter((a) => a?.status === 'available').length;
  const reserved = apartments.filter((a) => a?.status === 'reserved').length;
  const sold = apartments.filter((a) => a?.status === 'sold').length;

  return (
    <div className="space-y-8">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard label="Total Properties" value={properties.length} icon={Building2} accent />
        <StatCard label="Available Suites" value={available} icon={Home} delta="+2 this week" />
        <StatCard label="Reserved Suites" value={reserved} icon={Calendar} />
        <StatCard label="Sold Suites" value={sold} icon={TrendingUp} />
        <StatCard label="New Enquiries" value={12} icon={Mail} delta="+4 today" />
      </div>

      {/* Recent Properties Table */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-serif text-base text-luxury-primary">Recent Properties</h2>
          <span className="text-[10px] uppercase tracking-widest text-luxury-muted">{properties.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="border-b border-white/5 text-luxury-muted uppercase tracking-widest">
              <tr>
                <th className="text-left px-6 py-3 font-normal">Name</th>
                <th className="text-left px-6 py-3 font-normal hidden md:table-cell">Location</th>
                <th className="text-left px-6 py-3 font-normal hidden lg:table-cell">Type</th>
                <th className="text-left px-6 py-3 font-normal">Price</th>
                <th className="text-left px-6 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-3 text-luxury-primary font-serif">{p.name}</td>
                  <td className="px-6 py-3 text-luxury-muted hidden md:table-cell">{p.locationData.city}</td>
                  <td className="px-6 py-3 text-luxury-muted hidden lg:table-cell">{p.propertyType}</td>
                  <td className="px-6 py-3 text-luxury-accent">${(p.price / 1_000_000).toFixed(1)}M</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest ${
                      p.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      p.status === 'sold' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
