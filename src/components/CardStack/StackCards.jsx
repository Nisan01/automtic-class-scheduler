"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function StackCards() {
  const cards = [
    { src: "/stack1.jpg", top: "0", left: "0", translateZ: 40, delay: 0 },
    { src: "/stack2.jpg", top: "3rem", left: "-8px", translateZ: 30, delay: 0.2 },
    { src: "/stack3.jpg", top: "6rem", left: "0", translateZ: 20, delay: 0.4 },
  ];

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="relative w-64 h-96 mx-auto mt-20 perspective-1000">

        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className="absolute p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-lg w-64 h-64 border border-white/30"
            style={{
              transform: `rotateX(56deg) rotateY(6deg) rotateZ(-57deg) translateZ(${card.translateZ}px) scale(1.05)`,
              top: card.top,
              left: card.left,
              transformStyle: "preserve-3d",
              zIndex: 30 - idx * 10,
            }}
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: card.delay,
            }}
          >
            <Image
              src={card.src}
              alt={`Stack${idx + 1}`}
              width={216}
              height={216}
              className="rounded-lg object-cover w-full h-full"
            />
          </motion.div>
        ))}

      </div>
    </div>
  );
}

export default StackCards;
