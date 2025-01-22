import { configureStore } from "@reduxjs/toolkit"; 
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from "./src/reducers/anecdoteReducer";
import filterReducer from "./src/reducers/filterReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }, composeWithDevTools
})

export default store