"use client";

import { duration } from "drizzle-orm/gel-core";
import { AnimatePresence, delay, easeInOut, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname();

  const pageVariants = {
    initial: { opacity: 0,delay:1,ease:easeInOut  },
    animate: { opacity: 1,transition:{
      duration:0.8
    },delay:2 },
   
  };

  const sliderVariant = {
    initial: { top: "0" , },     
    animate: { top: "-100vh", transition: { duration: 1.4 },ease:[0.76, 0, 0.24, 1] },      
    
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative min-h-screen">

    
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative "
        >
          {children}
        </motion.div>

       
        <motion.div
          variants={sliderVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 left-0 w-full h-screen bg-amber-300 "
        />
      </motion.div>
    </AnimatePresence>
  );
}
