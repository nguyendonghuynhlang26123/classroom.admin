import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IAdmin, IGenericGetAllResponse, IAdminUpdateBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const ADMINS_API_REDUCER_KEY = 'adminsApi';
export const ADMINS_TAG = 'Admins';
export const usersApi = createApi({
  reducerPath: ADMINS_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [ADMINS_TAG],
  endpoints: (builder) => ({
    fetchAllAdmins: builder.mutation<IGenericGetAllResponse<IAdmin>, QueryType>({
      query: (query: QueryType) => _request.get(queryToUrl(`admin/admin-accounts`, query)),
    }),

    getUserDetails: builder.query<IAdmin, string>({
      query: (id: string) => _request.get(`admin/admin-accounts/${id}`),
      providesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
    updateAdminAccount: builder.mutation<IAdmin, { id: string; body: IAdminUpdateBody }>({
      query: ({ id, body }) => _request.put(`admin/admin-accounts/${id}`, body),
      invalidatesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
    createAdmin: builder.mutation<IAdmin, { id: string; body: IAdminUpdateBody }>({
      query: ({ id, body }) => _request.put(`admin/admin-accounts/${id}`, body),
      invalidatesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllAdminsMutation, useGetUserDetailsQuery, useCreateAdminMutation } = usersApi;
