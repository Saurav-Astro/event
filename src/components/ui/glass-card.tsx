
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const HLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.667 31.69"
    {...props}
  >
    <path d="M0,0 H29.667 V31.69 H0 Z" fill="none" />
    <path d="M4,4 V28 H8 V18 H22 V28 H26 V4 H22 V14 H8 V4z" />
  </svg>
);


export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [style, setStyle] = React.useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth < 768) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setStyle({
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        opacity: 1,
      });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 768) return;
      setStyle({ opacity: 0 });
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("group relative rounded-[20px] bg-gradient-to-br from-secondary/20 to-background/20 shadow-2xl", className)}
        {...props}
      >
        <div 
          className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
          style={{ 
            ...style,
            background: `radial-gradient(400px at var(--mouse-x) var(--mouse-y), hsla(var(--accent) / 0.2), transparent 40%)`,
          }}
        />
        <div className="relative rounded-[20px] bg-gradient-to-br from-secondary/10 to-background/10">
          <div className="absolute inset-2 rounded-[20px] border-b border-l border-primary/20 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm"></div>

           <div className="relative w-full p-6">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
