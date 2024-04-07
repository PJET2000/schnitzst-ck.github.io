import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Finder from "./finder2";

const AnimatedComponent = ({ Component, offset }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"], // Ensure the offset is passed as a prop
  });
  const scaleProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);

  // Assuming the Finder component can accept and use a style prop
  return (
    <motion.div ref={ref}
      style={{
        scale: scaleProgress,
        opacity: scrollYProgress,
        margin: '100px 0',
      }}
    >
      <Component />
    </motion.div>
  );
};

const AnimatedHeadings = () => {
  return (
    <div>
      <AnimatedComponent Component={Finder} /> {/* Adjust the offset to match when you want the Finder to animate */}
    </div>
  );
};

export default AnimatedHeadings;
