'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage, ProductMedia } from '@/types/product';
import { cn } from '@/lib/utils/formatting';
import { ImagePlaceholder } from '@/components/shared/ImagePlaceholder';

interface ImageGalleryProps {
  images: ProductImage[];
  media?: ProductMedia[];
  productName: string;
}

function isPlaceholderImage(src: string): boolean {
  return src.startsWith('/images/');
}

function getYouTubeEmbedUrl(embedUrl: string): string {
  // Ensure autoplay is off and controls are shown
  const url = new URL(embedUrl);
  url.searchParams.set('autoplay', '0');
  url.searchParams.set('rel', '0');
  return url.toString();
}

function getVimeoEmbedUrl(embedUrl: string): string {
  const url = new URL(embedUrl);
  url.searchParams.set('autoplay', '0');
  return url.toString();
}

export function ImageGallery({ images, media = [], productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use media if available, otherwise fall back to images as media items
  const items: ProductMedia[] =
    media.length > 0
      ? media
      : images.map((img) => ({ type: 'image' as const, ...img }));

  const currentItem = items[selectedIndex] || items[0];

  if (!items.length) {
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

  return (
    <div className="flex flex-col gap-3">
      {/* Main display */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
        {currentItem.type === 'image' ? (
          isPlaceholderImage(currentItem.src) ? (
            <ImagePlaceholder
              width={currentItem.width}
              height={currentItem.height}
              name={productName}
              type="3d"
              className="h-full w-full rounded-none border-0"
            />
          ) : (
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              width={currentItem.width}
              height={currentItem.height}
              className="h-full w-full object-cover"
              priority
            />
          )
        ) : currentItem.type === 'video' ? (
          <video
            key={currentItem.src}
            controls
            playsInline
            className="h-full w-full object-contain bg-black"
          >
            <source src={currentItem.src} type={currentItem.mimeType} />
            Your browser does not support the video tag.
          </video>
        ) : currentItem.type === 'external_video' ? (
          <iframe
            src={
              currentItem.host === 'youtube'
                ? getYouTubeEmbedUrl(currentItem.embedUrl)
                : getVimeoEmbedUrl(currentItem.embedUrl)
            }
            title={currentItem.alt}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer',
                index === selectedIndex
                  ? 'border-tapcraft-blue ring-2 ring-tapcraft-blue/20'
                  : 'border-gray-200 hover:border-gray-300',
              )}
              aria-label={
                item.type === 'image'
                  ? `View image ${index + 1}`
                  : `Play video ${index + 1}`
              }
            >
              {item.type === 'image' ? (
                isPlaceholderImage(item.src) ? (
                  <ImagePlaceholder
                    width={80}
                    height={80}
                    type="3d"
                    className="h-full w-full rounded-none border-0"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                )
              ) : (
                /* Video thumbnail — play icon overlay */
                <div className="flex h-full w-full items-center justify-center bg-gray-900">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
