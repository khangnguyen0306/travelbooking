
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { selectTokens } from "../slices/auth.slice";

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
                url: `hotels/getAllHotels?page=${pageNumber}&size=${pageSize}`,
                method: "GET",
                params: {
                    pageable: {
                        pageNumber,
                        pageSize,
                    },
                },
            }),
        }),

        getFullHotel: builder.query({
            query: () => ({
                url: `hotels/getAllHotels?page=0&size=10000`,
                method: "GET",
            }),
        }),
        putLicense: builder.mutation({
            query: ({ idHotel, license }) => {
                const formData = new FormData();
                formData.append('license', license);
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
    }),
});

export const {
    useCreateHotelMutation,
    usePutLicenseMutation,
    useGetFullHotelQuery,
    useGetHotelWithPageQuery,

} = hotelApi;
