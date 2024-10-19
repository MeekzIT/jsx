import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Equipment } from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: Equipment[];
  single: Equipment | null;
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  data: [],
  single: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<Equipment[]>(
  "equipment/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/equip`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchSingleService = createAsyncThunk<Equipment, string>(
  "self/fetchSingleService",
  async (id) => {
    const response = await axios.get(`${backUrl}/equip/single`, {
      params: { id },
    });
    if (response.data.succes) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

const equipmentSlice = createSlice({
  name: "equipment",
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

export default equipmentSlice.reducer;
