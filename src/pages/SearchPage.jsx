import { useState, useEffect } from "react";
import { fetchMovies } from "../services/Services";
import { useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialSearchTerm = location.state?.searchTerm || "";
  const initialPage = location.state?.page || 1;
  const initialType = location.state?.type || "";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");
  const [type, setType] = useState(initialType);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialSearchTerm) {
      setMovies([]);
      setTotalResults(0);
      setPage(1);
      setError("");
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(page);
    }
  }, [searchTerm, page, type]);

  const searchMovies = async (page) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMovies(searchTerm, page, type);
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults, 10));
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]);
    setPage(1);
    searchMovies(1);
  };

  const handleFilterChange = (e) => {
    setType(e.target.value);
    setPage(1);
    setMovies([]);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`, {
      state: {
        searchTerm,
        page,
        type,
      },
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (movies.length > 0 && movies.length < totalResults) {
      setPage(page + 1);
    }
  };

  const handleHomePage = () => {
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8 bg-gray-900 px-8 md:px-4 ">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row justify-center mb-4 font-poppins"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="border-2 border-gray-200 hover:border-blue-500 bg-white outline-none rounded-t-md md:rounded-l-md md:rounded-t-none p-2 md:p-4 w-full max-w-md"
        />
        <button
          type="submit"
          className="text-black hover:font-medium bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm  px-6 md:px-8 py-3 md:py-2 rounded-b-md md:rounded-r-md md:rounded-b-none"
        >
          Search
        </button>
      </form>
      {/* */}
      <div className="mb-8 flex justify-center ">
        <select
          onChange={handleFilterChange}
          value={type}
          className="border-2  text-white cursor-pointer border-gray-400 mb-4 md:mb-8 rounded-lg p-2 font-poppins font-bold outline-none hover:border-white"
        >
          <option className="text-black" value="">
            All
          </option>
          <option className="text-black" value="movie">
            Movies
          </option>
          <option className="text-black" value="series">
            Series
          </option>
          <option className="text-black" value="episode">
            Episodes
          </option>
        </select>
      </div>

      {error && (
        <p className="text-red-500 text-center pb-10 font-poppins font-bold">
          {error}
        </p>
      )}
      {!error && movies.length === 0 && !loading && (
        <p className="text-red-500 text-center pb-10 font-poppins text-4xl font-bold">
          No results found.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-col-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-8 ">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>

      {loading && (
        <p className="text-blue-500 font-poppins mt-4 text-center">
          Loading more movies...
        </p>
      )}

      {movies.length > 1 && (
        <div className="flex w-full justify-center ">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleHomePage}
            className="bg-blue-500 text-white px-4 py-2 mx-2 rounded"
          >
            Home
          </button>
          <button
            onClick={handleNextPage}
            disabled={movies.length === 0 || movies.length >= totalResults}
            className="bg-blue-600 text-white px-4 py-2 mx-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
