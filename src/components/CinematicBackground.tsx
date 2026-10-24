import React, { useRef, useEffect, useState } from 'react';

export interface CinematicBackgroundProps {
  /** The URL of the video to stream in the background */
  videoUrl?: string;
  /** Optional opacity level of the video layer (between 0 and 1, or 0 and 100) */
  overlayOpacity?: number;
  /** Whether the video is actively playing */
  isPlaying?: boolean;
  /** Optional children if used as a full-page wrapping container */
  children?: React.ReactNode;
  /** Optional custom CSS classes */
  className?: string;
  /** Optional callback when video encounters an error */
  onError?: () => void;
}

export const DEFAULT_WAREHOUSE_VIDEO = '/assets/warehouse-loop.mp4';

/**
 * CinematicBackground Component
 * Renders an immersive warehouse background video behind dashboard content
 * using an HTML5 <video> element with object-fit: cover, loop, autoplay, and muted attributes.
 */
export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({
  videoUrl = DEFAULT_WAREHOUSE_VIDEO,
  overlayOpacity = 0.75,
  isPlaying = true,
  children,
  className = '',
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  // Normalize opacity to a 0 - 1 float range (default 0.75 = 75% visibility)
  const normalizedOpacity =
    overlayOpacity > 1 ? overlayOpacity / 100 : overlayOpacity;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);

    // Explicitly enforce muted on DOM element to comply with all browser autoplay policies
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');

    const startPlay = () => {
      if (isPlaying) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay retry with muted assurance
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else {
        video.pause();
      }
    };

    startPlay();

    // Browser user interaction fallback: start play on first interaction if blocked by policy
    const handleFirstInteraction = () => {
      if (video.paused && isPlaying) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, videoUrl]);

  const handleVideoError = () => {
    // If a custom or external URL fails, fall back to the local warehouse video
    if (videoUrl !== DEFAULT_WAREHOUSE_VIDEO) {
      if (videoRef.current) {
        videoRef.current.src = DEFAULT_WAREHOUSE_VIDEO;
        videoRef.current.play().catch(() => {});
      }
    } else {
      setHasError(true);
      if (onError) onError();
    }
  };

  return (
    <>
      {/* Immersive Video Layer behind dashboard content */}
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
        aria-hidden="true"
      >
        {/* <video> element with object-fit: cover, loop, autoplay, muted */}
        {!hasError ? (
          <video
            ref={videoRef}
            key={videoUrl}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={handleVideoError}
            className="w-full h-full object-cover transition-opacity duration-700 scale-105 filter saturate-110 contrast-105"
            style={{
              objectFit: 'cover',
              opacity: normalizedOpacity,
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src="/assets/warehouse-loop.mp4" type="video/mp4" />
            <source src="/assets/warehouse-logistics-1.webm" type="video/webm" />
          </video>
        ) : (
          /* High-tech animated cybernetic warehouse particle fallback */
          <div
            className="w-full h-full bg-gradient-to-br from-[#050b18] via-[#09152e] to-[#040813] transition-opacity"
            style={{ opacity: normalizedOpacity }}
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
          </div>
        )}

        {/* Cinematic Film Vignette & Subtle Color Grading (Transparent so video is clearly visible) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e]/80 via-[#070e1e]/35 to-[#070e1e]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(3,7,18,0.65)_100%)] pointer-events-none" />
      </div>

      {/* Render children if used as a container */}
      {children && <div className="relative z-10">{children}</div>}
    </>
  );
};

export default CinematicBackground;
