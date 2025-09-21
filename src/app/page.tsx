"use client";

import { CountdownTimer } from "@/components/countdown-timer";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
          {t('weddingTitle')}
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          {t('weddingSubtitle')}
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
      {/* AIzaSyBpQVrm_l_HxkIEir_HMs29GZLToi1PXGk google maps api test*/}
      <section className="my-16 md:my-24">
        <CountdownTimer />
      </section>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <PixelatedCard title={t('eventDetails')}>
          <ul className="space-y-6">
            <li>
              <div>
                <h3 className="font-semibold text-lg">{t('dateTime')}</h3>
                <p className="text-muted-foreground">{t('eventDate')}</p>
                <p className="text-muted-foreground">{t('ceremonyTime')}</p>
              </div>
            </li>
            <li>
              <div>
                <h3 className="font-semibold text-lg">{t('locationTitle')}</h3>
                <p className="text-muted-foreground">{t('venueName')}</p>
                <p className="text-muted-foreground">{t('Address')}</p>
              </div>
            </li>
            <li>
              <div>
                <h3 className="font-semibold text-lg">Dress Code</h3>
                <p className="text-muted-foreground">"Add description here"</p>
              </div>
            </li>
          </ul>
        </PixelatedCard>

        <PixelatedCard title={t('seeYouThere')}>
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
            {t('giftMessage')}            </p>
            <p className="font-semibold text-lg">
            {t('rsvpByDate')}
            </p>
            <Button asChild size="lg" className="w-full">
              <Link href="/rsvp">{t('rsvpButton')}</Link>
            </Button>
          </div>
        </PixelatedCard>
      </section>
    </div>
  );
}
