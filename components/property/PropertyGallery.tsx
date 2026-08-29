'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GalleryImage } from '@/types';
import { ImageWrapper } from '@/components/ui/ImageWrapper';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
}

export function PropertyGallery({ images, title = 'Residence Gallery', className }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isFullscreen]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Gallery Title & Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <Badge variant="gold">Visual Sanctuary</Badge>
          <h3 className="font-serif text-2xl text-luxury-primary mt-1">{title}</h3>
        </div>

        <div className="flex items-center space-x-3 text-xs text-luxury-muted">
          <span>
            Image <strong className="text-luxury-primary">{selectedIndex + 1}</strong> of {images.length}
          </span>
          <Button
            variant="icon"
            icon={<Maximize2 className="w-4 h-4" />}
            title="Open Fullscreen View"
            onClick={() => setIsFullscreen(true)}
          />
        </div>
      </div>

      {/* Main Hero Featured Image Display */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 group p-2">
        <ImageWrapper
          src={activeImage.url}
          alt={activeImage.alt || `${title} Image ${selectedIndex + 1}`}
          aspectRatio="video"
          priority={selectedIndex === 0}
          className="rounded-xl h-[400px] sm:h-[550px] w-full"
        />

        {/* Previous / Next Arrow Controls Overlay */}
        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
          <Button
            variant="icon"
            icon={<ChevronLeft className="w-5 h-5" />}
            title="Previous Image (Left Arrow)"
            onClick={handlePrev}
            className="pointer-events-auto bg-luxury-bg/70 hover:bg-luxury-accent/20 border-white/10 backdrop-blur-md"
          />
          <Button
            variant="icon"
            icon={<ChevronRight className="w-5 h-5" />}
            title="Next Image (Right Arrow)"
            onClick={handleNext}
            className="pointer-events-auto bg-luxury-bg/70 hover:bg-luxury-accent/20 border-white/10 backdrop-blur-md"
          />
        </div>

        {/* Image Caption Overlay */}
        {activeImage.alt && (
          <div className="absolute bottom-6 left-6 right-6 glass-card p-3 rounded-xl border border-white/10 text-xs text-luxury-muted font-light">
            {activeImage.alt}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation Strip */}
      {images.length > 1 && (
        <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  'relative flex-shrink-0 w-28 sm:w-36 h-20 rounded-xl overflow-hidden border transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-luxury-accent',
                  isSelected
                    ? 'border-luxury-accent ring-2 ring-luxury-accent/30 scale-105 opacity-100'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                )}
              >
                <ImageWrapper
                  src={img.url}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  aspectRatio="video"
                  className="w-full h-full"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Overlay Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-luxury-bg/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-medium">{title}</p>
              <p className="font-serif text-lg text-luxury-primary">{activeImage.alt}</p>
            </div>
            <Button
              variant="icon"
              icon={<X className="w-5 h-5" />}
              title="Close Fullscreen View (Esc)"
              onClick={() => setIsFullscreen(false)}
            />
          </div>

          <div className="relative flex-1 flex items-center justify-center my-6">
            <ImageWrapper
              src={activeImage.url}
              alt={activeImage.alt || 'Fullscreen View'}
              aspectRatio="auto"
              className="max-h-[75vh] w-auto rounded-xl object-contain"
            />

            <div className="absolute inset-x-0 flex items-center justify-between px-4">
              <Button
                variant="icon"
                icon={<ChevronLeft className="w-6 h-6" />}
                onClick={handlePrev}
                className="bg-luxury-bg/80 border-white/10 p-4"
              />
              <Button
                variant="icon"
                icon={<ChevronRight className="w-6 h-6" />}
                onClick={handleNext}
                className="bg-luxury-bg/80 border-white/10 p-4"
              />
            </div>
          </div>

          <div className="text-center text-xs text-luxury-muted tracking-widest uppercase border-t border-white/10 pt-4">
            Image {selectedIndex + 1} of {images.length} · Use Left / Right Arrow Keys to Navigate
          </div>
        </div>
      )}
    </div>
  );
}
