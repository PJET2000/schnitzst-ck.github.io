import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import AnimatedLogo from './logo';
import AnimatedLine from './LineAnimation';

interface LineAnimationProps {
  width: string | number | MotionValue<number | string>;
  height: string | number | MotionValue<number | string>;
  color: string | MotionValue<string>;
}

type DimensionState = number;

const Jump: React.FC = () => {
  const { scrollY } = useViewportScroll();
  const [isFixed, setIsFixed] = useState(false);
  const [responsiveWidth, setResponsiveWidth] = useState<DimensionState>(window.innerWidth * 0.5);
  const [lineFinalWidth, setLineFinalWidth] = useState<DimensionState>(window.innerWidth * 0.9);
  const [initialLogoHeight, setInitialLogoHeight] = useState<DimensionState>(200); // Set initial state for logo height
  const initialColor = "#b78765"; // Inital Color Line
  const finalColor = "#FFF5ED"; // Final ColorLine

  const lineColor = useTransform(scrollY, [0, window.innerHeight * 0.46], [initialColor, finalColor]);

  

  useEffect(() => {
    const updatePosition = () => {
      const currentScrollY = scrollY.get();
      const threshold = window.innerHeight * 0.46;
      setIsFixed(currentScrollY > threshold);
    };

    const handleResize = () => {
      updateDimensions(); // Update all dimensions on resize
    };

    const unsubscribeY = scrollY.onChange(updatePosition);
    window.addEventListener('resize', handleResize);
    updatePosition(); // Initial check

    

    return () => {
      unsubscribeY();
      window.removeEventListener('resize', handleResize); // Clean up
    };
  }, [scrollY]);

  const updateDimensions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Update line width based on screen width
    let newWidth = screenWidth * 0.8; 
    let newFinalWidth = screenWidth * 0.99; 
    let newLogoHeight = screenWidth*0.5; 

    if (screenWidth >= 1280) { // Tailwind's 'xl' breakpoint
      newWidth = screenWidth * 0.5; 
      newFinalWidth = screenWidth * 0.85; 
      newLogoHeight = screenWidth * 0.25; 
    }

    setResponsiveWidth(newWidth);
    setLineFinalWidth(newFinalWidth);
    setInitialLogoHeight(newLogoHeight);
  };

  useEffect(updateDimensions, []);


  const lineInitialHeight = 500;
  const lineFinalHeight = 35;

  const lineHeight = useTransform(scrollY, [0, window.innerHeight * 0.46], [lineInitialHeight, lineFinalHeight]);
  const lineWidth = useTransform(scrollY, [0, window.innerHeight * 0.46], [responsiveWidth, lineFinalWidth]);

  const springLineHeight = useSpring(lineHeight, {
    stiffness: 300,
    damping: 25,
  });

  const springLineWidth = useSpring(lineWidth, {
    stiffness: 300,
    damping: 25,
  });


  // Logo scale
  const logoScale = useTransform(scrollY, [0, window.innerHeight * 0.46], [initialLogoHeight, 60]);
  const springLogoScale = useSpring(logoScale, {
    stiffness: 300,
    damping: 25,
  });

  // Adjusting space between logo and line
  const spaceBetween = useTransform(scrollY, [0, window.innerHeight * 0.46], ['-320px', '-5px']);

  const wrapperStyle:  React.CSSProperties = {
    position: isFixed ? 'fixed' : 'absolute',
    top: isFixed ? '0%' : '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50,
    marginTop: 54,
    width: '100%',
    pointerEvents: 'none',
  };


  return (
    <>
      <div style={wrapperStyle} className="bg-base-100/0 w-full items-center flex flex-col justify-center gap-0 h-full mt-5 drop-shadow-xl px-5 xl:px-24">
      
      <motion.div style={{ height: springLogoScale, marginBottom: spaceBetween }} className='z-50'>
        <AnimatedLogo />
      </motion.div>
      <motion.div style={{ width: springLineWidth, height: springLineHeight }}>
        <AnimatedLine color={lineColor} />
      </motion.div>
  
      </div>
    </>
  );
};

export default Jump;
