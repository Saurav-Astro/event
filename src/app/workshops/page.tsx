
import { workshops } from '@/lib/data';
import CardFlip from '@/components/ui/flip-card';
import Link from 'next/link';

export default function WorkshopsPage() {

  const videoMap: { [key: string]: string } = {
    'gen-ai-workshop': 'https://media.istockphoto.com/id/1707385922/video/futuristic-cyber-technology-innovation-artificial-intelligence-concept-brain-over-the-circuit.mp4?s=mp4-640x640-is&k=20&c=ZccqFGAOMCfEWliPSf7z4lDFEYp3U2w4KvUOz2NbWYY=',
    'iot-workshop': 'https://cdn.pixabay.com/video/2017/03/06/8197-207209259_large.mp4',
    'cybersecurity-workshop': 'https://media.istockphoto.com/id/1543131173/video/man-using-laptop-computer-accessing-applications-or-login-internet-network-to-conduct.mp4?s=mp4-640x640-is&k=20&c=g-iC9cogVuCFRVJ2sYHPfq0g2hhJTCGyOpbYBLHs1Mc=',
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-accent">Workshops & Tech Talks</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          Level up your skills with our industry-led workshops.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {workshops.map((workshop) => {
          const features = [
            `Duration: ${workshop.details.duration}`,
            `Requirement: ${workshop.details.requirement}`,
          ];
          if (workshop.details.speakers) {
            features.push(`Speaker: ${workshop.details.speakers[0].name}`);
            features.push(`Skill Level: ${workshop.details.speakers[0].skillLevel}`);
          }
          const videoUrl = videoMap[workshop.id];

          return (
            <Link key={workshop.id} href={`/events/${workshop.id}`} className="flex justify-center">
              <div className="w-full max-w-[300px]">
                <CardFlip
                  title={workshop.title}
                  subtitle={workshop.description}
                  description={workshop.details.speakers ? workshop.details.speakers[0].topic : workshop.description}
                  features={features}
                  videoUrl={videoUrl}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
