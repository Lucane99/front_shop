import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../constants/constants';


export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({

    getAllOrders: builder.query({
      query: (q) => ({
        url: '/api/getAllOrders',
        headers: {
          'Authorization': q.token
        },
      }),
      providesTags: ['Order'],
    }),


    getOrderById: builder.query({
      query: (q) => ({
        url: `/api/order/${q.id}`,
        headers: {
          'Authorization': q.token
        },
      }),
      providesTags: ['Order'],
    }),


    getOrderByUser: builder.query({
      query: (q) => ({
        url: '/api/orderByUserId',
        headers: {
          'Authorization': q
        },
      }),
      providesTags: ['Order'],
    }),

    orderAdd: builder.mutation({
      query: (q) => ({
        url: '/api/order_create',
        method: 'POST',
        body: q.body,
        headers: {
          'Authorization': q.token
        }
      }),
      invalidatesTags: ['Order']
    }),



  })




})


export const { useGetAllOrdersQuery, useGetOrderByIdQuery, useOrderAddMutation, useGetOrderByUserQuery } = orderApi;

