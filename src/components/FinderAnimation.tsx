import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Finder from "./finder2";

// Definiere einen Typ für die Props
interface AnimatedComponentProps {
  Component: React.FC; // oder React.ReactNode, wenn du JSX-Elemente übergeben möchtest
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ Component }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0,1], [0.8, 1]);

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
      <AnimatedComponent Component={Finder} />
    </div>
  );
};

export default AnimatedHeadings;
