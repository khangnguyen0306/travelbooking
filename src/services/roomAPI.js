import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

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


export const roomApi = createApi({
    reducerPath: "roomManagement",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createRoom: builder.mutation({
            query: (body) => ({
                url: `room-types/create`,
                method: "POST",
                body: body,
            }),
        }),
        putRoomImage: builder.mutation({
            query: ({ roomTypeId, images }) => {
                const formData = new FormData();
                images.forEach((image, index) => {
                    formData.append('images', image);
                });
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }
                return {
                    url: `room-types/upload-images/${roomTypeId}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),


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
        putRoomImage: builder.mutation({
            query: ({ roomTypeId, images }) => {
                const formData = new FormData();
                images.forEach((image, index) => {
                    formData.append('images', image);
                });
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }
                return {
                    url: `room-types/upload-images/${roomTypeId}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        getAllRoom: builder.query({
            query: (hotelId) => ({
                url: `room-types/get-all-room/${hotelId}`,
                method: "GET",
            }),
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
    useCreateRoomMutation,
    usePutRoomImageMutation,
    useGetAllRoomQuery,
    useGetHotelListQuery,
    useGetHotelDetailQuery,
    useGetHotelByIdQuery,
    useGetRoomQuery,
    useEditroomMutation,
    useDeleteroomMutation,
} = roomApi;
