import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";

function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 py-6 ">
        <h1 className="font-orbitron font-bold text-black text-center text-4xl uppercase tracking-wider">
          Movies Mania
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
