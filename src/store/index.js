
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// ...import { persistStore, persistReducer } from 'redux-persist';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Sử dụng localStorage
import roomReducer from "../slices/room.slice";
import { roomApi } from "../services/roomAPI";
import hotelSearchReducer from "../slices/hotelSearch.slice";
import { accountApi } from "../services/accountApi";
import accountSlice from "../slices/accountSlice";

const persistConfig = {
  key: "root",
  storage,
};
// Define the Reducers that will always be present in the application
const staticReducers = {
  theme: "theme",
};

const accountpersistedReducer = persistReducer(persistConfig, accountSlice);
const roompersistedReducer = persistReducer(persistConfig, roomReducer);
const hotelSearchpersistedReducer = persistReducer(persistConfig, hotelSearchReducer);
export const store = configureStore({
  reducer: {

    [roomApi.reducerPath]: roomApi.reducer,
    room: roompersistedReducer,
    hotelSearch: hotelSearchReducer,
    [accountApi.reducerPath]: accountApi.reducer,
    account: accountpersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      accountApi.middleware
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
