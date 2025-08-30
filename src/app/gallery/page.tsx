"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { photos } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/i18n"

export default function GalleryPage() {
  const { t } = useLanguage()
  const [selectedImage, setSelectedImage] = React.useState<typeof photos[0] | null>(null)

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center space-y-2 mb-12">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              {t('galleryTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center">
              {t('galleryDescription')}
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/">{t('backToHome')}</Link>
            </Button>
          </div>
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
