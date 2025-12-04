import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiHome, FiList, FiUser, FiSettings } from "react-icons/fi";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const { user } = useContext(AuthContext);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((g) => g.id === id);
        setGame(found);

        // gallery fallback
        if (found) {
          setActiveImage(0);
        }
      });
  }, [id]);

  if (!game) return <p className="text-center mt-10">Loading...</p>;

  // 3 image array (from card)
  const images = game.gallery?.length
    ? game.gallery.slice(0, 3)
    : [game.coverPhoto, game.coverPhoto, game.coverPhoto];

  const chartData = [
    { name: "1 Star", value: game.reviews?.star1 || 10 },
    { name: "2 Star", value: game.reviews?.star2 || 20 },
    { name: "3 Star", value: game.reviews?.star3 || 40 },
    { name: "4 Star", value: game.reviews?.star4 || 80 },
    { name: "5 Star", value: game.reviews?.star5 || 120 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-6 hidden md:block sticky top-0 h-screen overflow-y-auto">
        <h1 className="text-xl font-bold mb-8">eGamer</h1>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
            <FiHome /> Dashboard
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
            <FiList /> Games List
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
            <FiUser /> Creator Profile
          </li>
          <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
            <FiSettings /> Settings
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-16">
        <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Game Details</h2>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* ========== LEFT IMAGE GALLERY (NO SWIPER) ========== */}
            <div className="lg:w-1/2">

              {/* Main Image */}
              <div className="bg-gray-100 shadow rounded-lg p-6 flex justify-center">
                <img
                  src={images[activeImage]}
                  className="rounded-lg h-[320px] object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-md border object-cover cursor-pointer 
                      ${activeImage === idx ? "ring-2 ring-blue-600" : "hover:ring-2 ring-blue-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* ========== RIGHT DETAILS ========== */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>

              <p className="text-gray-600 mb-4">
                {game.shortDescription || "Experience immersive next-gen gameplay with stunning graphics."}
              </p>

              <div className="flex items-center gap-5 mb-4">
                <p className="text-2xl font-bold text-blue-600">${game.price || "19.99"}</p>

                <div className="flex items-center text-yellow-500">
                  ⭐ <span className="ml-1 font-medium text-black">{game.ratings} / 5</span>
                </div>

                <p className="text-gray-500 text-sm">(500+ Reviews)</p>
              </div>

              <p className="font-medium text-gray-700 mb-4">
                Developer: <span className="text-black">{game.developer}</span>
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href={game.downloadLink}
                  target="_blank"
                  className="px-6 py-3 text-white rounded-lg bg-[#D72050] hover:bg-[#b60534] transition"
                >
                  Download Now
                </a>

                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                  Add to Wishlist
                </button>
              </div>

              {!user && (
                <p className="mt-4 text-sm text-gray-500">
                  Login to save this game to your favorites.
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-10">
            <div className="flex gap-6 border-b pb-2">
              <button className="font-semibold pb-2">Description</button>
            </div>

            <p className="mt-5 text-gray-700 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* CHART */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Ratings Overview</h3>

            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameDetails;
