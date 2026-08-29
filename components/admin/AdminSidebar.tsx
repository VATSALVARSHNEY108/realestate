'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Home,
  Layers,
  Sparkles,
  ImageIcon,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut } from '@/app/admin/actions';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Properties', href: '/admin/properties', icon: Building2 },
  { label: 'Apartments', href: '/admin/apartments', icon: Home },
  { label: 'Floor Plans', href: '/admin/floor-plans', icon: Layers },
  { label: 'Amenities', href: '/admin/amenities', icon: Sparkles },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-[#0D0D0D] border-r border-white/5 transition-all duration-300',
        collapsed ? 'w-[64px]' : 'w-[220px]'
      )}
    >
      {/* Branding */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <ShieldCheck className="w-6 h-6 text-luxury-accent flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-accent font-medium leading-none">Aureus</p>
            <p className="text-[9px] uppercase tracking-widest text-luxury-muted leading-none mt-0.5">Admin Console</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all duration-200 group',
                isActive
                  ? 'bg-luxury-accent/15 text-luxury-accent border border-luxury-accent/30'
                  : 'text-luxury-muted hover:text-luxury-primary hover:bg-white/5 border border-transparent'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-white/5 space-y-1">
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs text-luxury-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </form>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center hover:border-luxury-accent/50 transition-all"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-luxury-muted" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-luxury-muted" />
        )}
      </button>
    </aside>
  );
}
