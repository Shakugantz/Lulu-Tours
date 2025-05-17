import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AutoAwesome, CelebrationOutlined } from "@mui/icons-material";
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
        //setCurrentTestimonial(0); // Apuntar al primer comentario
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
              data-aos-duration="600"
            >
              <CelebrationOutlined
                className="w-5 h-5 text-yellow-400 mr-2 animate-pulse"
                fontSize="large"
              />
              Lo que Nuestros Viajeros Opinan
              <CelebrationOutlined
                className="w-5 h-5 text-yellow-400 ml-2 animate-pulse"
                fontSize="large"
              />
            </h2>
          </div>
          <p
            className="mt-4 text-white max-w-3xl mx-auto text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Cada opinión cuenta. Aquí puedes leer las experiencias reales de
            quienes ya vivieron nuestras aventuras por China y también dejar tu
            propia reseña. ¡Tu testimonio puede inspirar a otros a emprender su
            próximo gran viaje con nosotros!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <ReviewForm onReviewSubmitted={fetchTestimonials} />
          </div>

          <div className="w-full md:w-1/2 p-4" data-aos="fade-left">
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
              </Box>
            </div>

            <p className="text-white italic text-center text-xl mb-6 z-10">
              "{testimonial.comment}"
            </p>
            <p className="font-bold text-center text-gray-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#6366f1] dark:to-[#a855f7] text-lg">
              - {testimonial.name}
            </p>

            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <ArrowBackIosNewIcon className="text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-full shadow-md hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <ArrowForwardIosIcon className="text-gray-600" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-yellow-500 w-6"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
