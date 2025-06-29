import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { gptMoviesNames, gptMovieResults } = useSelector((store) => store.gpt);
  console.log(gptMoviesNames);
  if (!gptMoviesNames) return null;
  return (
    <div className="flex flex-col w-full">
      {gptMoviesNames.map((item, index) => (
        <MovieList
          title={gptMoviesNames[index]}
          movies={gptMovieResults[index]}
          key={gptMoviesNames[index]}
        />
      ))}
    </div>
  );
};

export default GPTMovieSuggestions;
