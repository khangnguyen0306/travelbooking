import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || null,
        user: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            sessionStorage.setItem("token", action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            sessionStorage.setItem("token", accessToken);
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
        },
    },
    selectors: {
        selectTokens: (auth) => auth.token,
    },
});

export const { setToken, setUser, setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const { selectTokens } = authSlice.selectors;
