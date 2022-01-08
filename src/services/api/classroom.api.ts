import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { IGenericGetAllResponse, IClassroomBody } from 'common/interfaces';
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
      query: (id: string) => _request.get(`admin/classrooms/${id}`),
      providesTags: [{ type: CLASSROOM_TAG, id: 'DETAILS' }],
    }),

    updateClassDetails: builder.mutation<IClassroom, { id: string; body: IClassroomBody }>({
      query: ({ id, body }) => _request.put('admin/classrooms/' + id, body),
      invalidatesTags: [{ type: CLASSROOM_TAG, id: 'DETAILS' }],
    }),
    deleteClassroom: builder.mutation<any, string>({
      query: (id) => _request.delete(`admin/classrooms/${id}`),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllClassesMutation, useGetClassDetailsQuery, useUpdateClassDetailsMutation, useDeleteClassroomMutation } =
  classroomApi;
