import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  photo: ""
};

const getCurrentContact = createSlice({
  name: "contactData",
  initialState,
  reducers: {
    getData: (state, action) => {
      const { firstName,lastName,age,photo } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.age = age;
      state.photo = photo;
    },
  },
});

export const { getData } = getCurrentContact.actions;

export default getCurrentContact.reducer;
