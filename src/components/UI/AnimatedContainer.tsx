import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { pageEnterAnimation, staggerAnimation } from '../../utils/animations';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'page' | 'stagger' | 'none';
  delay?: number;
  staggerDelay?: number;
}

export default function AnimatedContainer({
  children,
  className = '',
  animation = 'page',
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 设置初始状态
    gsap.set(container, { opacity: 0 });

    const timer = setTimeout(() => {
      switch (animation) {
        case 'page':
          pageEnterAnimation(container);
          break;
        case 'stagger': {
          const children = Array.from(container.children) as HTMLElement[];
          staggerAnimation(children, staggerDelay);
          gsap.set(container, { opacity: 1 });
          break;
        }
        case 'none':
          gsap.set(container, { opacity: 1 });
          break;
      }
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [animation, delay, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
