"use client"
import React, { useState } from "react";
import Image from 'next/image';

export interface InfoCardProps {
  image: string;
  title: string;
  description: string;
  borderColor?: string;
  cardBgColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  effectBgColor?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  image,
  title,
  description,
  borderColor = "hsl(var(--primary))",
  cardBgColor = "hsl(var(--card))",
  textColor = "hsl(var(--foreground))",
  hoverTextColor = "hsl(var(--primary-foreground))",
  effectBgColor = "hsl(var(--primary))",
}) => {
  return (
    <div
      className="group relative w-full h-full p-3.5 rounded-2xl"
      style={{
        border: `3px solid transparent`,
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), linear-gradient(to right, ${borderColor}, hsl(var(--secondary)))`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <div
        className="w-full h-full rounded-lg bg-card overflow-hidden flex flex-col"
      >
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between p-4">
          <h1
            className="text-xl font-bold relative overflow-hidden text-foreground md:group-hover:text-primary-foreground transition-colors duration-300"
            style={{ color: textColor }}
          >
            <span
              className="relative z-10"
            >
              {title}
            </span>
            <span
              className="absolute left-0 top-0 h-full w-full z-0 bg-primary transition-transform duration-500 origin-center scale-y-0 md:group-hover:scale-y-100"
              style={{ backgroundColor: effectBgColor }}
            />
          </h1>
          <p
            className="text-sm text-muted-foreground mt-2 line-clamp-3"
            style={{ color: textColor }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
