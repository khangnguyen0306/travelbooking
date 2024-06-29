import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'hotel',
    initialState: {
        guests: 1,
        rooms: 1,
        date: [],
        destination: '',
    },
    reducers: {
        setGuests: (state, action) => {
            state.search.guests = action.payload;
        },
        setRooms: (state, action) => {
            state.search.rooms = action.payload;
        },
        setDate: (state, action) => {
            state.search.date = action.payload;
        },
        setDestination: (state, action) => {
            state.search.destination = action.payload;
        }
    }
});

export const { setGuests, setRooms, setDate, setDestination } = bookingSlice.actions;
export default bookingSlice.reducer;
