
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { sponsors } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function SponsorsPage() {
  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const inKindSponsors = sponsors.filter(s => s.tier === 'In-Kind');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const SponsorImage = ({ sponsor, width, height }: { sponsor: typeof sponsors[0], width: number, height: number }) => {
    const logo = PlaceHolderImages.find(img => img.id === sponsor.logo);
    if (!logo) return null;

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link href={sponsor.website} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
          <Image
            src={logo.imageUrl}
            alt={sponsor.name}
            width={width}
            height={height}
            className="object-contain w-full h-auto"
            data-ai-hint={logo.imageHint}
          />
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-accent">Our Sponsors</h1>
        <p className="mt-6 text-lg leading-8 text-foreground max-w-3xl mx-auto">
          We're grateful for the companies supporting student innovation at our college.
        </p>
      </div>
      
      <div className="space-y-16">
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Platinum Sponsor</h2>
          <motion.div
            className="flex justify-center flex-wrap gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {platinumSponsors.map((sponsor) => (
              <div key={sponsor.id} className="p-4 sm:p-8 rounded-lg transition-all duration-300 w-full max-w-sm md:max-w-md">
                <SponsorImage sponsor={sponsor} width={500} height={250} />
              </div>
            ))}
          </motion.div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Gold Sponsors</h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {goldSponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex justify-center p-4 rounded-lg transition-all duration-300">
                <SponsorImage sponsor={sponsor} width={300} height={150} />
              </div>
            ))}
          </motion.div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">In-Kind Partners</h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 items-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {inKindSponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex justify-center p-4 rounded-lg transition-all duration-300">
                <SponsorImage sponsor={sponsor} width={250} height={120} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

       <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold">Partner with us</h3>
          <p className="text-muted-foreground mt-2 mb-4">Reach 5,000+ engineers and the brightest minds.</p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Sponsorship Brochure
          </Button>
        </div>
    </div>
  );
}
