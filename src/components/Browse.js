import { use } from "react";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import { useSelector } from "react-redux";
import GPTSearch from "./GPTSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGPTSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  return (
    <div className="bg-black">
      <Header />
      {!showGptSearch ? (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      ) : (
        <GPTSearch />
      )}
    </div>
  );
};

export default Browse;
