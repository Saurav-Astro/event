import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import AuroraCanvas from '@/components/ui/ambient-aurora';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';
import { BackgroundAudio } from '@/components/background-audio';

export const metadata: Metadata = {
  title: 'Spectrum 2026 - College Tech Fest',
  description: 'The official hub for our annual college tech fest, featuring hackathons, workshops, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col bg-background")}>
        <CursorSpotlight />
        <AuroraCanvas />
        <BackgroundAudio />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
