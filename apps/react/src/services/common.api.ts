import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newtimesgarden.online/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('Authorization', 'anonymous');

      return headers;
    }
  }),
  tagTypes: ['Users', 'Gardens', 'Plants', 'Products', 'Settings'],
  endpoints: (_) => ({})
});
