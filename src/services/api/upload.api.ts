//upload
import { IUploadResponse } from './../../common/interfaces';
import { _request } from './utils';
// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../repository';

// Define a service using a base URL and expected endpoints
export const UPLOAD_API_REDUCER_KEY = 'uploadApi';
export const uploadApi = createApi({
  reducerPath: UPLOAD_API_REDUCER_KEY,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IUploadResponse, FormData>({
      query: (body: FormData) => _request.post(`upload-files/imagekit`, body),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useUploadImageMutation } = uploadApi;
