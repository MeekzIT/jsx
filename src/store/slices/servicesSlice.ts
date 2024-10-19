import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Service } from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  data: [],
  loading: false,
  error: null,
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
      });
  },
});

export default serviceSlice.reducer;
