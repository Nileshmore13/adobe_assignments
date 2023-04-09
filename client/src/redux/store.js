import { configureStore } from '@reduxjs/toolkit';
import appSlice from "./index.js"

const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

export default store;