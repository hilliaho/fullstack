import { configureStore } from "@reduxjs/toolkit"; 
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from "./src/reducers/anecdoteReducer";
import filterReducer from "./src/reducers/filterReducer";
import notificationReducer from "./src/reducers/notificationReducer";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }, composeWithDevTools
})

export default store