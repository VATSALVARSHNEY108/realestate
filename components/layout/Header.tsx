'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/data/properties';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-luxury-bg/80 backdrop-blur-md border-b border-white/5 shadow-2xl py-4'
          : 'bg-transparent border-b border-transparent py-6'
      )}
    >
      <Container size="xl" className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 group focus:outline-none focus:ring-1 focus:ring-luxury-accent/50 p-1 rounded"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-luxury-primary uppercase group-hover:text-luxury-accent transition-colors">
            AUREUS
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-accent font-light border-l border-white/10 pl-3">
            ESTATES
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-1 focus:outline-none focus:text-luxury-accent',
                  isActive ? 'text-luxury-accent font-medium' : 'text-luxury-muted hover:text-luxury-primary'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-accent rounded-full animate-in fade-in duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/contact" tabIndex={-1}>
            <Button variant={pathname === '/contact' ? 'primary' : 'secondary'} size="sm">
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-luxury-primary hover:text-luxury-accent focus:outline-none focus:ring-1 focus:ring-luxury-accent/50 rounded-lg transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Animated Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-luxury-bg/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-6 pt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-accent font-medium">
              Navigation Menu
            </p>
            <nav className="flex flex-col space-y-5" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'font-serif text-2xl tracking-wide uppercase transition-all duration-300 py-1 flex items-center justify-between border-b border-white/5',
                      isActive ? 'text-luxury-accent pl-2' : 'text-luxury-primary hover:text-luxury-accent hover:pl-2'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-luxury-accent" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full text-center justify-center">
                Contact Concierge
              </Button>
            </Link>
            <p className="text-[10px] text-center text-luxury-muted uppercase tracking-widest">
              Aureus Estates Advisory
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
