
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HardDrive, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <LiquidEffectAnimation />
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4 relative z-10">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl max-w-xl">
                <div className="relative">
                <HardDrive className="h-24 w-24 text-accent/20 mx-auto" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-foreground">404</div>
                </div>
                <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Page Not Found
                </h1>
                <p className="mt-4 max-w-lg text-lg text-muted-foreground mx-auto">
                Oops! The page you were looking for at <code className="p-1 bg-muted/50 rounded-sm text-sm font-mono break-all">{pathname}</code> doesn't exist.
                </p>
                <p className="mt-2 text-muted-foreground">
                It might have been moved, deleted, or maybe it never existed in this timeline.
                </p>
                <Button asChild className="mt-8" size="lg">
                <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Return to Homepage
                </Link>
                </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
