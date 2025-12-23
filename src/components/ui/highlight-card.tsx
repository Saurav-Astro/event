
"use client";

import { FC, ReactNode } from "react";
import Image from 'next/image';
import { Card } from "@/components/ui/card";

interface HighlightCardProps {
  title: string;
  description: string[];
  imageUrl: string;
  imageAlt: string;
  children: ReactNode;
}

const HighlightCard: FC<HighlightCardProps> = ({ title, description, imageUrl, imageAlt, children }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 md:hover:scale-105 md:hover:-rotate-1 h-full">
      <Card className="text-card-foreground rounded-2xl border-border/50 bg-gradient-to-br from-background via-secondary/10 to-background shadow-2xl relative backdrop-blur-xl overflow-hidden md:hover:border-accent/50 md:hover:shadow-accent/10 h-full flex flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-40 md:group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-30 md:group-hover:opacity-50 transform md:group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-primary/10 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-primary/10 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent transform -skew-x-12 translate-x-full md:group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>
        
        <div className="relative z-10 aspect-video w-full">
            <Image 
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover md:group-hover:scale-110 transition-transform duration-500"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
        </div>


        <div className="p-6 md:p-8 pt-4 relative z-10 flex flex-col items-center text-center flex-grow">
          <h3 className="mb-4 text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent transform md:group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>
          <div className="space-y-1 max-w-sm flex-grow">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-muted-foreground text-sm leading-relaxed transform md:group-hover:text-foreground/80 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="mt-6 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full transform md:group-hover:w-1/2 md:group-hover:h-1 transition-all duration-500"></div>
        </div>
        
        <div className="relative z-10 p-6 pt-0 mt-auto">
            {children}
        </div>

        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-br-3xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-3xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default HighlightCard;
