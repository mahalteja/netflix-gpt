import React from "react";
import BackgroundVideo from "./BackgroundVideo";
import VideoText from "./VideoText";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;
  
  const mainMovie=movies[0]
  console.log(mainMovie)

  return (
    <div className="flex w-full relative">
      <VideoText title={mainMovie.title} overview={mainMovie.overview} />
      <BackgroundVideo movieId={mainMovie.id}/>
    </div>
  );
};

export default MainContainer;
