import { _request } from './utils';
import { IGenericGetAllResponse, IJoinClassBody } from 'common/interfaces';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IClassroom, IClassroomBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const CLASSROOM_API_REDUCER_KEY = 'classroomApi';
export const CLASSROOM_TAG = 'Classes';
export const classroomApi = createApi({
  reducerPath: CLASSROOM_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [CLASSROOM_TAG],
  endpoints: (builder) => ({
    getAllClasses: builder.query<IClassroom[], void>({
      query: () => _request.get('classes'),
      transformResponse: (response: IGenericGetAllResponse<IClassroom>) => response.data,
      providesTags: (result: IClassroom[] | undefined) =>
        result
          ? // successful query
            [...result.map(({ _id }) => ({ type: CLASSROOM_TAG, id: _id } as const)), { type: CLASSROOM_TAG, id: 'LIST' }]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: CLASSROOM_TAG, id: 'LIST' }],
    }),

    createClass: builder.mutation<IClassroom, IClassroomBody>({
      query: (body) => _request.post('classes', body),
      invalidatesTags: [{ type: CLASSROOM_TAG, id: 'LIST' }],
    }),

    joinClass: builder.mutation<any, IJoinClassBody>({
      query: (body) => _request.post('classes/join', body),
      invalidatesTags: [{ type: CLASSROOM_TAG, id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllClassesQuery, useCreateClassMutation, useJoinClassMutation } = classroomApi;
