
'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap, Clock, Laptop, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';
import { Button } from './button';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  videoUrl?: string;
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  videoUrl,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animatedStyles, setAnimatedStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    setAnimatedStyles(
      Array.from({ length: 6 }).map((_, i) => ({
        width: `${60 + Math.random() * 40}%`,
        animationDelay: `${i * 0.2}s`,
        marginLeft: `${Math.random() * 20}%`,
      }))
    );
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      // No flip on mobile, it's a simple card now
    }
  };

  if (isMobile) {
    return (
      <Card className="w-full max-w-[300px] h-full flex flex-col">
        {videoUrl && (
          <div className="relative h-40 w-full">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover rounded-t-lg"
            />
             <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
          <div className="space-y-2.5 mb-4">
            {features.map((feature, index) => {
              const icons = [Clock, Laptop, User, Zap];
              const IconComponent = icons[index % icons.length];

              return (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <div className="bg-primary/10 dark:bg-primary/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                    <IconComponent className="text-primary h-3 w-3" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              );
            })}
          </div>
          <Button className="w-full mt-auto">
            Register <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      className="group relative h-[360px] w-full max-w-[300px] [perspective:2000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped
            ? '[transform:rotateY(180deg)]'
            : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-gradient-to-br from-card via-secondary/10 to-card',
            'border border-border/50',
            'shadow-lg dark:shadow-xl',
            'transition-all duration-700',
            'md:group-hover:shadow-xl dark:md:group-hover:shadow-2xl',
            'md:group-hover:border-accent/50',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient effect */}
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 bg-gradient-to-br via-transparent to-accent/5 dark:to-accent/10" />

          {videoUrl ? (
             <div className="absolute inset-0 h-full w-full">
                <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pt-20">
              <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
                {/* Code blocks animation */}
                {animatedStyles.length > 0 && [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-3 w-full rounded-sm',
                      'from-primary/20 via-primary/30 to-primary/20 bg-gradient-to-r',
                      'animate-[slideIn_2s_ease-in-out_infinite]',
                      'opacity-0',
                    )}
                    style={animatedStyles[i]}
                  />
                ))}

                {/* Central rocket icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-xl',
                      'from-primary via-primary/90 to-accent/80 bg-gradient-to-br',
                      'flex items-center justify-center',
                      'shadow-primary/25 shadow-lg',
                      'animate-pulse',
                      'transition-all duration-500 md:group-hover:scale-110 md:group-hover:rotate-12',
                    )}
                  >
                    <Rocket className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Bottom content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-foreground transition-all duration-500 ease-out md:group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-muted-foreground transition-all delay-50 duration-500 ease-out md:group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-8px] rounded-lg transition-opacity duration-300',
                    'from-accent/20 via-accent/10 bg-gradient-to-br to-transparent',
                    'opacity-0 md:group-hover/icon:opacity-100',
                  )}
                />
                <Zap className="text-accent relative z-10 h-5 w-5 transition-all duration-300 md:group-hover/icon:scale-110 md:group-hover/icon:rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'bg-gradient-to-br from-card via-secondary/10 to-card',
            'border border-border',
            'shadow-lg dark:shadow-xl',
            'flex flex-col',
            'transition-all duration-700',
            'md:group-hover:shadow-xl dark:md:group-hover:shadow-2xl',
            'md:group-hover:border-accent/50',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Background gradient */}
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-accent/5 dark:to-accent/10" />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="from-primary via-primary/90 to-accent/80 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                  <Code2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-foreground transition-all duration-500 ease-out md:group-hover:translate-y-[-2px]">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-2 text-sm tracking-tight text-muted-foreground transition-all duration-500 ease-out md:group-hover:translate-y-[-2px]">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const icons = [Clock, Laptop, User, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-foreground/80 transition-all duration-500"
                    style={{
                      transform: isFlipped
                        ? 'translateX(0)'
                        : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="bg-primary/10 dark:bg-primary/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md">
                      <IconComponent className="text-primary h-3 w-3" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-border pt-4">
            <div
              className={cn(
                'group/start relative',
                'flex items-center justify-between',
                'rounded-lg p-2.5',
                'transition-all duration-300',
                'bg-gradient-to-r from-secondary/30 via-secondary/20 to-secondary/30',
                'md:hover:from-accent/10 md:hover:via-accent/5 md:hover:to-transparent',
                'md:hover:scale-[1.02] md:hover:cursor-pointer',
                'md:hover:border-accent/20 border border-transparent',
              )}
            >
              <span className="md:group-hover/start:text-accent text-sm font-semibold text-foreground transition-colors duration-300">
                Register
              </span>
              <div className="group/icon relative">
                <div
                  className={cn(
                    'absolute inset-[-6px] rounded-lg transition-all duration-300',
                    'from-accent/20 via-accent/10 bg-gradient-to-br to-transparent',
                    'scale-90 opacity-0 md:group-hover/start:scale-100 md:group-hover/start:opacity-100',
                  )}
                />
                <ArrowRight className="text-accent relative z-10 h-4 w-4 transition-all duration-300 md:group-hover/start:translate-x-1 md:group-hover/start:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          50% {
            transform: translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
