'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function AdminModal({ title, onClose, children }: AdminModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-bg/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel border border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="font-serif text-lg text-luxury-primary">{title}</h3>
          <Button variant="icon" icon={<X className="w-4 h-4" />} onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
}
