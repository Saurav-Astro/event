"use client";

import React, { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Floating3DCardProps {
  children: ReactNode;
  className?: string;
}

export const Floating3DCard: React.FC<Floating3DCardProps> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / height) * 15;
    const rotateY = ((x - width / 2) / width) * -15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className="w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
            "group relative w-full rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 ease-out hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/20",
            className
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div style={{ transform: "translateZ(20px)" }}>
            {children}
        </div>
      </div>
    </div>
  );
};