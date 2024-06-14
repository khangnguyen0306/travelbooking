import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";

// Define a service using a base URL and expected endpoints
export const roomApi = createApi({
    reducerPath: "roomManagement",
    // Tag types are used for caching and invalidation.
    tagTypes: ["roomList"],
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getHotelList: builder.query({
            query: () => `hotellist`,
            providesTags: (result, _error, _arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "room", id })),
                        { type: "room", id: "LIST" },
                    ]
                    : [{ type: "room", id: "LIST" }],
        }),
        getRoom: builder.query({
            query: (hotelId) => `hotellist/${hotelId}/roomlist`,
            providesTags: (result, _error, _arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "room", id })),
                        { type: "room", id: "LIST" },
                    ]
                    : [{ type: "room", id: "LIST" }],
        }),
        getHotelDetail: builder.query({
            query: () => `hotellist/roomlist`,
            providesTags: (result, _error, _arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "room", id })),
                        { type: "room", id: "LIST" },
                    ]
                    : [{ type: "room", id: "LIST" }],
        }),
        getHotelById: builder.query({
            query: (id) => `hotellist/${id}`,
            providesTags: (result, error, id) => [{ type: "HotelsList", id }]
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


export const {
    useGetHotelListQuery,
    useGetHotelDetailQuery,
    useGetHotelByIdQuery,
    useGetRoomQuery,
    useGetRoomByIdQuery,
    useAddroomMutation,
    useEditroomMutation,
    useDeleteroomMutation,
} = roomApi;
