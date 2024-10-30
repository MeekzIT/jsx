import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Currency,
  IConstructor,
  IConstuctorItemOptions,
  SelectedData,
} from "../types";
import { backUrl } from "../keys";

interface ModuleState {
  data: IConstructor[];
  single: IConstructor | null;
  priceData: any;
  service: IConstuctorItemOptions | null;
  currency: Currency | null;
  loading: boolean;
  error: string | null;
}

const initialState: ModuleState = {
  data: [],
  single: null,
  service: null,
  priceData: null,
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk<IConstructor[]>(
  "constr/fetchData",
  async () => {
    const response = await axios.get(`${backUrl}/constuctor`);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

export const fetchSingle = createAsyncThunk<IConstructor, string>(
  "constr/fetchSingle",
  async (id) => {
    const response = await axios.get(`${backUrl}/constuctor/single`, {
      params: { id },
    });
    if (response.data.succes) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

export const fetchCurrency = createAsyncThunk<Currency, string>(
  "constr/fetchCurrency",
  async () => {
    const response = await axios.get(
      "https://new.yerevanhouse.net/api/currency"
    );
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch single service");
    }
  }
);

export const fetchSingleService = createAsyncThunk<
  IConstuctorItemOptions,
  string
>("constr/fetchSingleService", async (id) => {
  const response = await axios.get(`${backUrl}/constuctor/option`, {
    params: { id },
  });
  if (response.data.succes) {
    return response.data.data;
  } else {
    throw new Error("Failed to fetch single service");
  }
});

export const getDataPrice = createAsyncThunk<IConstructor[], SelectedData>(
  "constr/getDataPrice",
  async (data) => {
    const response = await axios.post(`${backUrl}/constuctor/price`, data);
    if (response.data.succes) {
      return response.data.data;
    } else {
      return [];
    }
  }
);

const constructorSlice = createSlice({
  name: "constr",
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
      .addCase(fetchSingle.fulfilled, (state, action) => {
        state.single = action.payload;
      })
      .addCase(fetchSingleService.fulfilled, (state, action) => {
        state.service = action.payload;
      })
      .addCase(getDataPrice.fulfilled, (state, action) => {
        state.priceData = action.payload;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload;
      });
  },
});

export default constructorSlice.reducer;
