// Photos from https://citizenofnowhe.re/lines-of-the-city
/* import "./scrollstyle.css"; */
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section>
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt="A London skyscraper" />
      </div>
      <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (

    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
      <h1 class="mb-20" data-aos="fade-up">AOS Test Heading</h1>
<p class="mb-20" data-aos="fade-up" data-aos-delay="100">This paragraph should fade up after the heading.</p>
<div class="mb-20" data-aos="flip-left" data-aos-delay="200">
  <p class="mb-20" >This div should flip in from the left.</p>
</div>

    </>
    
  );
}