
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import roomReducer from "../slices/room.slice";
import { roomApi } from "../services/roomAPI";
import { authApi } from "../services/authAPI";
import authReducer from "../slices/auth.slice";
import { hotelApi } from "../services/hotelAPI";
import hotelReducer from "../slices/bookingSlice";
import { userApi } from "../services/userAPI";
const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const authrersistedReducer = persistReducer(persistConfig, authReducer);
const hotelrersistedReducer = persistReducer(persistConfig, hotelReducer);
const roompersistedReducer = persistReducer(persistConfig, roomReducer);
export const store = configureStore({
  reducer: {

    [roomApi.reducerPath]: roomApi.reducer,
    room: roompersistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authrersistedReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    hotel: hotelReducer,
    hotel: hotelrersistedReducer,
    [userApi.reducerPath]: userApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      authApi.middleware,
      hotelApi.middleware,
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
