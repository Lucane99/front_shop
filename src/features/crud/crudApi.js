import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../constants/constants';


export const crudApi = createApi({
  reducerPath: 'crudApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: (q) => ({
        url: '/'
      }),
      providesTags: ['Product'],
    }),

    getProductById: builder.query({
      query: (q) => ({
        url: `/api/product/${q}`,
      }),
      providesTags: ['Product'],
    }),


    productAdd: builder.mutation({
      query: (q) => ({
        url: '/api/product_create',
        method: 'POST',
        body: q.body,
        headers: {
          'Authorization': q.token
        }
      }),
      invalidatesTags: ['Product']
    }),

    productUpdate: builder.mutation({
      query: (q) => ({
        url: `/api/product_update/${q.id}`,
        method: 'PATCH',
        body: q.body,
        headers: {
          'Authorization': q.token
        }
      }),
      invalidatesTags: ['Product']
    }),
    productUpdateFile: builder.mutation({
      query: (q) => ({
        url: `/api/product_update/${q.id}`,
        method: 'PATCH',
        body: q.body,
        params: {
          imagePath: q.imagePath
        },
        headers: {
          'Authorization': q.token
        },

      }),
      invalidatesTags: ['Product']
    }),


    productRemove: builder.mutation({
      query: (q) => ({
        url: `/api/product_remove/${q.id}`,
        method: 'DELETE',
        params: {
          imagePath: q.imagePath
        },
        headers: {
          'Authorization': q.token
        },

      }),
      invalidatesTags: ['Product']
    }),
    productReview: builder.mutation({
      query: (q) => ({
        url: `/api/product_review/${q.id}`,
        method: 'PATCH',
        body: q.body,
        headers: {
          'Authorization': q.token
        },

      }),
      invalidatesTags: ['Product']
    })


  })




})


export const { useGetAllProductsQuery, useProductAddMutation, useGetProductByIdQuery, useProductUpdateMutation, useProductUpdateFileMutation, useProductRemoveMutation, useProductReviewMutation } = crudApi;

