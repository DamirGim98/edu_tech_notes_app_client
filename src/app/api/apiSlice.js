import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://mernnotes-api.onrender.com',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Original query will succeed if token is fresh enough.
  let result = await baseQuery(args, api, extraOptions)
  // if it is not, will enter if statements and handle-refreshment.
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired. '
      }
      return refreshResult
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Notes', 'User'],
  endpoints: () => ({}),
})
