const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="bg-blue-700 inset-shadow-gray-500 transition-transform hover:scale-105 rounded-xl p-3 space-y-4 mb-10 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
        alt={movie.Title}
        className="w-full h-64 object-fill rounded-xl"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-100">{movie.Title}</h3>
        <p className="text-gray-200 text-sm">
          <span className="text-sm font-semibold text-white tracking-wider">
            YEAR:{" "}
          </span>
          {movie.Year}
        </p>
      </div>
      <div>
        <button className="bg-stone-900 border border-gray-200 text-white cursor-pointer hover:bg-stone-800 transition-colors rounded-lg w-full py-2">
          View Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
