import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

export const hotelApi = createApi({
    reducerPath: "hotelManagement",
    // baseQuery: fetchBaseQuery({baseUrl:"https://localhost:7293/api/"}),                        //chua fix
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = selectTokens(getState()); // Retrieve token from Redux state using selectToken selector
            if (token) {
                headers.append("Authorization", `Bearer ${token}`);
            }
            headers.append("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createHotel: builder.mutation({
            query: (body) => ({
                url: `hotels/create`,
                method: "POST",
                body: body,
            }),
        }),
        getHotel: builder.mutation({
            query: (id) => ({
                url: `hotels/getAllHotels`,
                method: "GET",
            }),
        }),
    }),
})

export const {
    useCreateHotelMutation,
    useGetHotelMutation,

} = hotelApi;
