import { signupUser, loginUser } from "../../../API/API"
import { login, setError } from "../../User/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signupThunk = createAsyncThunk(
 'api/signup',
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
   const result = await loginUser(email, password);
   if (result && result.body && result.body.token) {
     dispatch(login(result.body.token));
   } else {
     dispatch(setError("Email ou mot de passe incorrect."));
   }
 } catch (error) {
   dispatch(setError("Une erreur s'est produite lors de la connexion"));
 }
};