'use client';
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const AuroraCanvas = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let time = 0;
        let animationFrameId: number;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const colors = [
            { r: 30, g: 58, b: 138 }, // Deep Blue from theme
            { r: 125, g: 211, b: 252 }, // Electric Blue from theme
            { r: 22, g: 32, b: 79 },
            { r: 15, g: 23, b: 42 }
        ];

        class Orb {
            x: number;
            y: number;
            radius: number;
            color: { r: number; g: number; b: number; };
            vx: number;
            vy: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * (Math.min(canvas.width, canvas.height) / 2) + 100;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
            }

            draw() {
                if (!ctx) return;
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.2)`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -this.radius || this.x > canvas.width + this.radius) {
                    this.vx *= -1;
                }
                if (this.y < -this.radius || this.y > canvas.height + this.radius) {
                    this.vy *= -1;
                }
            }
        }

        let orbs: Orb[] = [];
        for (let i = 0; i < 6; i++) {
            orbs.push(new Orb());
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            orbs.forEach(orb => {
                orb.update();
                orb.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 -z-50", className)}></canvas>;
};

export default AuroraCanvas;
