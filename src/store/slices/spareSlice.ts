import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Spare } from "../types";
import { backUrl } from "../keys";

interface SelfState {
  data: Spare[];
  single: Spare | null;
  loading: boolean;
  error: string | null;
}

const initialState: SelfState = {
  data: [],
  single: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<Spare[]>(
  "spare/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/spare`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchSingleService = createAsyncThunk<Spare, string>(
  "spare/fetchSingleService",
  async (id) => {
    const response = await axios.get(`${backUrl}/spare/single`, {
      params: { id },
    });
    if (response.data.succes) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

const spareSlice = createSlice({
  name: "spare",
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

export default spareSlice.reducer;
