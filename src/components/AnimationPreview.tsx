import React from 'react';
import { Card } from '@/components/ui/card';

interface AnimationPreviewProps {
  dot1Color?: string;
  dot2Color?: string;
  dot3Color?: string;
  speed?: number;
  size?: number;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  dot1Color = '#f43f5e', // rose-500
  dot2Color = '#3b82f6', // blue-500
  dot3Color = '#22c55e', // green-500
  speed = 2,
  size = 40,
}) => {
  console.log('AnimationPreview loaded');

  const containerWidth = size * 5;
  const animationDuration = `${speed}s`;
  const translationDistance = size;

  // We inject the keyframes and other styles directly via a <style> tag.
  // This is a clean way to have component-scoped, dynamic CSS based on props.
  const dynamicStyles = `
    .gooey-container {
      width: ${containerWidth}px;
      height: ${size * 2}px;
      position: relative;
      filter: url(#gooey);
    }
    .gooey-dot {
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-name: gooey-move;
      animation-duration: ${animationDuration};
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    .dot-1 {
      background-color: ${dot1Color};
      animation-delay: 0s;
    }
    .dot-2 {
      background-color: ${dot2Color};
      animation-delay: ${speed * 0.33}s;
    }
    .dot-3 {
      background-color: ${dot3Color};
      animation-delay: ${speed * 0.66}s;
    }
    @keyframes gooey-move {
      0%   { transform: translate(calc(-50% - ${translationDistance}px), -50%); }
      50%  { transform: translate(calc(-50% + ${translationDistance}px), -50%); }
      100% { transform: translate(calc(-50% - ${translationDistance}px), -50%); }
    }
  `;

  return (
    <Card className="flex items-center justify-center w-full h-96 bg-gray-100 dark:bg-gray-800/40 p-4 overflow-hidden">
      {/* The SVG filter that creates the 'gooey' or 'metaball' effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0">
        <defs>
          <filter id="gooey">
            {/* Blur the source graphic */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            {/* Increase alpha contrast to sharpen the blurred edges */}
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            {/* Blend the original graphic back on top */}
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      {/* Injecting our dynamic keyframes and styles */}
      <style>{dynamicStyles}</style>

      {/* The container for our animated dots */}
      <div className="gooey-container">
        <div className="gooey-dot dot-1"></div>
        <div className="gooey-dot dot-2"></div>
        <div className="gooey-dot dot-3"></div>
      </div>
    </Card>
  );
};

export default AnimationPreview;