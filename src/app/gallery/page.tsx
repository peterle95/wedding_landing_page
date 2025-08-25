"use client"

import * as React from "react"
import Image from "next/image"

import { photos } from "@/lib/constants"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { PixelIcon } from "@/components/pixel-icon"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = React.useState<typeof photos[0] | null>(null)

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-3">
            <PixelIcon icon="gallery" className="w-8 h-8 text-primary"/>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              Our Moments
            </h1>
            <PixelIcon icon="gallery" className="w-8 h-8 text-primary"/>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of memories leading up to our special day.
          </p>
        </header>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-lg cursor-pointer block relative group"
              onClick={() => setSelectedImage(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                data-ai-hint={photo.hint}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <PixelIcon icon="heart" className="w-12 h-12 text-white/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2 sm:p-4 bg-transparent border-none shadow-none">
          {selectedImage && (
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={900}
              data-ai-hint={selectedImage.hint}
              className="w-full h-auto object-contain rounded-lg border-4 border-background shadow-2xl"
              style={{ imageRendering: 'pixelated' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
