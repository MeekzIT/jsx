import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Self } from "../types";
import { backUrl } from "../keys";

interface SelfState {
  data: Self[];
  single: Self | null;
  loading: boolean;
  error: string | null;
}

const initialState: SelfState = {
  data: [],
  single: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<Self[]>(
  "self/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/self`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchSingleService = createAsyncThunk<Self, string>(
  "self/fetchSingleService",
  async (id) => {
    const response = await axios.get(`${backUrl}/self/single`, {
      params: { id },
    });
    if (response.data.succes) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

const selfSlice = createSlice({
  name: "self",
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

export default selfSlice.reducer;
