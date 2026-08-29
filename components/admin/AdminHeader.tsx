'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

const ROUTE_LABELS: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/properties': 'Properties',
  '/admin/apartments': 'Apartments',
  '/admin/floor-plans': 'Floor Plans',
  '/admin/amenities': 'Amenities',
  '/admin/gallery': 'Gallery',
  '/admin/enquiries': 'Enquiries',
  '/admin/settings': 'Settings',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = ROUTE_LABELS[pathname] ?? 'Admin';

  return (
    <header className="h-[60px] flex items-center justify-between px-6 border-b border-white/5 bg-[#0D0D0D]/60 backdrop-blur-md sticky top-0 z-20">
      <div>
        <h1 className="font-serif text-base text-luxury-primary">{title}</h1>
        <p className="text-[9px] uppercase tracking-widest text-luxury-muted">Aureus Admin Console</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-luxury-muted" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-8 pr-4 py-1.5 bg-luxury-bg border border-white/10 rounded-lg text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent w-48"
          />
        </div>
        <button className="relative p-2 rounded-lg border border-white/10 hover:border-luxury-accent/40 transition-all">
          <Bell className="w-4 h-4 text-luxury-muted" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-luxury-accent" />
        </button>
      </div>
    </header>
  );
}
