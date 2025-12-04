import React from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import game1 from '../assets/img/d1.webp';
import game2 from '../assets/img/d8.webp';
import game3 from '../assets/img/kasra-askari-NTGQxXpNnj8-unsplash.jpg';

const FeaturedGames = () => {
  return (
    <section className="w-11/12 mx-auto my-16">
      {/* Beautiful Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-[#D72050]  ">
          Featured Games
        </h2>
        <p className="text-black mt-2 text-lg md:text-xl">
          Explore the most popular games handpicked for you
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
          <img src={game1} alt="Battle Arena" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500 group-hover:opacity-100">
            <h3 className="text-2xl font-bold text-white mb-2">Battle Arena</h3>
            <p className="text-gray-300 mb-4">Fight in epic arenas and show your skill.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar /> 4.8
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlay /> Play Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
          <img src={game2} alt="Adventure Quest" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500 group-hover:opacity-100">
            <h3 className="text-2xl font-bold text-white mb-2">Adventure Quest</h3>
            <p className="text-gray-300 mb-4">Explore mystical worlds full of treasures.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar /> 4.7
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlay /> Play Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
          <img src={game3} alt="Space Odyssey" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transition-opacity duration-500 group-hover:opacity-100">
            <h3 className="text-2xl font-bold text-white mb-2">Space Odyssey</h3>
            <p className="text-gray-300 mb-4">Travel through the cosmos and complete missions.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400">
                <FaStar /> 4.9
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <FaPlay /> Play Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedGames;
