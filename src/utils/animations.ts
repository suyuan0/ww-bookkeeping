import { gsap } from 'gsap';

// 页面进入动画
export const pageEnterAnimation = (element: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    }
  );
};

// 页面退出动画
export const pageExitAnimation = (element: HTMLElement) => {
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    scale: 1.05,
    duration: 0.4,
    ease: 'power2.in',
  });
};

// 卡片悬停动画
export const cardHoverAnimation = (element: HTMLElement, isHovering: boolean) => {
  gsap.to(element, {
    scale: isHovering ? 1.02 : 1,
    y: isHovering ? -2 : 0,
    duration: 0.3,
    ease: 'power2.out',
  });
};

// 按钮点击动画
export const buttonClickAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1,
  });
};

// 数字计数动画
export const countUpAnimation = (
  element: HTMLElement,
  from: number,
  to: number,
  duration: number = 1
) => {
  const obj = { value: from };
  
  gsap.to(obj, {
    value: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

// 列表项交错动画
export const staggerAnimation = (elements: HTMLElement[], delay: number = 0.1) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: delay,
    }
  );
};

// 进度条动画
export const progressBarAnimation = (
  element: HTMLElement,
  percentage: number,
  duration: number = 1
) => {
  gsap.fromTo(
    element,
    { width: '0%' },
    {
      width: `${percentage}%`,
      duration,
      ease: 'power2.out',
    }
  );
};

// 浮动动画
export const floatingAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
};

// 脉冲动画
export const pulseAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 1,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
};

// 淡入淡出动画
export const fadeInOut = (element: HTMLElement, show: boolean) => {
  gsap.to(element, {
    opacity: show ? 1 : 0,
    duration: 0.3,
    ease: 'power2.out',
  });
};

// 滑动动画
export const slideAnimation = (
  element: HTMLElement,
  direction: 'left' | 'right' | 'up' | 'down',
  distance: number = 100
) => {
  const transforms: Record<string, { x?: number; y?: number }> = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
  };

  gsap.fromTo(
    element,
    {
      opacity: 0,
      ...transforms[direction],
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }
  );
};
