import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../Features/videoSlice.js"
import authReducer from "../Features/authSlice.js"
import uiReducer from "../Features/uiSlice.js"

export const Store = configureStore({
    reducer: {
        video: videoReducer,
        auth: authReducer,
        ui: uiReducer
    }

})