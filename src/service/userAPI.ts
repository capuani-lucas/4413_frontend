
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({

  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/identity' }),
  endpoints: (builder) => ({

    // Login endpoint
    login: builder.mutation({
      query: (body) => ({
        url: 'login/',
        method: 'POST',
        body
      })
    }),

    // Signup endpoint
    signup: builder.mutation({
      query: (body) => ({
        url: 'signup/',
        method: 'POST',
        body
      })
    })

  })
})

export const { 
  useLoginMutation,
  useSignupMutation
} = userApi;
