import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Module } from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: Module[];
  single: Module | null;
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  data: [],
  single: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<Module[]>(
  "module/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/module`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchSingleService = createAsyncThunk<Module, string>(
  "self/fetchSingleService",
  async (id) => {
    const response = await axios.get(`${backUrl}/module/single`, {
      params: { id },
    });
    if (response.data.succes) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch services";
        state.loading = false;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.single = action.payload;
      });
  },
});

export default moduleSlice.reducer;
