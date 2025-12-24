
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, PlayCircle, Trophy, Code, Bot, CircuitBoard, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { NeonOrbs } from '@/components/ui/neon-orbs';
import { events, sponsors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import HighlightCard from '@/components/ui/highlight-card';
import { Marquee } from '@/components/ui/marquee';

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date("2026-03-15T00:00:00") - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // set initial value
    setTimeLeft(calculateTimeLeft());


    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="flex justify-center gap-4 md:gap-8 my-4">
        {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold">--</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{interval}</span>
          </div>
        ))}
      </div>
    );
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-3xl md:text-4xl font-bold">
          {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8 my-4">
      {timerComponents.length ? timerComponents : <span>Event has started!</span>}
    </div>
  );
}


function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const title = "Spectrum 2026";
  const tagline = "Innovate. Integrate. Ignite.";

  return (
    <section className="relative w-full h-[calc(100vh-89px)] flex items-center justify-center text-center overflow-hidden">
      <NeonOrbs className="absolute inset-0 -z-10" />
      <div className="relative z-10 container px-4 md:px-6">
        <div className="grid gap-6">
          <h1
            className={`text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wider mb-4 transition-all duration-1000 ease-out ${
              mounted 
                ? "opacity-100 translate-y-0 blur-0" 
                : "opacity-0 translate-y-8 blur-sm"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {title}
          </h1>

          <p
            className={`mx-auto max-w-[700px] text-lg md:text-xl font-light text-foreground/80 transition-all duration-1000 ease-out ${
              mounted 
                ? "opacity-100 translate-y-0 blur-0" 
                : "opacity-0 translate-y-4 blur-sm"
            }`}
            style={{ transitionDelay: "1500ms" }}
          >
            {tagline}
          </p>
           <div 
            className={`transition-opacity duration-1000 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: "1800ms" }}
          >
            <p className="text-foreground/80 text-lg">15th - 17th March, 2026</p>
          </div>
          
           <div 
            className={`transition-opacity duration-1000 ease-out ${mounted ? 'opacity.tsx-100' : 'opacity.tsx-0'}`}
            style={{ transitionDelay: "2000ms" }}
          >
            <Countdown />
          </div>

          <div 
            className={`flex flex-col gap-4 min-[400px]:flex-row justify-center transition-opacity duration-1000 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: "2200ms" }}
          >
            <Button asChild size="lg">
              <Link href="/">
                Register Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const videoUrl = "https://media.istockphoto.com/id/2154818826/video/hyperlapse-top-view-smart-city-wireless-network-signal-data-transmission-high-speed-and.mp4?s=mp4-640x640-is&k=20&c=hqKNZO9iLt1SOkl2DRT39IT7RcPyLYDASITuFW_AjdI=";

    return (
        <section id="about" className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">A Legacy of Innovation.</h2>
                        <p className="text-foreground/80 md:text-xl/relaxed">
                          Spectrum 2026 is more than just a fest; it’s a movement. With over 10,000+ footfalls last year, we are back with bigger arenas, faster code, and smarter solutions. Whether you're a roboticist, a full-stack dev, or a research enthusiast, Spectrum provides the platform to turn your "What if?" into "It’s here."
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-lg overflow-hidden group">
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            onPause={() => setIsPlaying(false)}
                            onPlay={() => setIsPlaying(true)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
  const featuredEvents = events.slice(0, 3);
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Robotics': return <CircuitBoard className="w-8 h-8 text-white" />;
      case 'Coding': return <Code className="w-8 h-8 text-white" />;
      case 'CTF': return <ShieldCheck className="w-8 h-8 text-white" />;
      case 'Hackathon': return <Bot className="w-8 h-8 text-white" />;
      default: return <Trophy className="w-8 h-8 text-white" />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />

      <section id="events" className="py-12 md:py-24 lg:py-32 bg-background/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Main Events</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
                From competitive hackathons to hands-on workshops, find your next challenge and learning opportunity right here on campus.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {featuredEvents.map((event) => {
                const image = PlaceHolderImages.find(img => img.id === event.image);
                return (
                  <Link key={event.id} href={`/events/${event.id}`} className="block h-full">
                    <HighlightCard
                        title={event.title}
                        description={[event.description]}
                        imageUrl={image?.imageUrl || ''}
                        imageAlt={image?.description || event.title}
                    >
                        <div className="grid gap-4 text-left">
                            <div className="flex justify-between items-center">
                                <Badge variant={event.type === 'Hackathon' ? 'default' : 'secondary'} className="w-fit">{event.type}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                            </div>
                            <Button asChild className="mt-4 w-full">
                            <span>View Details <ArrowRight className="ml-2 h-4 w-4" /></span>
                            </Button>
                        </div>
                    </HighlightCard>
                  </Link>
                );
            })}
          </div>
        </div>
      </section>

      <section id="sponsors" className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Sponsors</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed">
                We're grateful to our sponsors for supporting student innovation.
              </p>
            </div>
          </div>
          <Marquee pauseOnHover speed={60}>
            {[...sponsors, ...sponsors].map((sponsor, index) => {
               const logo = PlaceHolderImages.find(img => img.id === sponsor.logo);
               return (
                <div key={`${sponsor.id}-${index}`} className="relative mx-6 h-24 w-48 sm:h-28 sm:w-56 md:h-32 md:w-64">
                  {logo && (
                    <Link href={sponsor.website} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
                      <Image
                        src={logo.imageUrl}
                        alt={sponsor.name}
                        fill
                        className="object-contain filter grayscale transition-all duration-300 hover:filter-none"
                        data-ai-hint={logo.imageHint}
                      />
                    </Link>
                  )}
                </div>
               );
            })}
          </Marquee>
        </div>
      </section>
    </div>
  );
}
