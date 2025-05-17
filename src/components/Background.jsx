import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Background = () => {
  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 animate-gradient bg-[length:400%_400%] transition-all duration-1000 ease-in-out"
      data-aos="fade-in"
    >
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-blue-500 to-purple-600 opacity-80 blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-sm"></div>
    </div>
  );
};

export default Background;
