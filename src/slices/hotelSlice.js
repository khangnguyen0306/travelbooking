import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotel: null,
};

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        setHotel: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
