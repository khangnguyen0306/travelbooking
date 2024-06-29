import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || null,
        fullName: null,
        email: null,
        phoneNumber: null,
        role: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            sessionStorage.setItem("token", action.payload);
        },
        setInfo: (state, action) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.role = action.payload.role;
        },
        logOut: (state, action) => {
            state.fullName = null;
            state.email = null;
            state.phoneNumber = null;
            state.role = null;
            state.token = null;
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
        },
    },
    selectors: {
        selectTokens: (auth) => auth.token,
    },
});

export const { setToken, setInfo, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const { selectTokens } = authSlice.selectors;
