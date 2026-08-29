'use client';

import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '@/data/properties';
import { Apartment } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminModal } from '@/components/admin/AdminModal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

type ApartmentWithProperty = Apartment & { propertyName: string };

function getAllApartments(): ApartmentWithProperty[] {
  return MOCK_PROPERTIES.flatMap((p) =>
    (p.floors ?? []).flatMap((f) =>
      (f.apartments ?? []).map((a) => ({ ...a, propertyName: p.name }))
    )
  );
}

export default function AdminApartmentsPage() {
  const [apartments, setApartments] = useState<ApartmentWithProperty[]>(getAllApartments());
  const [editTarget, setEditTarget] = useState<ApartmentWithProperty | null>(null);
  const [formData, setFormData] = useState<Partial<Apartment>>({});

  const handleEdit = (a: ApartmentWithProperty) => {
    setEditTarget(a);
    setFormData({ ...a });
  };

  const handleDelete = (a: ApartmentWithProperty) => {
    if (window.confirm(`Remove suite "${a.number}"?`)) {
      setApartments((prev) => prev.filter((x) => x.id !== a.id));
    }
  };

  const handleSave = () => {
    if (editTarget) {
      setApartments((prev) =>
        prev.map((a) => (a.id === editTarget.id ? { ...a, ...formData } : a))
      );
      setEditTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-luxury-primary">Apartments</h2>
          <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">{apartments.length} total suites</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => alert('Link to property first before adding a suite.')}>
          Add Suite
        </Button>
      </div>

      <AdminTable<ApartmentWithProperty>
        columns={[
          { key: 'number', label: 'Suite', render: (a) => <span className="font-serif text-luxury-primary">{a.number}</span> },
          { key: 'propertyName', label: 'Property', render: (a) => <span className="text-luxury-muted">{a.propertyName}</span> },
          { key: 'bhk', label: 'BHK', render: (a) => <span className="text-luxury-muted">{a.bhk}</span>, className: 'hidden md:table-cell' },
          { key: 'areaSqft', label: 'Area', render: (a) => <span className="text-luxury-muted">{a.areaSqft.toLocaleString()} sqft</span>, className: 'hidden lg:table-cell' },
          { key: 'price', label: 'Price', render: (a) => <span className="text-luxury-accent">${(a.price / 1_000_000).toFixed(2)}M</span> },
          {
            key: 'status', label: 'Status', render: (a) => (
              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest ${
                a.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                a.status === 'sold' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>{a.status}</span>
            ),
          },
        ]}
        data={apartments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No apartment suites found."
      />

      {editTarget && (
        <AdminModal title={`Edit Suite: ${editTarget.number}`} onClose={() => setEditTarget(null)}>
          <div className="space-y-4">
            {[
              { key: 'number', label: 'Suite Number', type: 'text' },
              { key: 'price', label: 'Price (USD)', type: 'number' },
              { key: 'areaSqft', label: 'Area (sqft)', type: 'number' },
              { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
              { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
            ].map(({ key, label, type }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-luxury-muted">{label}</label>
                <input
                  type={type}
                  value={String((formData as Record<string, unknown>)[key] ?? '')}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                  className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-luxury-muted">Status</label>
              <select
                value={formData.status ?? 'available'}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Apartment['status'] }))}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
              <Button variant="secondary" size="sm" onClick={() => setEditTarget(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
