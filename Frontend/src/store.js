import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Store/User/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
