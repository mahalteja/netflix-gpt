import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConfig";
import { InferenceClient } from "@huggingface/inference";
import { GET_OPTIONS, SPINNER } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const [isLoading,setIsLoading]=useState(false)
  const langValue = useSelector((store) => store.config.lang);
  const serachText = useRef(null);
  const dispatch=useDispatch()

  const searchMovieTMDB=async(movie)=>{
    const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',GET_OPTIONS)
    const json=await data.json()
    return json.results
  }

  const handleGPTSearch = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query " +
      serachText.current.value +
      ". only give me names of 5 movies , comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const client = new InferenceClient(process.env.REACT_APP_GPT_API_KEY);
    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
    });

    // console.log(chatCompletion.choices[0].message);
    const gptMovies=chatCompletion.choices[0].message.content.split(",");

    const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie))
    const result=await Promise.all(promiseArray)
    console.log(result)
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:result}))
    setIsLoading(false)

  };
  return (
    <form
      className="flex bg-gray-900 rounded-lg p-4 mx-4 grid grid-cols-12 md:w-[50%]"
      onSubmit={handleGPTSearch}
    >
      <input
        ref={serachText}
        className="col-span-8 outline-none p-4 rounded-l-lg"
        placeholder={lang[langValue].gptSearchPlaceholder}
      />
      <button
        className="p-4 bg-red-600 text-white col-span-4 rounded-r-lg"
        type="submit"
        disabled={isLoading}
      >
        {isLoading? SPINNER :lang[langValue].search}
      </button>

    </form>
  );
};

export default GPTSearchBar;
