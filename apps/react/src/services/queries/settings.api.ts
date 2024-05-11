import { commonApi } from '../common.api';

export const settingsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchSettings: build.query<any, void>({
      query: () => ({ url: `/settings` }),
      providesTags: (_) => [{ type: 'Products' }]
    })
  })
});

export const { useFetchSettingsQuery } = settingsApi;
