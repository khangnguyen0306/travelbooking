import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

const currentUnixTimestamp = Math.floor(Date.now() / 1000);

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
        getAllRoom: builder.query({
            query: (hotelId) => ({
                url: `room-types/get-all-room/${hotelId}`,
                method: "GET",
            }),
        }),
        getRoomDetail: builder.query({
            query: (roomTypeId) => ({
                url: `room-types/get-room/${roomTypeId}`,
                method: "GET",
            }),
        }),
        getRoomListForUser: builder.query({
            query: (hotelId) => ({
                url: `room-types/get-all-room-status/${hotelId}?page=0&size=${currentUnixTimestamp}`,
                method: "GET",
            }),
        }),
        updateStatus: builder.mutation({
            query: (body) => ({
                url: `room-types/updateStatus/${body.roomTypeId}`,
                method: "PUT",
                body: body.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const {
    useCreateRoomMutation,
    usePutRoomImageMutation,
    useGetAllRoomQuery,
    useGetRoomDetailQuery,
    useGetRoomListForUserQuery,
    useUpdateStatusMutation,
} = roomApi;
