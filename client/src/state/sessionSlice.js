import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default sessionSlice;
export const sessionActions = sessionSlice.actions;
