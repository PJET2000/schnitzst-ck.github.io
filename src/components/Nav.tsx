const gnom = '/Gnom.png'
import {motion} from 'framer-motion'
import { useState } from "react"
import { useMediaQuery } from '../util/useMediaQuery'


const navMotion = {
    visible: {
        opacity:1,

        transition: {
            when: "beforeChildren",
            staggerChildren: 0.15,
        },
    },
    hidden: {
        opacity: 0,
    },
}
const itemMotion ={
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
}

export default function Nav() {
    const [toggled, setToggled] = useState(false)
    const matches = useMediaQuery('(min-width: 1024px)')

    return (
        <nav className="relative mx-8 mb-24 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32 bg-base-100 text-base-content hidden" id="navbar">
            <svg 
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                width="250"
                height={4}
                viewBox="0 0 250 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                d="M2 2L428 2"
                strokeWidth={2}
                stroke="currentColor"
                strokeLinecap="round"
                />

            </svg>
            <div>
                <img src={gnom} alt="Profilbild von Gnom" className="rounded-full w-12 h-12"/>
            </div>  

            <h1 className="absolute left-1/2 -translate-x-1/2 bottom-0 mb-6 text-lg font-bold">
                <a href="/" className="text-base-content hover:text-accent">SchnitzStück.</a>
            </h1>
            {matches && (
                <div className="flex gap-12">
                    <a href="/" className="text-base-content hover:text-accent">Home</a>
                    <a href="/services" className="text-base-content hover:text-accent">Services</a>
                    <a href="/contact" className="text-base-content hover:text-accent">Contact</a>
                </div>
            )}
            
            {!matches && (
                <div onClick={() => setToggled(prevToggle => !prevToggle)} 
                className="space-y-1.5 cursor-pointer z-50">
                    <motion.span 
                        animate={{  rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
                        className="block h-0.5 w-8 bg-current"></motion.span>
                    <motion.span 
                        animate={{  width: toggled ? 0 : 24 }}
                        className="block h-0.5 w-6 bg-current"></motion.span>
                    <motion.span 
                        animate={{  rotateZ: toggled ? -45 : 0, y: toggled ? -8 : 0, width: toggled ? 32 : 16,}}
                        className="block h-0.5 w-4 bg-current"></motion.span>
                </div>
            )}
            
            {toggled &&  !matches && (
                <motion.div
                    animate={{ opacity: 1, x:0 }}
                    initial={{ opacity: 0, x:25 }}
                    className="fixed flex bg-base-100 bottom-0 left-0 w-full h-screen items-center justify-center z-40 text-base-content"
                >
                    <motion.div 
                        variants={navMotion} 
                        animate="visible"
                        initial="hidden"
                        className='flex flex-col gap-24 text-lg font-bold'>
                        <motion.a variants={itemMotion} href="/" className="hover:text-accent">&nbsp;&nbsp;Home</motion.a>
                        <motion.a variants={itemMotion} href="/services" className="hover:text-accent">Services</motion.a>
                        <motion.a variants={itemMotion} href="/contact" className="hover:text-accent">Contact</motion.a>
                    </motion.div>
                </motion.div>
            )}

        </nav>
    )
}