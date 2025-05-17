import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

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
            className="text-white font-bold text-4xl mr-3 cursor-pointer flex items-center transform transition-transform duration-300 hover:scale-110"
            onClick={scrollToTop}
          >
            <span className="italic">ViajeChina</span>
            <span className="text-yellow-400">con</span>
            <span className="italic mr-2">Lulu</span>
          </div>
        </div>

        {/* Menú desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
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

          {/* Botón Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 text-white hover:text-yellow-400 transition-colors"
            title="Modo Oscuro"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71M21 12a9 9 0 11-9-9"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Menú móvil */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleDarkMode}
            className="mr-4 text-white hover:text-yellow-400"
            title="Modo Oscuro"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71M21 12a9 9 0 11-9-9"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            )}
          </button>

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
                  onClick={() => handleMobileLinkClick(section)}
                  className="text-white hover:text-yellow-400"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
