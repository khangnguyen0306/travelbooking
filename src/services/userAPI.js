import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

export const userApi = createApi({
    reducerPath: "userManagement",
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
        getUsers: builder.query({
            query: (id) => ({
                url: `users/get-all-users/3`,
                method: "GET",
            }),
        }),
        getPartners: builder.query({
            query: (id) => ({
                url: `users/get-all-users/2`,
                method: "GET",
            }),
        }),
        changeStatusUser: builder.mutation({
            query: (body) => ({
                url: `users/block-or-enable/${body.userId}/${body.status}`,
                method: "PUT",
            }),
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetPartnersQuery,
    useChangeStatusUserMutation,
} = userApi;
