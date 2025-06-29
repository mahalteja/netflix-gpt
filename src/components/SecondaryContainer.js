import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);


  return (
    <div className="-mt-40 md:-mt-24 lg:-mt-72 relative z-20">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"Popular"} movies={movies.popular} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
    </div>
  );
};

export default SecondaryContainer;
