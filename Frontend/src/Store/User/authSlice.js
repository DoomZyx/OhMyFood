import { createSlice } from "@reduxjs/toolkit";
import {
  signupThunk,
  fetchUserProfile,
  updateUserProfile,
} from "../FetchDataAPI/GetDataUser/ThunkAPI";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token") || null,
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
      const { token, user } = action.payload;
      state.token = token;
      sessionStorage.setItem("token", token);
      state.isAuthenticated = true;
      state.user = user; 
    },
    logout: (state) => {
      (state.token = null), sessionStorage.removeItem("token");
      state.isAuthenticated = false;
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
  extraReducers: (builder) => {
    // Gestion de signup
    builder
      // Attente de requête
      .addCase(signupThunk.pending, (state) => {
        state.error = null;
      })
      // requête accepté
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.user = action.payload; 
      })
      // Requête rejeté
      .addCase(signupThunk.rejected, (state, action) => {
        state.error = action.payload; 
      });
    // Gestion de login
      builder
        .addCase(fetchUserProfile.pending, (state) => {
          state.error = null;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
          state.error = action.payload;
        });
    // Gestion de updateUserProfile
      builder
        .addCase(updateUserProfile.pending, (state) => {
          state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.error = action.payload;
        });
  },
});

export const { login, logout, setUser, setError } = authSlice.actions;
export default authSlice.reducer;