'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

// List your audio files here (relative to /public/audio/)
const audioTracks = [
  '/audio/Fall Out Boy Centuries Lyrics.mp3',
  '/audio/Maroon 5 - Animals (Lyrics).mp3',
  '/audio/MrKitty After Dark Lyrics.mp3',
  '/audio/Queen - We Will Rock You [Lyrics].mp3',
];

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Start muted to satisfy browser autoplay policies
  const readConsent = () => {
    if (typeof document === 'undefined') return false;
    const match = document.cookie.match(/(?:^|; )audioConsent=([^;]*)/);
    return match ? decodeURIComponent(match[1]) === 'true' : false;
  };
  const initialConsented = readConsent();
  // Read initial mute preference from cookie if present
  const readCookieValue = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  };
  const initialMutedCookie = readCookieValue('audioMuted');
  const [isMuted, setIsMuted] = useState(initialMutedCookie !== null ? initialMutedCookie === 'true' : !initialConsented);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string>('');
  const [requiresInteraction, setRequiresInteraction] = useState(false);
  const [consented, setConsented] = useState(initialConsented);
  const [showConsent, setShowConsent] = useState(!initialConsented);
  const retryTimerRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const fadeFrameRef = useRef<number | null>(null);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // Cookie helpers
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  };
  const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60; // seconds
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  };

  useEffect(() => {
    // Select a random track on mount, avoiding repeating the last one if possible
    const last = getCookie('audioLastTrack');
    let next = audioTracks[Math.floor(Math.random() * audioTracks.length)];
    if (audioTracks.length > 1 && last && audioTracks.includes(last)) {
      let safety = 0;
      while (next === last && safety < 10) {
        next = audioTracks[Math.floor(Math.random() * audioTracks.length)];
        safety += 1;
      }
    }
    setCurrentTrack(next);
    // Restore consent preference from cookie
    const cookie = getCookie('audioConsent');
    if (cookie === 'true') {
      setConsented(true);
      // Use saved mute state if present, else unmute
      const savedMuted = getCookie('audioMuted');
      setIsMuted(savedMuted !== null ? savedMuted === 'true' : false);
      setShowConsent(false);
    }
  }, []);

  // Persist last track when it changes
  useEffect(() => {
    if (currentTrack) setCookie('audioLastTrack', currentTrack);
  }, [currentTrack]);

  // Helper: smooth fade-in
  const fadeInAudio = (durationMs = 1200) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    try { audio.muted = false; } catch {}
    let start: number | null = null;
    const startVol = 0;
    const target = 1.0;
    audio.volume = startVol;
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / durationMs);
      audio.volume = startVol + (target - startVol) * progress;
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = target;
        fadeFrameRef.current = null;
      }
    };
    fadeFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    const audio = audioRef.current;
    // ensure muted before attempting autoplay if consent not yet given
    audio.muted = !consented ? true : isMuted;
    audio.volume = 1.0;
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // If consented, try to unmute shortly after playback starts
        if (consented) {
          window.setTimeout(() => {
            if (!audioRef.current) return;
            if (!isMuted) {
              fadeInAudio(1200);
            } else {
              audioRef.current.muted = true;
            }
          }, 250);
        }
      } catch (error) {
        // Autoplay blocked by policy until user interacts
        if (!consented) {
          setRequiresInteraction(true);
        } else {
          // Silent retry loop when consented: avoid showing any prompt
          if (retryTimerRef.current == null && retryCountRef.current < 6) {
            retryTimerRef.current = window.setInterval(async () => {
              if (!audioRef.current) return;
              try {
                await audioRef.current.play();
                setIsPlaying(true);
                if (!isMuted) {
                  fadeInAudio(1200);
                }
                if (retryTimerRef.current) {
                  window.clearInterval(retryTimerRef.current);
                  retryTimerRef.current = null;
                }
              } catch {
                retryCountRef.current += 1;
                if (retryCountRef.current >= 6 && retryTimerRef.current) {
                  window.clearInterval(retryTimerRef.current);
                  retryTimerRef.current = null;
                }
              }
            }, 1500) as unknown as number;
          }
        }
      }
    };

    playAudio();

    // Enable unmute on first user interaction if needed
    const onUserInteract = async () => {
      if (!audioRef.current) return;
      try {
        audioRef.current.muted = false;
        setIsMuted(false);
        setConsented(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setRequiresInteraction(false);
        window.removeEventListener('pointerdown', onUserInteract);
        window.removeEventListener('keydown', onUserInteract);
        setCookie('audioConsent', 'true');
      } catch {
        // ignore, user can use the toggle
      }
    };
    if (requiresInteraction) {
      window.addEventListener('pointerdown', onUserInteract, { once: true });
      window.addEventListener('keydown', onUserInteract, { once: true });
    }

    return () => {
      window.removeEventListener('pointerdown', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
      audio.pause();
      if (retryTimerRef.current) {
        window.clearInterval(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [currentTrack, requiresInteraction, consented, isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setCookie('audioMuted', (!isMuted).toString());
      if (!audioRef.current.muted && audioRef.current.paused) {
        // attempt to play when unmuting
        audioRef.current.play().then(() => fadeInAudio(800)).catch(() => setRequiresInteraction(true));
      } else if (!audioRef.current.muted) {
        fadeInAudio(800);
      }
    }
  };

  if (!currentTrack) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(currentTrack)}
        loop
        muted={isMuted}
        autoPlay
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Floating audio control button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!consented && requiresInteraction && (
          <Button
            size="sm"
            onClick={() => {
              if (!audioRef.current) return;
              audioRef.current.muted = false;
              setIsMuted(false);
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                setRequiresInteraction(false);
                setConsented(true);
                setCookie('audioConsent', 'true');
                setCookie('audioMuted', 'false');
                fadeInAudio(800);
              }).catch(() => setRequiresInteraction(true));
            }}
            className="rounded-full bg-accent text-accent-foreground shadow hover:opacity-90"
          >
            Enable Sound
          </Button>
        )}
        <Button
          size="icon"
          variant="outline"
          onClick={toggleMute}
          className="rounded-full h-12 w-12 bg-background/80 backdrop-blur-lg border-2 shadow-lg hover:scale-110 transition-transform"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* iOS-specific minimal hint if autoplay is blocked even after consent */}
      {consented && requiresInteraction && isIOS && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 rounded-full border bg-background/90 px-4 py-2 text-sm shadow-md">
          Tap anywhere to enable sound
        </div>
      )}

      {/* Fullscreen consent overlay shown before page interaction if not consented */}
      {showConsent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="rounded-2xl border bg-card p-6 shadow-xl text-center max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-2">Enable Site Audio?</h2>
            <p className="text-sm text-muted-foreground mb-4">We play background music. You can mute anytime.</p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setConsented(false);
                  setIsMuted(true);
                  setCookie('audioConsent', 'false');
                  setCookie('audioMuted', 'true');
                  setShowConsent(false);
                }}
              >
                Not Now
              </Button>
              <Button
                onClick={async () => {
                  setConsented(true);
                  setIsMuted(false);
                  setCookie('audioConsent', 'true');
                  setCookie('audioMuted', 'false');
                  if (audioRef.current) {
                    audioRef.current.muted = false;
                    try {
                      await audioRef.current.play();
                      setIsPlaying(true);
                      setRequiresInteraction(false);
                      fadeInAudio(1200);
                    } catch {
                      setRequiresInteraction(true);
                    }
                  }
                  setShowConsent(false);
                }}
              >
                Allow Sound
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
