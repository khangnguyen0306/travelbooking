import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        guests: 1,
        rooms: 1,
        date: [],
        destination: '',
        hotelName: "",
        roomTypeId: 0,
        roomTypeName: "",
        roomPrice: 0,
        roomImage: ""
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
        },
        setHotelName: (state, action) => {
            state.hotelName = action.payload;
        },
        setRoomInfo: (state, action) => {
            state.roomTypeId = action.payload.roomTypeId;
            state.roomTypeName = action.payload.roomTypeName;
            state.roomPrice = action.payload.roomPrice;
            state.roomImage = action.payload.roomImage;
        },
    }
});

export const {
    setGuests,
    setRooms,
    setDate,
    setDestination,
    setHotelName,
    setRoomInfo
} = bookingSlice.actions;
export default bookingSlice.reducer;
