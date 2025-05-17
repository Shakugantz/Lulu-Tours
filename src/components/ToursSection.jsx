import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toursData from "../mock/tours";
import {
  AutoAwesome,
  WorkspacePremium,
  AirplanemodeActiveOutlined,
} from "@mui/icons-material";
import ReservationModal from "./ReservationModal";

const ToursSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showAll, setShowAll] = useState(false); // Estado para controlar si se muestran todos los tours

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const openModal = (tour) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  // Mostrar los primeros 3 tours o todos si 'showAll' es verdadero
  const toursToShow = showAll ? toursData : toursData.slice(0, 3);

  return (
    <section id="tours" className="py-20">
      <div className="container mx-auto px-4" data-aos="fade-left">
        <div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            <h2
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
              data-aos="zoom-in-up"
              data-aos-duration="600"
            >
              <AutoAwesome
                className="w-5 h-5 text-yellow-400 mr-4 animate-ping-slow"
                fontSize="large"
              />
              Nuestros Tours
              <AutoAwesome
                className="w-5 h-5 text-yellow-400 ml-4 animate-ping-slow"
                fontSize="large"
              />
            </h2>
          </div>
          <p
            className="mt-4 text-white max-w-3xl mx-auto text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Descubre experiencias inolvidables cuidadosamente diseñadas para que
            vivas lo mejor de China. Desde paisajes naturales hasta ciudades
            llenas de historia, nuestros tours combinan cultura, aventura y
            comodidad.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {toursToShow.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2"
              data-aos="fade-up"
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-2xl font-bold text-white">{tour.name}</h3>
                  <p className="text-white">{tour.description}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-500 mb-4">{tour.duration}</p>
                <ul className="mb-4">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <svg
                        className="w-4 h-4 text-yellow-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(tour)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  ¡Reservar ahora!
                  <WorkspacePremium className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botones Mostrar más / Mostrar menos */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-2 px-6 rounded-lg hover:bg-gradient-to-l transition-colors duration-300"
          >
            {showAll ? "Mostrar menos" : "Mostrar más"}
          </button>
        </div>
      </div>

      {/* Modal de reserva */}
      {modalOpen && selectedTour && (
        <ReservationModal
          tour={selectedTour}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ToursSection;
