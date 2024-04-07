import { motion, useViewportScroll, useTransform } from 'framer-motion';

export const animationVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export const useScrollAnimation = () => {
  const { scrollY } = useViewportScroll();
  const yRange = [70, 140]; // Adjust based on navbar height and desired effect
  const opacity = useTransform(scrollY, yRange, [0, 1]);
  const scale = useTransform(scrollY, yRange, [0.95, 1]);

  return { opacity, scale };
};