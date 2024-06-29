import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import { authApi } from "../services/authAPI";
import authReducer from "../slices/auth.slice";
import bookingReducer from "../slices/bookingSlice";
import { hotelApi } from "../services/hotelAPI";
import { roomApi } from "../services/roomAPI";
import { userApi } from "../services/userAPI";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const authpersistedReducer = persistReducer(persistConfig, authReducer);
const bookingpersistedReducer = persistReducer(persistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authpersistedReducer,
    booking: bookingpersistedReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      hotelApi.middleware,
      roomApi.middleware,
      userApi.middleware,
    ),
});

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
export const injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return asyncReducer;
};

function createReducer(asyncReducers = {}) {
  if (Object.keys(asyncReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers,
    });
  }
}

export const Persister = persistStore(store);
