import React, { useEffect } from "react";
import { GET_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/movieSlice";
import useMovieTrailer from "../hooks/useMovieTrailer";

const BackgroundVideo = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.movieTrailer);
  useMovieTrailer(movieId);
  return (
    <div className="flex w-full h-screen overflow-hidden sm:h-auto bg-white">
      <iframe
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full sm:w-full aspect-video "
      ></iframe>
    </div>
  );
};

export default BackgroundVideo;
