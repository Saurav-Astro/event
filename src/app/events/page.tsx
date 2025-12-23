'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Cpu, Globe, GitBranch, HeartPulse, Clock, ToyBrick, Tv, UserCheck, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import HighlightCard from '@/components/ui/highlight-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GlassCard from '@/components/ui/glass-card';

const hackathon = events.find(event => event.id === 'codequest-hackathon');
const otherEvents = events.filter(event => event.id !== 'codequest-hackathon');


export default function EventsPage() {

  const trackIcons: { [key: string]: React.ReactNode } = {
      'AI/ML': <Cpu className="h-6 w-6 text-accent" />,
      'Web3': <GitBranch className="h-6 w-6 text-accent" />,
      'FinTech': <Globe className="h-6 w-6 text-accent" />,
      'HealthTech': <HeartPulse className="h-6 w-6 text-accent" />
  }

  const image = hackathon ? PlaceHolderImages.find(img => img.id === hackathon.image) : undefined;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {hackathon && (
        <section id="hackathon" className='mb-24'>
           <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-accent">{hackathon.title}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              36 Hours of Non-Stop Innovation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-10">
                <Card>
                    <CardHeader>
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={800}
                                height={450}
                                className="rounded-lg object-cover aspect-video"
                                data-ai-hint={image.imageHint}
                            />
                        )}
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-4">Problem Tracks</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {hackathon.details.tracks?.map(track => (
                                <div key={track.title} className="p-4 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        {trackIcons[track.title]}
                                        <h3 className="font-semibold text-lg">{track.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{track.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
              <GlassCard>
                <CardHeader className="p-0 mb-4">
                    <CardTitle>Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="space-y-4">
                        {hackathon.details.timeline?.map(item => (
                            <li key={item.event} className="flex items-start gap-4">
                                <Clock className="h-5 w-5 mt-1 text-accent flex-shrink-0"/>
                                <div>
                                    <p className="font-semibold">{item.event}</p>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
              </GlassCard>
               <GlassCard>
                <CardHeader className="p-0 mb-4">
                    <CardTitle>Perks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <li className="flex items-center gap-2 text-sm sm:text-base"><ToyBrick className="h-5 w-5 text-accent flex-shrink-0"/> 24/7 Energy Drinks</li>
                        <li className="flex items-center gap-2 text-sm sm:text-base"><Tv className="h-5 w-5 text-accent flex-shrink-0"/> Sleeping Pods</li>
                        <li className="flex items-center gap-2 text-sm sm:text-base"><UserCheck className="h-5 w-5 text-accent flex-shrink-0"/> On-site Mentors</li>
                        <li className="flex items-center gap-2 text-sm sm:text-base"><Shirt className="h-5 w-5 text-accent flex-shrink-0"/> Custom T-shirts</li>
                    </ul>
                </CardContent>
               </GlassCard>
                 <Button size="lg" className="w-full" asChild>
                    <Link href={`/events/${hackathon.id}`}>Register for CodeQuest</Link>
                </Button>
            </div>
          </div>
        </section>
      )}

      <section id="more-events">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">More Events</h2>
            <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed mt-4">
                Explore other exciting events, workshops, and competitions.
            </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherEvents.map((event) => {
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
      </section>
    </div>
  );
}
