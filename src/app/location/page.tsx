import { PixelIcon } from "@/components/pixel-icon";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LocationPage() {
  const address = "The Grand Palace, 123 Celebration Ave, Union City, CA";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-3">
          <PixelIcon icon="pin" className="w-8 h-8 text-primary"/>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            How To Get There
          </h1>
          <PixelIcon icon="pin" className="w-8 h-8 text-primary"/>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We can't wait to see you at The Grand Palace.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <PixelatedCard title="Venue Address">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">The Grand Palace</h3>
              <p className="text-muted-foreground text-lg">123 Celebration Ave</p>
              <p className="text-muted-foreground text-lg">Union City, CA 94587</p>
              <Button asChild size="lg" className="w-full">
                <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </Link>
              </Button>
            </div>
          </PixelatedCard>
        </div>

        <div className="order-1 md:order-2 rounded-lg overflow-hidden border-2 border-foreground shadow-[6px_6px_0px_theme(colors.foreground)]">
          <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src="https://placehold.co/800x600.png"
              alt="Map to The Grand Palace"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              data-ai-hint="map location"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
