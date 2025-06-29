import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import moviesReducer from "./movieSlice"
import configReducer from "./configSlice"
import gptReducer from "./gptSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        movies:moviesReducer,
        config:configReducer,
        gpt:gptReducer
    }
})

export default appStore;