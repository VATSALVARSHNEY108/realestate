'use client';

import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '@/data/properties';
import { Property } from '@/types';
import { AdminTable } from '@/components/admin/AdminTable';
import { AdminModal } from '@/components/admin/AdminModal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

const EMPTY_PROPERTY: Partial<Property> = {
  name: '',
  location: '',
  price: 0,
  propertyType: 'Penthouse',
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  status: 'available',
};

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>(EMPTY_PROPERTY);

  const handleEdit = (p: Property) => {
    setEditTarget(p);
    setFormData({ ...p });
  };

  const handleDelete = (p: Property) => {
    if (window.confirm(`Delete "${p.name}"? This cannot be undone.`)) {
      setProperties((prev) => prev.filter((x) => x.id !== p.id));
    }
  };

  const handleSave = () => {
    if (editTarget) {
      setProperties((prev) =>
        prev.map((p) => (p.id === editTarget.id ? { ...p, ...formData } : p))
      );
      setEditTarget(null);
    } else {
      const newProp: Property = {
        ...MOCK_PROPERTIES[0],
        ...formData,
        id: `prop-${Date.now()}`,
        slug: (formData.name ?? 'new-property').toLowerCase().replace(/\s+/g, '-'),
      } as Property;
      setProperties((prev) => [newProp, ...prev]);
      setIsAdding(false);
    }
    setFormData(EMPTY_PROPERTY);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl text-luxury-primary">Properties</h2>
          <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">{properties.length} total records</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => { setFormData(EMPTY_PROPERTY); setIsAdding(true); }}>
          Add Property
        </Button>
      </div>

      <AdminTable<Property>
        columns={[
          { key: 'name', label: 'Name', render: (p) => <span className="font-serif text-luxury-primary">{p.name}</span> },
          { key: 'location', label: 'Location', render: (p) => <span className="text-luxury-muted">{p.locationData.city}</span> },
          { key: 'propertyType', label: 'Type', render: (p) => <span className="text-luxury-muted capitalize">{p.propertyType}</span>, className: 'hidden md:table-cell' },
          { key: 'price', label: 'Price', render: (p) => <span className="text-luxury-accent">${(p.price / 1_000_000).toFixed(1)}M</span> },
          {
            key: 'status', label: 'Status', render: (p) => (
              <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest ${
                p.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                p.status === 'sold' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>{p.status}</span>
            ),
          },
        ]}
        data={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No properties found."
      />

      {(editTarget || isAdding) && (
        <AdminModal title={editTarget ? `Edit: ${editTarget.name}` : 'Add New Property'} onClose={() => { setEditTarget(null); setIsAdding(false); }}>
          <div className="space-y-4">
            {[
              { key: 'name', label: 'Property Name', type: 'text' },
              { key: 'price', label: 'Price (USD)', type: 'number' },
              { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
              { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
              { key: 'area', label: 'Area (sqft)', type: 'number' },
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
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as Property['status'] }))}
                className="w-full bg-luxury-bg border border-white/10 rounded-lg px-4 py-2 text-xs text-luxury-primary focus:outline-none focus:border-luxury-accent"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
              <Button variant="secondary" size="sm" onClick={() => { setEditTarget(null); setIsAdding(false); }}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
