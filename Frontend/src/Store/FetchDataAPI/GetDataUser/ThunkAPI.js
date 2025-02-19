import { signupUser, loginUser, getUserProfile } from "../../../API/API";
import { login, setError, setUser } from "../../User/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupThunk = createAsyncThunk(
  "api/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await signupUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = (email, password) => async (dispatch) => {
  try {
    const result = await loginUser({ email, password });
    if (result && result.token) {
      dispatch(login(result.token));
      const userProfile = await getUserProfile(result.token);
      console.log("User profile récupéré :", userProfile);
      dispatch(setUser(userProfile));
    } else {
      dispatch(setError("Email ou mot de passe incorrect."));
    }
  } catch (error) {
    dispatch(setError("Une erreur s'est produite lors de la connexion"));
  }
};
