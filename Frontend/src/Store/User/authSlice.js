import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //  token: sessionStorage.setItem("token") || null,
    isAuthenticated: !!sessionStorage.getItem("token"),
    user: {
      id: "",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  },
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      //  sessionStorage.setItem("token", token)
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      (state.token = null),
        //  sessionStorage.removeItem("token")
        (state.isAuthenticated = false);
      state.user = {
        id: "",
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;