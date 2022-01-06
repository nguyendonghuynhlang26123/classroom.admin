import { IAcceptInviteUserBody } from './../../common/interfaces/classes/classroomInvite.interface';
import { _request } from './utils';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import { IClassroom, IClassroomBody, UserRole, IClassroomUser, IInviteUserBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const CLASSROOM_DETAILS_API_REDUCER_KEY = 'classroomDetailsApi';
export const CLASSROOM_DETAILS_TAG = 'ClassDetails';
export const classroomDetailsApi = createApi({
  reducerPath: CLASSROOM_DETAILS_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [CLASSROOM_DETAILS_TAG],
  endpoints: (builder) => ({
    getClassDetails: builder.query<IClassroom, string>({
      query: (id: string) => _request.get(`classes/${id}`),
      providesTags: [{ type: CLASSROOM_DETAILS_TAG, id: 'DETAILS' }],
    }),

    getMyRole: builder.query<UserRole, string>({
      query: (id: string) => _request.get(`classes/${id}/role`),
      transformResponse: (response: { role: UserRole }) => response.role,
    }),

    getClassUsers: builder.query<IClassroomUser[], string>({
      query: (id: string) => _request.get(`classes/${id}/people`),
      providesTags: [{ type: CLASSROOM_DETAILS_TAG, id: 'PEOPLE' }],
      transformResponse: (response: { users: IClassroomUser[] }) => response.users,
    }),

    updateClass: builder.mutation<IClassroom, { id: string; body: IClassroomBody }>({
      query: ({ id, body }) => _request.put('classes/' + id, body),
      invalidatesTags: [{ type: CLASSROOM_DETAILS_TAG, id: 'DETAILS' }],
    }),

    inviteUser: builder.mutation<any, IInviteUserBody>({
      query: (body) => _request.post(`classes/invite`, body),
      invalidatesTags: [{ type: CLASSROOM_DETAILS_TAG, id: 'PEOPLE' }],
    }),

    acceptInvitation: builder.mutation<any, IAcceptInviteUserBody>({
      query: (body) => {
        if (UserRole.STUDENT === body.role) return _request.post('classes/join', body);
        else return _request.post('classes/invite/accept', body);
      },
      invalidatesTags: [{ type: CLASSROOM_DETAILS_TAG, id: 'PEOPLE' }],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetClassDetailsQuery,
  useGetMyRoleQuery,
  useUpdateClassMutation,
  useGetClassUsersQuery,
  useInviteUserMutation,
  useAcceptInvitationMutation,
} = classroomDetailsApi;
