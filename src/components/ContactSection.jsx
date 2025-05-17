import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SvgIcon from "@mui/material/SvgIcon";
import { IconButton, Stack } from "@mui/material";
import {
  MarkEmailRead,
  NearMe,
  ContactMail,
  Navigation,
} from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser"; // ← ¡Importante!

const WeChatIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zM7 9a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2zm3 4a1 1 0 110-2 1 1 0 010 2zm-6 0a1 1 0 110-2 1 1 0 010 2z" />
  </SvgIcon>
);

const TikTokIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M16 1h2a5 5 0 005 5v2a7 7 0 01-5-2v8.5A5.5 5.5 0 0112.5 20 5.5 5.5 0 0110 9.7V7h2v2.7A3.5 3.5 0 0015 13V1z" />
  </SvgIcon>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "smtp_126_com", // ← reemplaza
        "template_ofb8gxk", // ← reemplaza
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "pzhHRfLyK6EyDiEcf" // ← reemplaza
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setIsSubmitting(false);
          setSubmitStatus("success");
          setFormData({ name: "", email: "", message: "" });

          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setIsSubmitting(false);
          setSubmitStatus("error");
        }
      );
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br to-gray-100 relative overflow-hidden mb-24"
    >
      <div className="container mx-auto px-6 lg:flex lg:items-center lg:justify-between">
        <div
          className="bg-white rounded-3xl shadow-2xl p-10 lg:w-1/2 z-10"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center tracking-tight">
            Contáctanos
            <ContactMail fontSize="large" className="text-red-400 ml-2" />
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-500/50 focus:outline-none transition-all"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Tu correo electrónico"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-500/50 focus:outline-none transition-all"
              />
            </div>
            <div className="relative">
              <FaCommentDots className="absolute left-4 top-4 text-gray-400" />
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tu mensaje"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-yellow-500/50 focus:outline-none transition-all resize-none"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-500 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 shadow-xl hover:shadow-2xl"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              {isSubmitting ? (
                <Navigation className="w-4 h-4 ml-2" />
              ) : (
                <NearMe className="w-4 h-4 ml-2" />
              )}
            </motion.button>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-center shadow"
              >
                ¡Mensaje enviado con éxito!
                <MarkEmailRead className="w-4 h-4 ml-2" />
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-center shadow"
              >
                Hubo un error al enviar el mensaje. Inténtalo de nuevo.
              </motion.div>
            )}
          </form>

          <div className="mt-10" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-center text-xl font-semibold text-gray-700 mb-4">
              Síguenos en:
            </h3>
            <Stack
              direction="row"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              {[
                {
                  icon: <InstagramIcon fontSize="large" />,
                  href: "https://www.instagram.com/viajechinaconlulu?igsh=Z3BycXl6M3JicWly&utm_source=qr",
                  color: "#E1306C",
                  label: "Instagram",
                },
                {
                  icon: <FacebookIcon fontSize="large" />,
                  href: "https://www.facebook.com/viajechinaconlulu",
                  color: "#1877F2",
                  label: "Facebook",
                },
                {
                  icon: <WhatsAppIcon fontSize="large" />,
                  href: "https://wa.me/8613683676407?text=Hola,%20estoy%20interesado%20en%20tus%20viajes%20a%20China.",
                  color: "#25D366",
                  label: "WhatsApp",
                },
                {
                  icon: <WeChatIcon fontSize="large" />,
                  href: "#",
                  color: "#09b83e",
                  label: "WeChat",
                },
                {
                  icon: <TikTokIcon fontSize="large" />,
                  href: "www.tiktok.com/@viajechinaconlulu666",
                  color: "#010101",
                  label: "TikTok",
                },
                {
                  icon: <YouTubeIcon fontSize="large" />,
                  href: "https://www.youtube.com/@Viajechinaconlulu",
                  color: "#FF0000",
                  label: "YouTube",
                },
              ].map((social, i) => (
                <div key={i} className="flex flex-col items-center">
                  <IconButton
                    aria-label={social.label}
                    href={social.href}
                    target="_blank"
                    sx={{
                      color: social.color,
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.2)" },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                  <span className="text-sm text-gray-600 mt-1">
                    {social.label}
                  </span>
                </div>
              ))}
            </Stack>
          </div>
        </div>

        <div
          className="hidden lg:block lg:w-1/2 pl-12"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <img
            src={`${process.env.PUBLIC_URL}/Imagenes/greatwall.gif`}
            alt="Contacto animado"
            className="rounded-3xl shadow-2xl object-cover w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
