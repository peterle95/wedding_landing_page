import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/lib/i18n';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'L&P',
  description: 'The wedding website of Liliia & Peter',
  icons: {
    icon: [
      { url: '/icons8-favorite-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: [
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/icons8-favorite-96.png', sizes: '96x96', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons8-favorite-96.png',
        sizes: '96x96',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons8-favorite-48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/icons8-favorite-96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", poppins.className)}>
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}