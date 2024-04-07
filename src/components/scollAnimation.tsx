import { motion } from 'framer-motion';

const ScrollAnimatedComponent = ({ children }) => {
  // Hier könntest du deine Animationen definieren, z.B. Fade-In
  const variants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      className="snap-center" // Stelle sicher, dass dies mit deinem CSS übereinstimmt
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedComponent;


<style>
main {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh; /* oder pass die Höhe entsprechend an */
}

.snap-center {
  scroll-snap-align: start;
}

</style>