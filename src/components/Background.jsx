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
      {/* Fondo para modo claro */}
      <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-blue-500 to-purple-600 opacity-80 blur-sm dark:hidden"></div>

      {/* Fondo para modo oscuro */}
      <div className="hidden dark:block w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 blur-sm"></div>

      {/* Capa de desenfoque igual en ambos modos */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 dark:from-black/30 dark:to-black/0 backdrop-blur-sm"></div>
    </div>
  );
};

export default Background;
