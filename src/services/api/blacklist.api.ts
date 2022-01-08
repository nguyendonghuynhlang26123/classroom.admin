import { QueryType } from 'common/type';
import { _request, queryToUrl } from './utils';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

import type { IBlackList, IGenericGetAllResponse, IBanAccountBody } from 'common/interfaces';

// Define a service using a base URL and expected endpoints
export const BLACKLIST_API_REDUCER_KEY = 'blacklistsApi';
export const BLACKLIST_TAG = 'Blacklists';
export const blacklistsApi = createApi({
  reducerPath: BLACKLIST_API_REDUCER_KEY,
  baseQuery: baseQuery,
  tagTypes: [BLACKLIST_TAG],
  endpoints: (builder) => ({
    fetchAllBlacklist: builder.mutation<IGenericGetAllResponse<IBlackList>, QueryType>({
      query: (query: QueryType) => _request.get(queryToUrl(`admin/blacklist`, query)),
    }),

    banAccount: builder.mutation<any, IBanAccountBody>({
      query: (body) => _request.post(`admin/blacklist`, body),
    }),

    unblockAccount: builder.mutation<any, string>({
      query: (id) => _request.put(`admin/blacklist/${id}/restore`, {}),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useBanAccountMutation, useFetchAllBlacklistMutation, useUnblockAccountMutation } = blacklistsApi;
