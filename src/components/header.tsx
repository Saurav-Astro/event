"use client";

import React from 'react';
import Link from 'next/link';
import { Grid2x2Plus, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetTitle } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/workshops", label: "Workshops" },
  { href: "/schedule", label: "Schedule" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

	return (
		<header
			className={cn(
				'sticky top-0 z-50',
				'w-full',
        'px-4 md:px-6'
			)}
		>
      <div
        className={cn(
          'w-full max-w-6xl mx-auto rounded-none md:rounded-lg border-b md:border shadow mt-0 md:mt-5',
          'bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg'
        )}
      >
        <nav className="flex items-center justify-between p-1.5">
          <Link href="/" className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
            <Grid2x2Plus className="size-5 text-accent" />
            <p className="font-mono text-base font-bold">IGNITE 2026</p>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  "transition-colors hover:text-foreground/80",
                  (pathname === link.href || (link.href.startsWith('/#') && pathname === '/')) ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <Link href="/events">Register Now</Link>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen(!open)}
                className="lg:hidden"
              >
                <Menu className="size-4" />
              </Button>
              <SheetContent
                className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
                showClose={false}
                side="left"
              >
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      className={cn(buttonVariants({
                        variant: 'ghost',
                        className: 'justify-start',
                      }),
                      (pathname === link.href || (link.href.startsWith('/#') && pathname === '/')) ? "text-foreground bg-accent/50" : "text-foreground/60"
                      )}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <SheetFooter>
                  <Button variant="outline">Sign In</Button>
                  <Button>Get Started</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
		</header>
	);
}
