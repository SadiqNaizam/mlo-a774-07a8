import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimationPreview from '@/components/AnimationPreview';
import CodeOutput from '@/components/CodeOutput';
import ColorPickerInput from '@/components/ColorPickerInput';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const AnimatorPage = () => {
  console.log('AnimatorPage loaded');

  // Framer Motion Variants
  const pageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4, // Delay to let header animate in
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const controlsContainerVariants = {
    hidden: { opacity: 1 }, // Keep card visible
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  // State for animation properties
  const [dot1Color, setDot1Color] = useState('#f43f5e'); // rose-500
  const [dot2Color, setDot2Color] = useState('#3b82f6'); // blue-500
  const [dot3Color, setDot3Color] = useState('#22c55e'); // green-500
  const [speed, setSpeed] = useState(2); // in seconds
  const [size, setSize] = useState(40); // in pixels

  // Memoized generation of HTML and CSS code for output
  const { htmlCode, cssCode } = useMemo(() => {
    const containerWidth = size * 5;
    const animationDuration = `${speed.toFixed(2)}s`;
    const translationDistance = size;
    
    const html = `<!-- 1. Add this SVG filter to your HTML (it can be hidden) -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </defs>
</svg>

<!-- 2. This is the container for the animation -->
<div class="gooey-container">
  <div class="gooey-dot dot-1"></div>
  <div class="gooey-dot dot-2"></div>
  <div class="gooey-dot dot-3"></div>
</div>`;

    const css = `/* 3. Add this CSS to your stylesheet */
.gooey-container {
  width: ${containerWidth}px;
  height: ${size * 2}px;
  position: relative;
  /* This links the animation to the SVG filter in your HTML */
  filter: url(#gooey);\n}\n\n.gooey-dot {\n  width: ${size}px;\n  height: ${size}px;\n  border-radius: 50%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  animation: gooey-move ${animationDuration} ease-in-out infinite;\n}\n\n.dot-1 {\n  background-color: ${dot1Color};\n  animation-delay: 0s;\n}\n\n.dot-2 {\n  background-color: ${dot2Color};\n  animation-delay: ${(speed * 0.33).toFixed(2)}s;\n}\n\n.dot-3 {\n  background-color: ${dot3Color};\n  animation-delay: ${(speed * 0.66).toFixed(2)}s;\n}\n\n@keyframes gooey-move {\n  0%   { transform: translate(calc(-50% - ${translationDistance}px), -50%); }\n  50%  { transform: translate(calc(-50% + ${translationDistance}px), -50%); }\n  100% { transform: translate(calc(-50% - ${translationDistance}px), -50%); }\n}`;

    return { htmlCode: html, cssCode: css };
  }, [size, speed, dot1Color, dot2Color, dot3Color]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <motion.main 
        className="flex-1 container mx-auto py-8 px-4"
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Live Preview Section */}
          <div className="lg:col-span-2">
            <AnimationPreview
              dot1Color={dot1Color}
              dot2Color={dot2Color}
              dot3Color={dot3Color}
              speed={speed}
              size={size}
            />
          </div>

          {/* Controls Panel Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Customize Animation</CardTitle>
                <CardDescription>
                  Adjust the settings below to see live changes.
                </CardDescription>
              </CardHeader>
              <motion.div 
                variants={controlsContainerVariants} 
                initial="hidden" 
                animate="visible" 
                className="space-y-6 p-6 pt-0" // Using p-6 to match CardContent
              >
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="size-slider">Dot Size: {size}px</Label>
                  <Slider
                    id="size-slider"
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    min={10}
                    max={80}
                    step={1}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="speed-slider">Animation Speed: {speed.toFixed(1)}s</Label>
                  <Slider
                    id="speed-slider"
                    value={[speed]}
                    onValueChange={(value) => setSpeed(value[0])}
                    min={0.5}
                    max={10}
                    step={0.1}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-4 pt-2">
                  <ColorPickerInput
                    label="Dot 1 Color"
                    color={dot1Color}
                    onChange={setDot1Color}
                  />
                  <ColorPickerInput
                    label="Dot 2 Color"
                    color={dot2Color}
                    onChange={setDot2Color}
                  />
                  <ColorPickerInput
                    label="Dot 3 Color"
                    color={dot3Color}
                    onChange={setDot3Color}
                  />
                </motion.div>
              </motion.div>
            </Card>
          </div>
        </motion.div>

        {/* Code Output Section */}
        <motion.div variants={itemVariants}>
            <CodeOutput htmlCode={htmlCode} cssCode={cssCode} />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default AnimatorPage;