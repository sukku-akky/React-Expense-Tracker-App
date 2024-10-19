import { configureStore, createAction } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense-redux";
import authSlice from "./auth-redux";

const store=configureStore({
    reducer:{
        exp:expenseSlice.reducer,
        auth:authSlice.reducer,

    }
})

 export const expenseActions=createAction(expenseSlice.actions);

export default store;