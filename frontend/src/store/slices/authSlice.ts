/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, AuthState } from "../types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  jwtToken: null,
  loading: false,
  error: null,
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const API_URL = `${API_BASE}/auth`;

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = res.data;
      localStorage.setItem("jwtToken", token);
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("jwtToken", token);
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData: Partial<User>, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.jwtToken || localStorage.getItem("jwtToken");
      const res = await axios.put(`${API_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return rejectWithValue("No token found");

    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.user;
    } catch (error: any) {
      localStorage.removeItem("jwtToken");
      return rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.auth.jwtToken || localStorage.getItem("jwtToken");
      await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem("jwtToken");
      return {};
    } catch (error: any) {
      localStorage.removeItem("jwtToken");
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage(state) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        state.jwtToken = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwtToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.jwtToken = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwtToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.jwtToken = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.user = null;
        state.jwtToken = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
