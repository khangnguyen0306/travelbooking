import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: {},
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },

    },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
