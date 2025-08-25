import { CountdownTimer } from "@/components/countdown-timer";
import { PixelIcon } from "@/components/pixel-icon";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
          Liliia & Peter
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Are joyfully tying the knot and they can't wait to celebrate with you!
        </p>
        <div className="relative inline-block">
           <Image 
              src="/DSC05292.jpg"
              alt="Liliia and Peter" 
              width={800} 
              height={400} 
              className="rounded-lg object-cover"
            />
        </div>
      </header>
      {/* AIzaSyBpQVrm_l_HxkIEir_HMs29GZLToi1PXGk google maps api */}
      <section className="my-16 md:my-24">
        <CountdownTimer />
      </section>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <PixelatedCard title="Event Details">
          <ul className="space-y-6">
            <li>
              <div>
                <h3 className="font-semibold text-lg">Date & Time</h3>
                <p className="text-muted-foreground">Saturday, June 6th, 2026</p>
                <p className="text-muted-foreground">Ceremony at 4:00 PM</p>
              </div>
            </li>
            <li>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-muted-foreground">The Grand Palace</p>
                <p className="text-muted-foreground">123 Celebration Ave, Union City, CA</p>
              </div>
            </li>
            <li>
              <div>
                <h3 className="font-semibold text-lg">Dress Code</h3>
                <p className="text-muted-foreground">Formal Attire. Think elegant and festive!</p>
              </div>
            </li>
          </ul>
        </PixelatedCard>

        <PixelatedCard title="See You There?">
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Your presence would be the greatest gift, but if you wish to honor us with a gift, a contribution to our honeymoon fund would be warmly appreciated.
            </p>
            <p className="font-semibold text-lg">
              Kindly RSVP by 'select date'.
            </p>
            <Button asChild size="lg" className="w-full">
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </div>
        </PixelatedCard>
      </section>
    </div>
  );
}
