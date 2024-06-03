// src/redux/slices/hotelSearchSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    guests: 1,
    rooms: 1,
    destination: null,
    date: null,
};

const hotelSearchSlice = createSlice({
    name: 'hotelSearch',
    initialState,
    reducers: {
        setGuests: (state, action) => {
            state.guests = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
    },
});

export const { setGuests, setRooms, setDestination, setDate } = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;
