import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        guests: 1,
        rooms: 1,
        date: [],
        destination: '',
    },
    reducers: {
        setGuests: (state, action) => {
            state.guests = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        }
    }
});

export const { setGuests, setRooms, setDate, setDestination } = bookingSlice.actions;
export default bookingSlice.reducer;
