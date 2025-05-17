const tours = [
  {
    id: 1,
    name: "Tour Gran Muralla China",
    description:
      "Visita los palacios y templos más importantes con guía experto.",
    price: "$1200 USD",
    duration: "7 días",
    includes: [
      "Alojamiento 5 estrellas",
      "Comidas gourmet",
      "Transporte privado",
    ],
    image: `${process.env.PUBLIC_URL}/Imagenes/Muralla_china.png`,
  },
  {
    id: 2,
    name: "Tour Ciudad Prohibida",
    description:
      "Crucero por el río más largo de Asia + trekking en las montañas.",
    price: "$950 USD",
    duration: "5 días",
    includes: ["Crucero de lujo", "Guías bilingües", "Equipo de trekking"],
    image: `${process.env.PUBLIC_URL}/Imagenes/Ciudad_prohibida.png`,
  },
  {
    id: 3,
    name: "Tour Palacio de Verano",
    description:
      "Recorrido por las plantaciones de té con catas y ceremonias tradicionales.",
    price: "$750 USD",
    duration: "4 días",
    includes: [
      "Clases de preparación",
      "Visita a fábricas",
      "Regalos especiales",
    ],
    image: `${process.env.PUBLIC_URL}/Imagenes/Palacio_verano.png`,
  },
  {
    id: 4,
    name: "Tour Templo del Cielo",
    description:
      "Recorrido por las plantaciones de té con catas y ceremonias tradicionales.",
    price: "$750 USD",
    duration: "4 días",
    includes: [
      "Clases de preparación",
      "Visita a fábricas",
      "Regalos especiales",
    ],
    image: `${process.env.PUBLIC_URL}/Imagenes/Templo_cielo.png`,
  },
];

export default tours;
