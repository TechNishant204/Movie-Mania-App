import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/Services";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // To access search state

  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async () => {
      setError("");
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getMovieDetails();
  }, [id]);

  const goBackToSearch = () => {
    navigate("/", {
      state: {
        searchTerm: location.state?.searchTerm,
        page: location.state?.page,
        type: location.state?.type,
      },
    });
  };

  if (error) return <p className="text-red-500">{error}</p>;

  if (!movie)
    return (
      <p className="text-blue-500 font-poppins h-screen flex justify-center items-center ">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-800 text-white px-8 md:px-12 flex justify-center items-center ">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full md:w-2/3 lg:w-3/4 border-1 border-gray-100 sm:justify-center rounded-4xl relative px-4 my-2 md:my-8">
        <div className="flex flex-col md:flex-row font-poppins py-12">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full md:w-1/3 p-4 md:p-8 object-fill rounded-xl drop-shadow-2xl"
          />
          <div className="md:ml-4 space-y-3">
            <h1 className="text-5xl font-bold mt-4 mb-8">{movie.Title}</h1>
            <p className="text-gray-200">
              <span className="font-bold">Year : </span> {movie.Year}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Genre : </span> {movie.Genre}
            </p>
            <p className="text-gray-200">
              <span className="font-bold">Actors : </span> {movie.Actors}
            </p>
            <p className="text-justify">
              <span className="font-bold">About :</span> {movie.Plot}
            </p>
            <div className="text-gray-200">
              <span className="font-bold">Ratings :</span>
              <ul className="list-disc list-inside">
                {movie.Ratings.map((r, index) => (
                  <li key={index} className="mt-1">
                    <span className="font-semibold">{r.Source}:</span> {r.Value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          onClick={goBackToSearch}
          type="button"
          className="absolute top-4 left-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back to search results
        </button>
      </div>
    </div>
  );
};

export default MovieDetailPage;
