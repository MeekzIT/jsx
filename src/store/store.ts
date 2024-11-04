import { configureStore } from "@reduxjs/toolkit";
import selfReducer from "./slices/selfSlice";
import moduleReducer from "./slices/moduleSlice";
import equipmentReducer from "./slices/equipmentSlice";
import boardReducer from "./slices/boardSlice";
import serviceReducer from "./slices/servicesSlice";
import constructorReducer from "./slices/constructorSlice";
import spareReducer from "./slices/spareSlice";
import galleryReducer from "./slices/gallerySlice";

export const store = configureStore({
  reducer: {
    self: selfReducer,
    module: moduleReducer,
    equip: equipmentReducer,
    board: boardReducer,
    service: serviceReducer,
    constr: constructorReducer,
    spare: spareReducer,
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
