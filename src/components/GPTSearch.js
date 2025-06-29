import React from "react";
import { SIGNIN_BACKGROUND_IMAGE } from "../utils/constant";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";

const GPTSearch = () => {
  return (
    <div
      className=" min-h-screen relative bg-cover bg-center flex justify-center items-center flex-col h-screen "
      style={{
        backgroundImage: `url(${SIGNIN_BACKGROUND_IMAGE})`,
      }}
    >
      <div className="flex flex-col h-full justify-start  overflow-y-scroll pt-64 items-center w-screen bg-black bg-opacity-80">
      <GPTSearchBar/>
      <GPTMovieSuggestions/>
      </div>
    </div>
  );
};

export default GPTSearch;
