import React, { useState, useEffect } from "react";
import destinationsData from "../mock/destinations";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AOS from "aos";
import "aos/dist/aos.css";
import { Language } from "@mui/icons-material";

const DestinationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === destinationsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    goToSlide(
      currentIndex === 0 ? destinationsData.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    goToSlide(
      currentIndex === destinationsData.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section id="destinations" className="relative py-16">
      {/* Fondo con filtro de desenfoque */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-0"
        style={{
          backgroundImage: `url(${destinationsData[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) blur(5px)", // Efecto blanco y negro y borroso en el fondo
          transition: "filter 1s ease-in-out",
        }}
      ></div>

      {/* Contenido del carrusel */}
      <div
        className="container mx-auto px-4 relative z-10 max-w-screen-xl"
        data-aos="zoom-in"
      >
        <div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            {/* Div vacío para mantener el espacio del título */}
            <div className="h-[40px] md:h-[40px]"></div>
          </div>
        </div>
        {/*<div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            <h2
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
              data-aos="zoom-in-up"
              data-aos-duration="600"
            >
              Destinos Imperdibles
            </h2>
          </div>
          <p
            className="mt-2 text-white max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <Language className="w-5 h-5 text-blue-400" />
            Destinos imperdibles
            <Language className="w-5 h-5 text-blue-400" />
          </p>
        </div>*/}
        <div className="relative overflow-hidden rounded-xl shadow-lg max-w-full mx-auto">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {destinationsData.map((destination) => (
              <div
                key={destination.id}
                className="w-full flex-shrink-0 relative"
              >
                <div className="aspect-w-16 aspect-h-9 lg:aspect-h-6">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {destination.name}
                  </h3>
                  <p className="mb-4">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas con MUI */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
            aria-label="Anterior"
          >
            <ArrowBackIosNewIcon className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
            aria-label="Siguiente"
          >
            <ArrowForwardIosIcon className="text-gray-700" />
          </button>

          {/* Puntos */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {destinationsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsCarousel;
