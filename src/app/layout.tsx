import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'L&P Forever',
  description: 'The wedding website of Liliia & Peter',
  icons: {
    icon: [
      { url: '/icons8-favorite-48.png' },
    ],
    apple: [
      { url: '/icons8-favorite-96.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons8-favorite-96.png',
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
      <body className={cn("min-h-screen bg-background font-body antialiased", poppins.className)}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}