import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room: null,
};

const roomSlice = createSlice({
    name: "flower",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.user = action.payload;
        },
        clearRoom: (state) => {
            state.user = null;
        },
    },
});

export const { setRoom, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
