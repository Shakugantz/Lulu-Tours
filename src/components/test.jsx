import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AutoAwesome } from "@mui/icons-material";
import ReviewForm from "./ReviewForm";
import { db, collection, getDocs } from "../Firebase";
import { Rating, Box } from "@mui/material";

// Imagen por defecto si no hay imagen del usuario
const defaultImage =
  "https://media.giphy.com/media/26gsspf0Cj8Z6lWVa/giphy.gif";

const TestimonialsCarousel = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const testimonials = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTestimonialsData(testimonials);

      // Mostrar directamente el comentario recién agregado (el último)
      if (testimonials.length > 0) {
        setCurrentTestimonial(testimonials.length - 1);
      }
    } catch (error) {
      console.error("Error al obtener testimonios:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlay && testimonialsData.length > 0) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonialsData.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, testimonialsData]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const prevTestimonial = () => {
    goToTestimonial(
      currentTestimonial === 0
        ? testimonialsData.length - 1
        : currentTestimonial - 1
    );
  };

  const nextTestimonial = () => {
    goToTestimonial(
      currentTestimonial === testimonialsData.length - 1
        ? 0
        : currentTestimonial + 1
    );
  };

  if (testimonialsData.length === 0) {
    return (
      <p className="text-white text-center mt-10">Cargando testimonios...</p>
    );
  }

  const testimonial = testimonialsData[currentTestimonial];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            <h2
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
              data-aos="zoom-in-up"
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <p
            className="mt-2 text-white max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
            data-aos="zoom-in-up"
          >
            <AutoAwesome className="w-5 h-5 text-yellow-400" />
            Reseñas de nuestros clientes que disfrutaron de nuestros tours
            profesionales
            <AutoAwesome className="w-5 h-5 text-yellow-400" />
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <ReviewForm onReviewSubmitted={fetchTestimonials} />
          </div>

          <div
            className="w-full md:w-1/2 bg-transparent rounded-xl shadow-lg p-8 relative overflow-hidden z-10"
            data-aos="fade-left"
          >
            <div className="flex justify-center mb-4">
              <img
                src={testimonial.imageUrl || defaultImage}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            </div>

            <div className="flex justify-center mb-2">
              {/* Usar Rating de Material UI */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="read-only"
                  value={testimonial.rating}
                  precision={0.5}
                  readOnly
                  size="large"
                  sx={{ color: "#fbbf24" }} // Color amarillo
                />
                <Box sx={{ ml: 2 }}>{testimonial.rating}</Box>
              </Box>
            </div>

            <p className="text-white text-lg italic text-center mt-4">
              "{testimonial.comment}"
            </p>
          </div>

          <div className="flex justify-between w-full mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-gray-600 text-white p-3 rounded-full"
            >
              <ArrowBackIosNewIcon />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-600 text-white p-3 rounded-full"
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
