import {motion} from 'framer-motion'
import { useState } from "react"
import { useMediaQuery } from '../util/useMediaQuery'

const gnom = '/Gnom.png'; // Assuming this is the correct path for your image

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
        <nav className="fixed top-0 left-0 w-full z-50 bg-base-100 text-base-content shadow-sm">
            <div className="mx-8 flex justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32">
                <div>
                    <img src={gnom} alt="Profilbild von Gnom" className="rounded-full w-12 h-12"/>
                </div>

                <h1 className="text-lg font-bold">
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
            </div>

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
