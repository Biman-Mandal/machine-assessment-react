import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "myExampleApp",
  initialState: {
    userSliceData: JSON.parse(localStorage.getItem("userData")) || {},
    userToken: localStorage.getItem("userToken") || {},
  },
  reducers: {
    addUserSlice(state, action) {
      state.userSliceData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    addUserToken(state, action) {
      state.userToken = action.payload;
      localStorage.setItem("userToken", JSON.stringify(action.payload));
    },
    logOut(state) {
      localStorage.clear();
      state.userSliceData = {};
      state.userToken = "";
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");
    },
  },
});
export const { addAuthToken, addUserSlice, logOut, addUserToken } = userSlice.actions;
export default userSlice.reducer;
