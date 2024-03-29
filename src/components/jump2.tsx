import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import AnimatedLogo from './logo'; // Import the AnimatedLogo component


const Jump: React.FC = () => {
  const { scrollY } = useViewportScroll();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const currentScrollY = scrollY.get();
      const threshold = window.innerHeight * 0.46; // Adjust this value as needed

      setIsFixed(currentScrollY > threshold);
    };

    const unsubscribeY = scrollY.onChange(updatePosition);
    updatePosition(); // Initial check

    return () => unsubscribeY();
  }, [scrollY]);

  const navbarHeight = 5;
  const finalImageHeight = 65; // Final height of the image in the navbar
  const finalTopOffset = (navbarHeight- finalImageHeight) / 2; // Center the image in the navbar

  const initialScale = 1;
  const finalScale = finalImageHeight / 300; // Adjust the scale based on the final image height

  // Applying useTransform to get a variable scale value based on scroll
  const scale = useTransform(scrollY, [0, window.innerHeight * 0.46], [initialScale, finalScale]);

  // UseSpring to add a spring animation to the scale
  const springScale = useSpring(scale, {
    stiffness: 400,
    damping: 30,
    mass: 1.05
  });

  const topOffset = isFixed ? `${finalTopOffset}px` : '50%';
  const yTransform = isFixed ? '-40%' : '-50%';




  // Wrapper styles
const wrapperStyle = {
  position: isFixed ? 'fixed' : 'absolute',
  top: isFixed ? `${finalTopOffset}px` : '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 50,
  marginTop: 30,
};

// AnimatedLogo component styles
const svgStyle = {
  scale: springScale,
  height: isFixed ? `${finalImageHeight}px` : '300px',
  marginTop: 0, 
};


  

return (
  <>
    

    <div style={wrapperStyle} className="bg-base-100 w-full items-center flex justify-center h-20 mt-5">
      <AnimatedLogo style={svgStyle} />
    </div>
  </>
);
};

export default Jump;
