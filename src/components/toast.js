"use client";

import React, { useEffect, useState } from "react";

export function Toast({ message, onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  
    setVisible(true);
  

    
    const timer = setTimeout(() => {
      setVisible(false); // trigger fade-out
      
      setTimeout(() => {
        onClose();
        console.log("Toast unmounted");
      }, 800); 
    }, duration);

    return () => {
      clearTimeout(timer);
  
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded z-50 bg-green-600 text-white transition-all duration-800 transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {message}
    </div>
  );
}
