import { commonApi } from 'src/services/common.api';
import { IUsersModel } from 'src/services/models/users.model';

export const gardensApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchGarden: build.query<IUsersModel, string>({
      query: (id) => ({ url: `/gardens/${id}` }),
      providesTags: (_) => [{ type: 'Gardens' }]
    })
  })
});

export const { useFetchGardenQuery } = gardensApi;
