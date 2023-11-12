import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userDataSlice = createSlice({
  name: "user-data",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
