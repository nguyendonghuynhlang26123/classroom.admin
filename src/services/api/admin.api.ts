import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IAdmin, IGenericGetAllResponse, IAdminUpdateBody, IAdminCreateBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const ADMINS_API_REDUCER_KEY = 'adminsApi';
export const ADMINS_TAG = 'Admins';
export const adminsApi = createApi({
  reducerPath: ADMINS_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [ADMINS_TAG],
  endpoints: (builder) => ({
    fetchAllAdmins: builder.mutation<IGenericGetAllResponse<IAdmin>, QueryType>({
      query: (query: QueryType) => _request.get(queryToUrl(`admin/admin-accounts`, query)),
    }),

    getAdminDetails: builder.query<IAdmin, string>({
      query: (id: string) => _request.get(`admin/admin-accounts/${id}`),
      providesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
    updateAdminAccount: builder.mutation<IAdmin, { id: string; body: IAdminUpdateBody }>({
      query: ({ id, body }) => _request.put(`admin/admin-accounts/${id}`, body),
      invalidatesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
    createAdmin: builder.mutation<IAdmin, IAdminCreateBody>({
      query: (body) => _request.post(`admin/admin-accounts`, body),
      invalidatesTags: [{ type: ADMINS_TAG, id: 'DATA' }],
    }),
    deleteAdmin: builder.mutation<any, string>({
      query: (id) => _request.delete(`admin/admin-accounts/${id}`),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateAdminAccountMutation,
  useFetchAllAdminsMutation,
  useGetAdminDetailsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = adminsApi;
