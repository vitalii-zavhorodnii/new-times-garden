import { commonApi } from 'src/services/common.api';
import { IUsersModel } from 'src/services/models/users.model';

export const usersApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUser: build.query<IUsersModel, string>({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: (_) => [{ type: 'Users' }]
    })
  })
});

export const { useFetchUserQuery } = usersApi;
