import { configureStore  } from "@reduxjs/toolkit";
import { uiReducer } from "./Reducers/uiReducer";

export const store = configureStore({
    reducer: {
        ui: uiReducer
    }
})
