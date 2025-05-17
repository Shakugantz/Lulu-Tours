import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import videosData from "../mock/videos";
import {
  AutoAwesome,
  Cancel,
  VideoCameraBackOutlined,
} from "@mui/icons-material";

const VideosSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const videosToShow = showAll ? videosData : videosData.slice(0, 6);

  return (
    <section id="videos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center lg:mb-8 mb-2 px-[5%]">
          <div className="inline-block relative group">
            <h2
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
              data-aos="zoom-in-up"
              data-aos-duration="600"
            >
              <VideoCameraBackOutlined
                className="w-5 h-5 text-yellow-400 mr-2 animate-spin"
                fontSize="large"
              />
              Explora China en Movimiento
              <VideoCameraBackOutlined
                className="w-5 h-5 text-yellow-400 ml-2 animate-spin"
                fontSize="large"
              />
            </h2>
          </div>
          <p
            className="mt-4 text-white max-w-3xl mx-auto text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            Sumérgete en la magia de nuestros viajes a través de estos videos.
            Cada escena muestra la emoción de nuestros clientes, los paisajes
            más espectaculares y los momentos que hacen de cada tour una
            experiencia única e inolvidable.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="fade-up"
        >
          {videosToShow.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:brightness-105 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center relative overflow-hidden group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-80 h-60 rounded-lg transition-transform duration-500 ease-in-out group-hover:brightness-125"
                />
                {/*<span className="text-lg text-indigo-600 font-bold">
                  ▶ Ver video
                </span>*/}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {video.title}
                </h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {videosData.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
            >
              {showAll ? "Mostrar menos" : "Mostrar más"}
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full p-4 relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 text-yellow-600 hover:text-red-500 transition-colors duration-300"
              >
                <Cancel fontSize="large" />
              </button>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-80 rounded"
                ></iframe>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-600">{selectedVideo.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideosSection;
