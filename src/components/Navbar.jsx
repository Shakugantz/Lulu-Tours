import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "destinations",
        "tours",
        "gallery",
        "videos",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black bg-opacity-90 py-2 shadow-xl"
          : "bg-gradient-to-b from-black to-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="text-white font-bold text-4xl mr-3 cursor-pointer flex items-center transform transition-transform duration-300 hover:scale-105 hover:scale-110"
            onClick={scrollToTop}
          >
            {/*<img
              src={`${process.env.PUBLIC_URL}/Imagenes/logo.png`} // Asegúrate que este archivo esté en public/
              alt="Logo China"
              className="w-12 h-12 object-contain"
            />*/}
            <span className="italic">ViajeChina</span>
            <span className="text-yellow-400">con</span>
            <span className="italic mr-2">Lulu</span>
          </div>
        </div>

        {/* Menú desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {[
              "destinations",
              "tours",
              "gallery",
              "videos",
              "testimonials",
              "contact",
            ].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`relative px-2 py-1 text-white transition-colors duration-300 font-medium ${
                    activeSection === section
                      ? "text-yellow-400"
                      : "hover:text-yellow-400"
                  }`}
                >
                  {section === "destinations" && "Destinos"}
                  {section === "tours" && "Tours"}
                  {section === "gallery" && "Galería"}
                  {section === "videos" && "Videos"}
                  {section === "testimonials" && "Reseñas"}
                  {section === "contact" && "Contacto"}
                  {activeSection === section && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 animate-underline"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón del menú móvil */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 absolute top-full left-0 w-full z-40">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <button
                onClick={() => handleMobileLinkClick("destinations")}
                className="text-white hover:text-yellow-400"
              >
                Destinos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMobileLinkClick("tours")}
                className="text-white hover:text-yellow-400"
              >
                Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMobileLinkClick("gallery")}
                className="text-white hover:text-yellow-400"
              >
                Galería
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMobileLinkClick("videos")}
                className="text-white hover:text-yellow-400"
              >
                Videos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMobileLinkClick("testimonials")}
                className="text-white hover:text-yellow-400"
              >
                Reseñas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleMobileLinkClick("contact")}
                className="text-white hover:text-yellow-400"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
