
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ServerCrash, RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      {isClient && (
        <>
          <LiquidEffectAnimation />
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4 relative z-10">
            <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl">
              <div className="relative">
                <ServerCrash className="h-24 w-24 text-destructive/20 mx-auto" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-foreground">500</div>
              </div>
              <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Application Error
              </h1>
              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Oops! Something went wrong on our end. Please try again in a moment.
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <Button onClick={() => reset()} size="lg" variant="outline">
                  <RotateCw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
