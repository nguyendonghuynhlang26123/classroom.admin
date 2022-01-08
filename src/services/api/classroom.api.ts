import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { IGenericGetAllResponse } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IClassroom } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const CLASSROOM_API_REDUCER_KEY = 'classroomApi';
export const CLASSROOM_TAG = 'Classes';
export const classroomApi = createApi({
  reducerPath: CLASSROOM_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [CLASSROOM_TAG],
  endpoints: (builder) => ({
    fetchAllClasses: builder.mutation<IGenericGetAllResponse<IClassroom>, QueryType>({
      query: (query: QueryType) => _request.get(queryToUrl(`admin/classrooms`, query)),
    }),
    getClassDetails: builder.query<IClassroom, string>({
      query: (id: string) => _request.get(`classes/${id}`),
      providesTags: [{ type: CLASSROOM_TAG, id: 'DETAILS' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllClassesMutation, useGetClassDetailsQuery } = classroomApi;
