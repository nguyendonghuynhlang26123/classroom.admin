import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IUser, IUserBody, IGenericGetAllResponse } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const USERS_API_REDUCER_KEY = 'usersApi';
export const USERS_TAG = 'Users';
export const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [USERS_TAG],
  endpoints: (builder) => ({
    fetchAllUsers: builder.mutation<IGenericGetAllResponse<IUser>, QueryType>({
      query: (query: QueryType) => _request.get(queryToUrl(`admin/user-accounts`, query)),
    }),

    getUserDetails: builder.query<IUser, string>({
      query: (id: string) => _request.get(`admin/user-accounts/${id}`),
      providesTags: [{ type: USERS_TAG, id: 'DATA' }],
    }),
    updateUserData: builder.mutation<IUser, { id: string; body: IUserBody }>({
      query: ({ id, body }) => _request.put(`admin/user-accounts/${id}`, body),
      invalidatesTags: [{ type: USERS_TAG, id: 'DATA' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllUsersMutation, useGetUserDetailsQuery, useUpdateUserDataMutation } = usersApi;
