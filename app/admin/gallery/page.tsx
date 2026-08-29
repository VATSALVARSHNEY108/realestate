import { ImageIcon } from 'lucide-react';

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-luxury-primary">Gallery</h2>
        <p className="text-[10px] uppercase tracking-widest text-luxury-muted mt-1">Manage property gallery images</p>
      </div>
      <div className="glass-panel rounded-xl border border-white/5 px-8 py-20 text-center space-y-4">
        <ImageIcon className="w-8 h-8 text-luxury-accent mx-auto opacity-60" />
        <p className="font-serif text-lg text-luxury-primary">Gallery Manager</p>
        <p className="text-luxury-muted text-xs max-w-sm mx-auto">Connect Supabase Storage to upload and manage gallery images. Use the schema migration to create the gallery_images table.</p>
      </div>
    </div>
  );
}
