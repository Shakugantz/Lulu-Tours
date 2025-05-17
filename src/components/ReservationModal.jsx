import React, { useState } from "react";
import { CheckCircle } from "@mui/icons-material";

const ReservationModal = ({ tour, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al backend o almacenarlos en el estado
    setIsSubmitted(true);

    // Simula una espera de 3 segundos antes de cerrar el modal
    setTimeout(() => {
      onClose();
    }, 2000); // 2 segundos de espera antes de cerrar el modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-full sm:w-96">
        {isSubmitted ? (
          <div className="text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-500">
              ¡Reservación realizada!
            </h3>
            <p className="mt-2 text-gray-600">
              Gracias, tu reserva ha sido confirmada.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-center mb-4">
              Reserva Tour
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="email">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="date">
                  Fecha de la reserva
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 bg-gray-400 text-white py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/3 bg-yellow-500 text-white py-2 rounded-lg"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationModal;
