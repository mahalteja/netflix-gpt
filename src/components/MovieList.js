import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="flex flex-col w-full gap-2 pt-16 pl-8  ">
      <h1 className="font-semibold text-2xl text-white">{title}</h1>
      <div className="flex w-full overflow-x-scroll gap-4 hide-scrollbar ">
        {movies?.map((item) => (
          <MovieCard key={item.id} img_path={item.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
