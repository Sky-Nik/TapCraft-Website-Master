'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/types/product';
import { cn } from '@/lib/utils/formatting';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

function isPlaceholderImage(src: string): boolean {
  // Local paths that don't exist on disk are placeholders
  return src.startsWith('/images/');
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentImage = images[selectedIndex] || images[0];

  if (!images.length) {
    return (
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
        <ImagePlaceholder
          width={800}
          height={800}
          name={productName}
          type="3d"
          className="h-full w-full rounded-none border-0"
        />
      </div>
    );
  }

  const isPlaceholder = isPlaceholderImage(currentImage.src);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
        {isPlaceholder ? (
          <ImagePlaceholder
            width={currentImage.width}
            height={currentImage.height}
            name={productName}
            type="3d"
            className="h-full w-full rounded-none border-0"
          />
        ) : (
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const thumbIsPlaceholder = isPlaceholderImage(image.src);
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer',
                  index === selectedIndex
                    ? 'border-tapcraft-blue ring-2 ring-tapcraft-blue/20'
                    : 'border-gray-200 hover:border-gray-300'
                )}
                aria-label={`View image ${index + 1}`}
              >
                {thumbIsPlaceholder ? (
                  <ImagePlaceholder
                    width={80}
                    height={80}
                    type="3d"
                    className="h-full w-full rounded-none border-0"
                  />
                ) : (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
