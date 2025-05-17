import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Rating } from "@mui/material";
import { NearMe, Star, Cancel } from "@mui/icons-material";
import { db, storage, collection, addDoc } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const labels = {
  0.5: "Mal",
  1: "Pobre",
  1.5: "Un poco Regular",
  2: "Regular",
  2.5: "Aceptable",
  3: "Muy Aceptable",
  3.5: "Bueno",
  4: "Muy Bueno",
  4.5: "Excelente",
  5: "Perfecto",
};

function getLabelText(value) {
  return `${value} Estrella${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewForm = ({ onReviewSubmitted }) => {
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [hover, setHover] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReview((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setReview((prev) => ({ ...prev, image: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.rating < 0.5) {
      setRatingError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (review.image) {
        const imageRef = ref(
          storage,
          `profile-images/${Date.now()}_${review.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, review.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "reviews"), {
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        imageUrl: imageUrl,
        timestamp: new Date(),
      });

      setSubmitted(true);
      setReview({ name: "", rating: 0, comment: "", image: null });
      setPreviewImage(null);
      setRatingError(false);
      if (fileInputRef.current) fileInputRef.current.value = null;

      // Notifica al padre que debe refrescar
      if (onReviewSubmitted) onReviewSubmitted();

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto mt-20 mb-20"
      data-aos="fade-up"
    >
      <div
        className="w-full p-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100"
        data-aos="fade-right"
      >
        <div
          className="flex items-center justify-center gap-2 mb-6"
          data-aos="zoom-in"
        >
          <Star className="text-yellow-500" fontSize="large" />
          <h3 className="text-3xl font-extrabold text-gray-800 text-center">
            Comparte tu experiencia
          </h3>
          <Star className="text-yellow-500" fontSize="large" />
        </div>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center shadow-md">
            ¡Gracias por tu reseña! Estará visible pronto.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Tu foto (opcional):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
              />
              {previewImage && (
                <div className="relative inline-block mt-4">
                  <img
                    src={previewImage}
                    alt="Vista previa"
                    className="w-24 h-24 rounded-full object-cover border shadow-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 shadow-md"
                    title="Eliminar imagen"
                  >
                    <Cancel fontSize="large" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Tu nombre:
              </label>
              <input
                type="text"
                name="name"
                value={review.name}
                onChange={handleChange}
                required
                placeholder="Nombre"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Tu calificación:
              </label>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="hover-feedback"
                  value={review.rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setReview((prev) => ({ ...prev, rating: newValue }));
                    setRatingError(false);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {review.rating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : review.rating]}
                  </Box>
                )}
              </Box>
              {ratingError && (
                <p className="text-red-500 text-sm mt-1">
                  Debes seleccionar al menos media estrella.
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Tu experiencia:
              </label>
              <textarea
                name="comment"
                rows="4"
                value={review.comment}
                onChange={handleChange}
                required
                placeholder="Comentario..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600"
              } text-white font-bold py-3 rounded-lg transition-colors shadow-md flex justify-center items-center`}
            >
              {isSubmitting ? "Enviando..." : "Enviar Reseña"}
              {!isSubmitting && <NearMe className="w-4 h-4 ml-2" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
