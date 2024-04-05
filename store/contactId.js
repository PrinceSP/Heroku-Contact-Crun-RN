import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentId: "sdfsdf"
};

const getCurrentId = createSlice({
  name: "currentID",
  initialState,
  reducers: {
    getID: (state, action) => {
      const { currentId } = action.payload;
      state.currentId = currentId;
    },
  },
});

export const { getID } = getCurrentId.actions;

export default getCurrentId.reducer;
