import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { About, Service } from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: Service[];
  loading: boolean;
  error: string | null;
  about: About | null;
}

const initialState: ModuleState = {
  data: [],
  loading: false,
  error: null,
  about: null,
};

export const fetchData = createAsyncThunk<Service[]>(
  "service/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/service`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchAbout = createAsyncThunk<About[]>(
  "service/fetchAbout",
  async () => {
    const response = await axios.get(`${backUrl}/about`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
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
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.about = action.payload[0];
      });
  },
});

export default serviceSlice.reducer;
