
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LocationPage() {
  const address = "Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            How To Get There
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We can't wait to see you in Rocca Grimalda.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <PixelatedCard title="Venue Address">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Castello di Rocca Grimalda</h3>
              <p className="text-muted-foreground text-lg">Piazza Senatore Borgatta, 2, 15078 Rocca Grimalda AL, Italia</p>
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
