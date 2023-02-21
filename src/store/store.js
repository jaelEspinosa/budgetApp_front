import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { budgetSlice } from "./budgets/budgetSlice";
import { formModalSlice } from "./ui/formModalSlice";





export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
       }),
    reducer:{
        auth:   authSlice.reducer,
        budget: budgetSlice.reducer,
        formModal : formModalSlice.reducer
    }   
})