import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileReducer";
import { userAuthApi } from "../apis/UserAuth"; // Ensure the correct path
import { profileApi } from "../apis/UserProfile"; // Ensure the correct path

const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer, // Add profileApi to reducers
    profile: profileReducer, // Keep this if it's necessary
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware, profileApi.middleware),
});

export default store;
