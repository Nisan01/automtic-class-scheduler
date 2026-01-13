"use client"

import React from "react";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import CardStack3D from "../CardStack/StackCards";
import { motion } from "framer-motion";

function HeroSection() {
  const router = useRouter();

  const onClickLoginListener = (e) => {
    e.preventDefault();
    router.push('/login')
  }

  const onClickViewSchedule = (e) => {
    e.preventDefault();
    router.push('/view_schedule')
  }

  // Variants with reduced delay
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
  });

  const buttonLeftVariant = (delay = 0) => ({
    hidden: { opacity: 0, x: -50, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
  });

  const buttonRightVariant = (delay = 0) => ({
    hidden: { opacity: 0, x: 50, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
  });

  return (
    <section className="w-full mt-15 relative flex flex-col items-start px-14 py-4">

  
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.4)}
      >
        <div className="w-fit">
          <div className="flex gap-5 items-center text-4xl md:text-6xl font-bold">
            <h2 className="font-Raleway font-black text-7xl text-white text-shadow-black">Generate</h2>
            <div className="flex gap-5 font-Raleway font-black text-6xl z-50">A Timetable <span>in</span></div>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-gray-100 font-Raleway font-black text-6xl text-center">Seconds</span>
          </div>
        </div>
      </motion.div>

  
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.6)}
        className="font-Carlito text-[15px] md:text-xl text-gray-300 mt-4 max-w-xl"
      >
        Describe your week once — working days, classes, constraints — and
        instantly get a clean, organized timetable you can share or export.
      </motion.p>

 
      <div className="mt-20 mb-20 w-full relative flex items-start justify-center gap-4 h-fit">
        <motion.div initial="hidden" animate="visible" variants={buttonLeftVariant(0.8)}>
          <Button size="exlg" onClick={onClickViewSchedule} className="bg-indigo-700 shadow">View Schedule</Button>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={buttonRightVariant(1)}>
          <Button size="exlg" onClick={onClickLoginListener} className="bg-indigo-700 shadow">Admin Login</Button>
        </motion.div>

        <div className="absolute bottom-[-7rem] right-[10rem] flex items-center justify-center z-10">
          <CardStack3D />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
