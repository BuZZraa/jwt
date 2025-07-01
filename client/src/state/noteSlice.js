import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: {},
  },
  reducers: {
    setNote(state, action) {
      state.note = action.payload;
    },
    clearNote(state) {
      state.note = {};
    },
  },
});

export default noteSlice;
export const noteActions = noteSlice.actions;