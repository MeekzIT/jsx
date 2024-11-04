import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IGallery } from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: IGallery[];
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<IGallery[]>(
  "gallery/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/gallery`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
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

export default gallerySlice.reducer;
