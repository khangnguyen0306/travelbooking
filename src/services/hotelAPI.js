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

export const hotelApi = createApi({
    reducerPath: "hotelManagement",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        createHotel: builder.mutation({
            query: (body) => ({
                url: `hotels/create`,
                method: "POST",
                body: body,
            }),
        }),
        getHotelWithPage: builder.query({
            query: ({ pageNumber = 0, pageSize = 10 }) => ({
                url: `hotels/get-hotels?page=${pageNumber}&size=${pageSize}`,
                method: "GET",
                params: {
                    pageable: {
                        pageNumber,
                        pageSize,
                    },
                },
            }),
        }),
        getHotelForPartner: builder.query({
            query: () => ({
                url: `hotels/get-hotels?page=0&size=${currentUnixTimestamp}`,
                method: "GET",
            }),
        }),
        getFullHotel: builder.query({
            query: () => ({
                url: `hotels/get-hotels?page=0&size=${currentUnixTimestamp}`,
                method: "GET",
            }),
        }),
        getHotelForAdmin: builder.query({
            query: () => ({
                url: `hotels/get-hotels?page=0&size=${currentUnixTimestamp}`,
                method: "GET",
            }),
        }),
        putLicense: builder.mutation({
            query: ({ idHotel, license }) => {
                const formData = new FormData();
                license.forEach(file => {
                    formData.append('license', file);
                });

                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }

                return {
                    url: `hotels/update-business-license/${idHotel}`,
                    method: 'PUT',
                    body: formData,
                };
            },
        }),

        putHotelImage: builder.mutation({
            query: ({ idHotel, images }) => {
                const formData = new FormData();
                images.forEach((image, index) => {
                    formData.append('images', image.originFileObj);
                });
                for (let pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }
                return {
                    url: `hotels/upload-images/${idHotel}`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        changeStatusHotel: builder.mutation({
            query: (body) => ({
                url: `hotels/updateStatus/${body.hotelId}`,
                method: "PUT",
                body: body.status,
                headers: {
                    'Content-Type': 'application/json', // Sử dụng Content-Type là application/json
                },
            }),
        }),
        getHotelDetailsForAdmin: builder.query({
            query: (hotelId) => ({
                url: `hotels/detail/${hotelId}`,
                method: "GET",
            }),
        }),
        getHotelDetailsForGuest: builder.query({
            query: (hotelId) => ({
                url: `hotels/detail/${hotelId}`,
                method: "GET",
            }),
        })
    }),
});

export const {
    useCreateHotelMutation,
    usePutLicenseMutation,
    useGetHotelWithPageQuery,
    useGetFullHotelQuery,
    useGetHotelForAdminQuery,
    useGetHotelForPartnerQuery,
    useChangeStatusHotelMutation,
    useGetHotelDetailsForAdminQuery,
    useGetHotelDetailsForGuestQuery,
    usePutHotelImageMutation,
} = hotelApi;
