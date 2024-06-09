import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";

export const accountApi = createApi({
    reducerPath: "accountApi",
    // Tag types are used for caching and invalidation.
    tagTypes: ["acccounts"],
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}` }),
    endpoints: (builder) => ({
        // Supply generics for the return type (in this case `FlowerApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        login: builder.mutation({
            query: (body) => {
                return {
                    method: "POST",
                    url: `/users/login`,
                    body,
                };
            },
            invalidatesTags: [{ type: "acccounts", id: "LIST" }]
        }),
    }),
});

export const {
    useLoginMutation,
} = accountApi;
