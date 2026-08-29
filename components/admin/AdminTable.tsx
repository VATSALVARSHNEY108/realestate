'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface AdminTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
}

export function AdminTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'No records found.',
}: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="glass-panel rounded-xl border border-white/5 px-8 py-16 text-center text-luxury-muted text-xs space-y-2">
        <p className="font-serif text-base text-luxury-primary">No Records</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-white/5 text-luxury-muted uppercase tracking-widest">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className={cn('text-left px-6 py-3 font-normal', col.className)}>
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-6 py-3 font-normal">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-white/2 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn('px-6 py-3', col.className)}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-3 text-right space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-luxury-accent hover:underline text-[10px] uppercase tracking-widest"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-400 hover:underline text-[10px] uppercase tracking-widest"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
