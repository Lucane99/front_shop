import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../constants/constants'


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['User'],
  endpoints: (builder) => ({

    userLogin: builder.mutation({
      query: (q) => ({
        url: '/api/userLogin',
        method: 'POST',
        body: q
      }),
      invalidatesTags: ['User']
    }),

    userSignUp: builder.mutation({
      query: (q) => ({
        url: '/api/userSignUp',
        method: 'POST',
        body: q
      }),
      invalidatesTags: ['User']
    }),


    userUpdate: builder.mutation({
      query: (q) => ({
        url: '/api/userUpdate',
        method: 'PATCH',
        body: q.body,
        headers: {
          'Authorization': q.token
        }
      }),
      invalidatesTags: ['User']
    }),


    getUserById: builder.query({
      query: (q) => ({
        url: '/api/userById',
        headers: {
          'Authorization': q
        }
      }),
      providesTags: ['User']
    }),

    getAllUser: builder.query({
      query: (q) => ({
        url: '/api/getAllUser',
        headers: {
          'Authorization': q
        }
      }),
      providesTags: ['User']
    })








  })




})


export const { useUserLoginMutation, useUserSignUpMutation, useGetAllUserQuery, useGetUserByIdQuery, useUserUpdateMutation } = authApi;

