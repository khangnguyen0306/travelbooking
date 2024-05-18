import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROOM_API_URL } from "../config";

// Define a service using a base URL and expected endpoints
export const roomApi = createApi({
    reducerPath: "roomManagement",
    // Tag types are used for caching and invalidation.
    tagTypes: ["roomList"],
    baseQuery: fetchBaseQuery({ baseUrl: ROOM_API_URL }),
    endpoints: (builder) => ({
        // Supply generics for the return type (in this case `roomApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        getrooms: builder.query({
            query: () => `hotellist`,
            // `providesTags` determines which 'tag' is attached to the
            // cached data returned by the query.
            providesTags: (result, _error, _arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "room", id })),
                        { type: "room", id: "LIST" },
                    ]
                    : [{ type: "room", id: "LIST" }],
        }),
        addroom: builder.mutation({
            query: (body) => {
                return {
                    method: "POST",
                    url: `room`,
                    body,
                };
            },
            invalidatesTags: [{ type: "room", id: "LIST" }],
        }),
        editroom: builder.mutation({
            query: (payload) => {
                return {
                    method: "PUT",
                    url: `room/` + payload.id,
                    body: payload.body,
                };
            },
            invalidatesTags: (res, err, arg) => [{ type: "room", id: arg.id }],
        }),
        deleteroom: builder.mutation({
            query: (payload) => {
                return {
                    method: "DELETE",
                    url: `room/` + payload.id,
                };
            },
            invalidatesTags: (_res, _err, _arg) => [
                { type: "room", id: "LIST" },
            ],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// Hooks are auto-generated by RTK-Query
export const {
    useGetroomsQuery
    // useAddroomMutation,
    // useEditroomMutation,
    // useDeleteroomMutation,
} = roomApi;
