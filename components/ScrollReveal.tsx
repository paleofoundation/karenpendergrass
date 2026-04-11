'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-up';
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Step 1: Mark as mounted so we can add scroll-hidden (JS-only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 2: Observe for intersection
  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted) return;

    // If IntersectionObserver isn't available, show immediately
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.remove('scroll-hidden');
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => {
              el.classList.remove('scroll-hidden');
              el.classList.add('is-visible');
            }, delay);
          } else {
            el.classList.remove('scroll-hidden');
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, mounted]);

  const animClass = `scroll-${animation}`;
  // Only add scroll-hidden after JS mounts — SSR/no-JS keeps content visible
  const hiddenClass = mounted ? 'scroll-hidden' : '';

  return (
    <div ref={ref} className={`${animClass} ${hiddenClass} ${className}`}>
      {children}
    </div>
  );
}
