import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const AllGames = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
  const [developerFilter, setDeveloperFilter] = useState("All");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch all games
  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      });
  }, []);

  // Filter & Sort
  useEffect(() => {
    let updated = [...games];

    // Filter
    if (developerFilter !== "All") {
      updated = updated.filter((g) => g.developer === developerFilter);
    }

    // Sort
    if (sortOrder === "asc") {
      updated.sort((a, b) => a.ratings - b.ratings);
    } else if (sortOrder === "desc") {
      updated.sort((a, b) => b.ratings - a.ratings);
    }

    setFilteredGames(updated);
  }, [sortOrder, developerFilter, games]);

  // Get unique developers for filter dropdown
  const developers = ["All", ...new Set(games.map((g) => g.developer))];

  const handleViewDetails = (id) => {
    navigate(`/games/${id}`);
  };

  return (
    <section className="w-11/12 mx-auto mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#D72050] p-16">
        🎮 All Games
      </h2>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <label className="font-semibold mr-2">Filter by Developer:</label>
          <select
            value={developerFilter}
            onChange={(e) => setDeveloperFilter(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            {developers.map((dev, idx) => (
              <option key={idx} value={dev}>
                {dev}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2">Sort by Ratings:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="">None</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-slate-100 border border-slate-300 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={game.coverPhoto}
              alt={game.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Developer:</span> {game.developer}
              </p>
              <p className="text-yellow-500 font-semibold mb-4">⭐ {game.ratings}</p>
              <button
                onClick={() => handleViewDetails(game.id)}
                className="inline-block bg-[#D72050] hover:bg-[#b60534] text-white px-4 py-2 rounded-md transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllGames;
