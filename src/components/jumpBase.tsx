import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform, MotionValue } from 'framer-motion';


type DimensionState = number;

const Jump: React.FC = () => {
  const { scrollY } = useViewportScroll();
  const [isFixed, setIsFixed] = useState(true);
  const [responsiveWidth, setResponsiveWidth] = useState<DimensionState>(window.innerWidth * 0.5);
  const [lineFinalWidth, setLineFinalWidth] = useState<DimensionState>(window.innerWidth * 0.9);
  const [initialLogoHeight, setInitialLogoHeight] = useState<DimensionState>(200); // Set initial state for logo height

  

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


    // Update line width based on screen width
    let newWidth = screenWidth * 0.8; 
    let newFinalWidth = screenWidth * 0.99; 

    if (screenWidth >= 1280) { // Tailwind's 'xl' breakpoint
      newWidth = screenWidth * 0.5; 
      newFinalWidth = screenWidth * 0.85; 

    }

    setResponsiveWidth(newWidth);
    setLineFinalWidth(newFinalWidth);
  };

  useEffect(updateDimensions, []);


  const lineFinalHeight = 35;


 

  const finalLogoHeight = '60px'

  // Adjusting space between logo and line
  const spaceBetween = '-5px'

  const wrapperStyle:  React.CSSProperties = {
    position: 'fixed',
    top: '0%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 50,
    marginTop: 54,
    width: '100%',
    height: 'auto',
    
  };


  return (
    <>
      <div style={wrapperStyle} className="bg-base-100/0 w-full items-center flex flex-col justify-center gap-0 h-full mt-5 drop-shadow-xl px-5 xl:px-24">
      
      
      <a href="/" className='z-50'> 
         <img src="/SchnitzStück Logo.svg" style={{ height: finalLogoHeight, marginBottom: spaceBetween }} className='z-50' alt="SchnitzStück Logo" />
    </a>
      
      <div style={{ width: lineFinalWidth, height: lineFinalHeight }}>
        <div className='w-full h-full items-center justify-center py-2 px-2'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 205.87198 3.1314034"
                preserveAspectRatio="none"
                className="fill-current text-base-content w-full z-40 h-full xl:h-full"
                    style={{ color: "#FFF5ED" }} // Apply width and height here
                height="100%"
                width="100%"
                >
                <title>Linie</title>

                {/* darunter liegende schrift */}
                <path
                    mask="url(#mask-line-all)"
                    id="marketting-char-SchnitzStück"
                    transform="translate(-0.78430633,-149.74023)"
                    d="m 0.78430633,151.81693 c 0.74200707,-0.41613 6.43451327,-0.39377 10.13929567,-0.26724 4.481295,0.15306 10.300177,0.20448 13.041568,-0.38566 2.86694,-0.61717 6.977282,-0.95106 12.095165,-0.47712 3.715585,0.34409 6.041754,0.32778 9.602704,-0.30729 2.568131,-0.45801 3.27353,-0.24858 8.620733,0.47697 3.065224,0.41595 3.109917,0.88141 4.325303,0.29305 1.683164,-0.8148 4.262824,-0.96349 8.270629,-0.40624 4.304658,0.59854 6.997898,0.43284 12.513068,-0.37706 5.952216,-0.87409 9.382573,-0.68072 15.432725,-0.33242 4.460311,0.64337 23.148993,0.21784 24.461543,0.27045 3.58867,0.14384 30.28243,0.7611 40.11719,0.25117 12.76083,-0.66166 47.25206,-0.23162 47.25206,0.58914 0,0.42153 -10.50342,0.54869 -28.9099,-0.0128 -6.26462,-0.19109 -10.6313,0.0364 -14.1703,0.0508 -15.46783,0.26979 -15.86466,0.5852 -28.62131,0.2573 -8.03282,-0.20647 -16.83019,-0.35014 -24.29549,-0.42256 -10.749949,-0.10428 -12.14137,0.24666 -16.211863,-0.0704 -6.086686,-0.47414 -8.481669,-0.65328 -13.774746,0.12363 -6.398119,0.93911 -8.5754,1.02302 -12.995649,0.50089 -4.758343,-0.56208 -8.134126,-0.42152 -8.771548,0.36521 -0.522765,0.64522 -1.30451,0.36414 -5.556362,-0.27123 -4.091177,-0.61136 -6.080065,-0.88313 -8.880026,-0.34544 -2.147516,0.41244 -4.172772,0.40429 -13.139485,-0.0528 -2.820896,-0.14383 -3.596235,-0.0826 -7.094143,0.56064 -3.937013,0.72395 -24.57189424,0.65039 -23.39339698,-0.0105 z"
                ></path>
                </svg>

                
            </div>
      </div>
  
      </div>
    </>
  );
};

export default Jump;
