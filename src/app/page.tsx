"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { CountdownTimer } from "@/components/countdown-timer";
import { PixelatedCard } from "@/components/ui/pixelated-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const scrollTarget = searchParams.get('scroll');
    if (scrollTarget === 'faqs') {
      // Remove query param from URL
      router.replace('/', { scroll: false });

      // Wait 500ms then scroll to FAQs
      const element = document.getElementById('faqs');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [searchParams, router]);

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
                <h3 className="font-semibold text-lg">{t('dressCode')}</h3>
                <p className="text-muted-foreground">{t('dressCodeDescription')}</p>
              </div>
            </li>
          </ul>
        </PixelatedCard>

        <PixelatedCard title={t('seeYouThere')}>
          <div className="space-y-6 text-center">
            <p className="text-muted-foreground">
              {t('giftMessage')}
            </p>

            {/* Payment Options Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bank Transfer Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-5 border border-purple-200/50 dark:border-purple-800/30 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300">{t('bankTransferTitle')}</h3>
                </div>
                <div className="space-y-3 text-left">
                  <div className="bg-white/70 dark:bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t('accountName')}</p>
                    <p className="font-medium text-foreground">Peter & Liliia</p>
                  </div>
                  <div className="bg-white/70 dark:bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{t('ibanLabel')}</p>
                    <p className="font-mono text-sm font-medium text-foreground tracking-wider">BE84 9741 0355 2159</p>
                  </div>
                </div>
              </div>

              {/* PayPal Section */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-5 border border-blue-200/50 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                    <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
                    <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                    <path d="M16 11h.01" />
                  </svg>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300">{t('paypalTitle')}</h3>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Image
                    src="/paypalqr.jpg"
                    alt="PayPal QR Code"
                    width={140}
                    height={140}
                    className="rounded-lg object-cover shadow-sm"
                  />
                  <a
                    href="https://www.paypal.me/petermolzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-colors shadow-sm hover:shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                    PayPal.me
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="font-semibold text-lg mb-4">
                {t('rsvpByDate')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/rsvp">{t('rsvpButton')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1">
                  <Link href="/?scroll=faqs">{t('faqsButton')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </PixelatedCard>
      </section>

      <section id="faqs" className="my-16 md:my-24 scroll-mt-20">
        <PixelatedCard title={t('faqsTitle')}>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion1')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer1')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion2')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer2')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion3')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer3')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion4')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer4')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion5')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer5')}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{t('faqQuestion6')}</h3>
              <p className="text-muted-foreground">{t('faqAnswer6')}</p>
            </div>
          </div>
        </PixelatedCard>
      </section>
    </div>
  );
}
