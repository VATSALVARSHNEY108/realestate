'use client';

import React, { useActionState } from 'react';
import { signInWithPassword } from '../actions';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

type ActionState = { error?: string } | null;

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    signInWithPassword,
    null
  );

  return (
    <div className="min-h-screen bg-luxury-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-xl bg-luxury-accent/10 border border-luxury-accent/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7 text-luxury-accent" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-accent font-medium">Aureus Estates</p>
            <h1 className="font-serif text-2xl text-luxury-primary mt-1">Admin Console</h1>
            <p className="text-luxury-muted text-xs mt-1">Principal Access Only</p>
          </div>
        </div>

        {/* Login Form */}
        <form action={formAction} className="glass-panel p-8 rounded-2xl border border-white/10 space-y-5">
          {state?.error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {state.error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="admin@aureusestates.com"
                className="w-full pl-10 pr-4 py-3 bg-luxury-bg border border-white/10 rounded-xl text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-luxury-muted font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted" />
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-luxury-bg border border-white/10 rounded-xl text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 px-6 bg-luxury-accent text-luxury-bg font-medium text-xs uppercase tracking-widest rounded-xl hover:bg-luxury-accent/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              'Access Admin Console'
            )}
          </button>

          <p className="text-center text-[10px] text-luxury-muted pt-2">
            Protected by Supabase Auth. All sessions are server-verified.
          </p>
        </form>

        <div className="text-center">
          <Badge variant="surface" className="mx-auto text-[9px]">
            🔒 NDA Protected Access
          </Badge>
        </div>
      </div>
    </div>
  );
}
