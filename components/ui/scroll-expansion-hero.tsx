'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

/**
 * Scroll-expanding media hero.
 *
 * Adapted to scrub from its OWN scroll position (a sticky, in-view section)
 * rather than hijacking the whole window — so it can live as a mid-page
 * section under another hero instead of forcing itself to the top of the page.
 */
const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const trackRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      const scrolled = Math.min(
        Math.max(-el.getBoundingClientRect().top, 0),
        scrollable
      );
      const progress = scrollable > 0 ? scrolled / scrollable : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  // Split the title into two balanced halves that drift apart on scroll.
  const words = title ? title.split(' ') : [];
  const mid = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, mid).join(' ');
  const secondHalf = words.slice(mid).join(' ');

  const isYouTube = mediaType === 'video' && mediaSrc.includes('youtube.com');

  return (
    <>
      <section ref={trackRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image — fades out as the media expands */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: 1 - scrollProgress }}
        >
          <Image
            src={bgImageSrc}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {/* Expanding media */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
            style={{
              width: `${mediaWidth}px`,
              height: `${mediaHeight}px`,
              maxWidth: '95vw',
              maxHeight: '85vh',
              boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
            }}
          >
            {mediaType === 'video' ? (
              isYouTube ? (
                <div className="relative h-full w-full pointer-events-none">
                  <iframe
                    width="100%"
                    height="100%"
                    src={
                      mediaSrc.includes('embed')
                        ? mediaSrc +
                          (mediaSrc.includes('?') ? '&' : '?') +
                          'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                        : mediaSrc.replace('watch?v=', 'embed/') +
                          '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                          mediaSrc.split('v=')[1]
                    }
                    className="w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/30 rounded-xl"
                    style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover rounded-xl"
                    controls={false}
                    disablePictureInPicture
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/30 rounded-xl"
                    style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  />
                </div>
              )
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={mediaSrc}
                  alt={title || 'Media content'}
                  fill
                  className="object-cover rounded-xl"
                />
                <motion.div
                  className="absolute inset-0 bg-black/50 rounded-xl"
                  style={{ opacity: 0.7 - scrollProgress * 0.3 }}
                />
              </div>
            )}

            {(date || scrollToExpand) && (
              <div className="flex flex-col items-center text-center relative z-10 mt-4">
                {date && (
                  <p
                    className="text-2xl text-white"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className="text-white/80 font-medium"
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Title — two halves drift apart as you scroll */}
          {title && (
            <div
              className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                style={{ transform: `translateX(-${textTranslateX}vw)` }}
              >
                {firstHalf}
              </motion.h2>
              {secondHalf && (
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {secondHalf}
                </motion.h2>
              )}
            </div>
          )}
        </div>
      </div>
      </section>

      {children && (
        <motion.section
          className="relative z-10 flex flex-col w-full px-8 py-24 md:px-16 md:py-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.section>
      )}
    </>
  );
};

export default ScrollExpandMedia;
