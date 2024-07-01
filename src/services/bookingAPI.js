import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

const currentUnixTimestamp = Math.floor(Date.now() / 1000);

// Base query with Authorization header
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = selectTokens(getState());
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Base query without Authorization header
const baseQueryWithoutAuth = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
        return headers;
    },
});

export const bookingApi = createApi({
    reducerPath: "bookingManagement",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (body) => ({
                url: `bookings/create-booking`,
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const {
    useCreateBookingMutation
} = bookingApi;
