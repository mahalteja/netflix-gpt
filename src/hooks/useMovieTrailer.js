import { useDispatch, useSelector } from "react-redux";
import { GET_OPTIONS } from "../utils/constant";
import { addMovieTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const movieTrailer=useSelector(store=>store.movies?.movieTrailer)
  const getMovieTrailer = async (movieId) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        GET_OPTIONS
      );
      const data = await response.json();

      const filterData = data.results.filter((item) => item.type === "Trailer");
      const movieTrailer =
        filterData.lenght > 1 ? filterData[0] : data.results[0];
      dispatch(addMovieTrailer(movieTrailer));
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch movie Trailer");
    }
  };

  useEffect(() => {
    if(!movieTrailer)getMovieTrailer(movieId);
  }, []);
};

export default useMovieTrailer;
