import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id:""
};

const getContactId = createSlice({
  name: "contactId",
  initialState,
  reducers: {
    getId: (state, action) => {
      const { id } = action.payload;
      state.id = id;
    },
  },
});

export const { getId } = getContactId.actions;

export default getContactId.reducer;
