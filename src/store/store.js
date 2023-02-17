import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { budgetSlice } from "./budgets/budgetSlice";





export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
       }),
    reducer:{
        auth:   authSlice.reducer,
        budget: budgetSlice.reducer
    }   
})