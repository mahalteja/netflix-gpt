import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGPTSearch:false,
        gptMoviesNames:null,
        gptMovieResults:null,

    },
    reducers:{
        toggleGptSearchView:(state,action)=>{
            state.showGPTSearch=!state.showGPTSearch
        },
        addGptMovieResult:(state,action)=>{
            const{movieNames,movieResults}=action.payload
            state.gptMoviesNames=movieNames;
            state.gptMovieResults=movieResults;
        }
    }
})

export const{toggleGptSearchView,addGptMovieResult}=gptSlice.actions;
export default gptSlice.reducer