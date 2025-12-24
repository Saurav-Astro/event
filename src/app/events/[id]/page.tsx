import { notFound } from 'next/navigation';
import Image from 'next/image';
import { events } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Award, Scale, Users, Trophy } from 'lucide-react';
// Registration form temporarily disabled; Google Form link coming soon
import { cn } from '@/lib/utils';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
    return events.map((event) => ({
      id: event.id,
    }));
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === event.image);

  const hasDetails = event.details.rules || event.details.prizes || event.details.judgingCriteria;
  const hasSpeakers = event.details.speakers && event.details.speakers.length > 0;

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {image && (
            <Image
              src={image.imageUrl}
              alt={event.title}
              width={800}
              height={600}
              className="rounded-xl shadow-lg mb-8 object-cover w-full aspect-[4/3]"
              data-ai-hint={image.imageHint}
            />
          )}
          <Badge variant={event.type === 'Hackathon' ? 'default' : 'secondary'} className="text-sm px-3 py-1 mb-4">{event.type}</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">{event.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{event.description}</p>
          <div className="space-y-3 text-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-accent" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-accent" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          {(hasDetails || hasSpeakers) && (
            <Tabs defaultValue={hasDetails ? 'details' : (hasSpeakers ? 'speakers' : '')} className="w-full">
              <TabsList className={cn("grid w-full", (hasDetails && hasSpeakers) ? 'grid-cols-2' : 'grid-cols-1')}>
                {hasDetails && <TabsTrigger value="details">Details</TabsTrigger>}
                {hasSpeakers && <TabsTrigger value="speakers">Schedule</TabsTrigger>}
              </TabsList>
              
              {hasDetails && (
                <TabsContent value="details">
                  <div className="space-y-6 mt-4">
                    {event.details.rules && (
                      <DetailSection icon={<Scale />} title="Rules">
                        <ul className="list-disc list-inside space-y-2">
                          {event.details.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                        </ul>
                      </DetailSection>
                    )}
                    {event.details.prizes && (
                      <DetailSection icon={<Trophy />} title="Prizes">
                        <ul className="list-disc list-inside space-y-2">
                          {event.details.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
                        </ul>
                      </DetailSection>
                    )}
                    {event.details.judgingCriteria && (
                      <DetailSection icon={<Award />} title="Judging Criteria">
                        <ul className="list-disc list-inside space-y-2">
                          {event.details.judgingCriteria.map((criterion, i) => <li key={i}>{criterion}</li>)}
                        </ul>
                      </DetailSection>
                    )}
                  </div>
                </TabsContent>
              )}

              {hasSpeakers && (
                <TabsContent value="speakers">
                   <div className="space-y-6 mt-4">
                     <DetailSection icon={<Users />} title="Speakers & Topics">
                        <ul className="space-y-4">
                          {event.details.speakers?.map((speaker, i) => (
                            <li key={i} className="p-4 bg-card-foreground/5 rounded-lg">
                               <p className="font-semibold">{speaker.topic}</p>
                               <p className="text-sm text-muted-foreground">By {speaker.name}</p>
                               <Badge variant="outline" className="mt-2">{speaker.skillLevel}</Badge>
                            </li>
                          ))}
                        </ul>
                      </DetailSection>
                   </div>
                </TabsContent>
              )}
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailSection = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div>
    <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
      {icon}
      {title}
    </h3>
    <div className="text-muted-foreground pl-8">
      {children}
    </div>
  </div>
);
