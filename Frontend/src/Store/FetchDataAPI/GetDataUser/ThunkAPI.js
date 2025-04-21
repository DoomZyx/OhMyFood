import { signupUser, loginUser, getUserProfile, updateUserAPI } from "../../../API/Account/API";
import { login, setError } from "../../User/authSlice";
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
      dispatch(login({ token: result.token, user: {} })); // Initialise Redux avec un token et un user vide
      
      dispatch(fetchUserProfile(result.token));

    } else {
      dispatch(setError("Email ou mot de passe incorrect."));
    }
  } catch (error) {
    dispatch(setError("Une erreur s'est produite lors de la connexion"));
  }
};

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const userProfile = await getUserProfile(token);
      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, thunkAPI) => {
    try {
      const response = await updateUserAPI(updatedData); 
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);