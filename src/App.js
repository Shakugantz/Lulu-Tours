import React from 'react';
import Navbar from './components/Navbar';
import DestinationsCarousel from './components/DestinationsCarousel';
import ToursSection from './components/ToursSection';
import GallerySection from './components/GallerySection';
import VideosSection from './components/VideosSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import ContactSection from './components/ContactSection';
import ReviewForm from './components/ReviewForm';
import Background from './components/Background';
import "./index.css";

const App = () => {
  return (
    <div className="relative font-sans text-gray-800">
      {/* Fondo mágico */}
      <Background />

      {/* Contenido principal por encima del fondo */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <DestinationsCarousel />
          <ToursSection />
          <GallerySection />
          <VideosSection />
          <TestimonialsCarousel />
           {/*<ReviewForm />*/}
          <ContactSection />
        </main>
        <footer className="bg-gradient-to-b from-black/0 to-black text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} TourChina con Lulu - Todos los derechos reservados</p>
            <p className="mt-2 text-gray-400">Diseñado con ❤️ para amantes de los viajes turísticos</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
