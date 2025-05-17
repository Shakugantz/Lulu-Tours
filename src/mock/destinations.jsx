const destinations = [
  {
    id: 1,
    name: "Gran Muralla China",
    description:
      "La construcción más larga del mundo con más de 21,000 km. Perfecta para cuando necesitas un muro... pero épico.",
    image: `${process.env.PUBLIC_URL}/Imagenes/Muralla_china.png`,
    price: "Desde $500 USD",
  },
  {
    id: 2,
    name: "Ciudad Prohibida",
    description:
      "El complejo palaciego más grande del mundo. Prohibido para plebeyos desde 1420 (pero a ti te dejamos entrar).",
    image: `${process.env.PUBLIC_URL}/Imagenes/Ciudad_prohibida.png`,
    price: "Desde $350 USD",
  },
  {
    id: 3,
    name: "Palacio de Verano",
    description:
      "El jardín imperial más grande de China. Donde los emperadores veraneaban... y tú también puedes, sin necesidad de gobernar un imperio.",
    image: `${process.env.PUBLIC_URL}/Imagenes/Palacio_verano.png`,
    price: "Desde $320 USD",
  },
  {
    id: 4,
    name: "Templo del Cielo",
    description:
      "Aquí los emperadores pedían buenas cosechas. Tú solo pide buenas fotos (y que no llueva).",
    image: `${process.env.PUBLIC_URL}/Imagenes/Templo_cielo.png`,
    price: "Desde $300 USD",
  },
];

export default destinations;
