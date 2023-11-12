import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";

const reduxStore = configureStore({
  reducer: {
    userData: userDataSlice,
  },
});

export default reduxStore;
