import React, { useState, useEffect } from "react";
import galleryData from "../mock/gallery";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Cancel,
  CameraEnhanceOutlined,
  AutoAwesome,
} from "@mui/icons-material";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const containerWidth =
          document.querySelector(".gallery-container")?.scrollWidth || 0;
        const visibleWidth =
          document.querySelector(".gallery-container")?.clientWidth || 0;
        const maxScroll = containerWidth - visibleWidth;
        return prev >= maxScroll ? 0 : prev + 1;
      });
    }, 30);
    setScrollInterval(interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = document.querySelector(".gallery-container");
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleMouseEnter = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const handleMouseLeave = () => {
    if (!scrollInterval) {
      const interval = setInterval(() => {
        setScrollPosition((prev) => {
          const containerWidth =
            document.querySelector(".gallery-container")?.scrollWidth || 0;
          const visibleWidth =
            document.querySelector(".gallery-container")?.clientWidth || 0;
          const maxScroll = containerWidth - visibleWidth;
          return prev >= maxScroll ? 0 : prev + 1;
        });
      }, 30);
      setScrollInterval(interval);
    }
  };

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            <h2
              //className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 tracking-wide flex items-center justify-center gap-2"
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
              data-aos="zoom-in-up"
              data-aos-duration="600"
            >
              <CameraEnhanceOutlined
                className="w-6 h-6 text-yellow-400 animate-bounce mr-2"
                fontSize="large"
              />
              Recuerdos Inolvidables
              <CameraEnhanceOutlined
                className="w-6 h-6 text-yellow-400 animate-bounce ml-2"
                fontSize="large"
              />
            </h2>
          </div>
          <p
            className="mt-4 text-white max-w-3xl mx-auto text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Momentos únicos capturados junto a nuestros viajeros. Cada sonrisa,
            cada paisaje y cada aventura son parte de esta historia que vivimos
            juntos. ¡Disfruta este recorrido visual lleno de emoción y
            recuerdos!
          </p>
        </div>
        <div
          className="gallery-container flex overflow-x-hidden space-x-4 py-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-aos="zoom-in"
        >
          {[...galleryData, ...galleryData].map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              onClick={() => setSelectedImage(photo)}
              className="group flex-none w-100 h-80 relative overflow-hidden rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold">{photo.title}</h3>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-200">
                    {photo.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-auto">
            <div className="relative max-w-4xl w-full max-h-screen flex flex-col items-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-yellow-600 hover:text-red-500 transition-colors duration-300"
              >
                <Cancel fontSize="large" />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
