"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar({ scrollToHowItWorks }) {


  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <nav className="flex gap-5 w-full items-center justify-between px-14 py-4">

      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
      >
        <Button
          className="bg-indigo-700 shadow-xl hover:bg-indigo-600 w-fit"
          onClick={scrollToHowItWorks}
        >
          How it works?
        </Button>
      </motion.div>

      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/logoImg.png"
          height={40}
          width={250}
          alt="Automatic Scheduler Logo"
        />
      </motion.div>

    </nav>
  );
}
