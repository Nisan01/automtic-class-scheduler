"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useContext } from "react";
import UserContext from "@/context/userContext";
import LogoutComp from "../LogoutComp/LogoutComp";
import { motion } from "framer-motion";

function DashboardNav() {
  const { user } = useContext(UserContext);
  const userData = user?.UserData;
  const isLoggedIn = user?.success && user?.UserData;

  const router = useRouter();
  const currentPath = usePathname();

  const onClickRouteHandler = (routePath) => {
    router.push(`/dashboard/${routePath}`);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const fadeInVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, x: 100, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.5,
      },
    },
  };

  const buttons = [
    {
      label: "Home",
      path: "",
      base: "bg-indigo-600 hover:bg-indigo-700",
      active: "bg-indigo-700",
    },
    {
      label: "Add Teacher",
      path: "add-teacher",
      base: "bg-red-800 hover:bg-red-900",
      active: "bg-indigo-700",
    },
    {
      label: "Generate Schedule",
      path: "generate-schedule",
      base: "bg-purple-600 hover:bg-purple-700",
      active: "bg-purple-700",
    },
    {
      label: "View Schedule",
      path: "view-schedule",
      base: "bg-green-600 hover:bg-green-700",
      active: "bg-green-700",
    },
  ];

  return (
    <div className="px-6 pt-6 relative z-20">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-3">
        <motion.h3
          className="text-2xl font-bold mb-2"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
        >
          {isLoggedIn
            ? `Welcome Admin: ${userData.name || userData.id}`
            : "Loading User..."}
        </motion.h3>

        <motion.p
          className="text-sm opacity-90"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          Manage your teachers and schedules easily
        </motion.p>

        <motion.div
          className="mt-4 flex items-center justify-between flex-wrap"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex gap-5 flex-wrap">
            {buttons.map((btn) => {
              const isActive =
                currentPath === `/dashboard/${btn.path}`;

              return (
                <motion.button
                  key={btn.label}
                  onClick={() => onClickRouteHandler(btn.path)}
                  className={`px-6 py-2 cursor-pointer text-[14px]  font-Inter rounded-lg  shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 ${
                    isActive ? btn.active : btn.base
                  }`}
                  variants={buttonVariant}
                >
                  {btn.label}
                </motion.button>
              );
            })}
          </div>

          <motion.div variants={fadeInVariant}>
            <LogoutComp />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardNav;
