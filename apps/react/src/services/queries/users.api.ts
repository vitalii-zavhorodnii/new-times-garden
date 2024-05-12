import { commonApi } from 'src/services/common.api';
import { IUsersModel } from 'src/services/models/users.model';

interface IStartGrowDto {
  userId: string | number;
  plantId: string;
  rowIndex: number;
  plantIndex: number;
  plantedAtClient: number;
}

interface IHarvestDto {
  userId: string | number;
  rowIndex: number;
  plantIndex: number;
}

export const usersApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUser: build.query<IUsersModel, string>({
      query: (id) => ({ url: `/users/${id}` }),
      providesTags: (_) => [{ type: 'Users' }]
    }),
    startGrow: build.mutation<boolean, IStartGrowDto>({
      query: ({ userId, plantId, rowIndex, plantIndex, plantedAtClient }) => ({
        url: `/users/${userId}/start-grow`,
        method: 'POST',
        body: { plantId, rowIndex, plantIndex, plantedAtClient }
      })
    }),
    harvest: build.mutation<boolean, IHarvestDto>({
      query: ({ userId, rowIndex, plantIndex }) => ({
        url: `/users/${userId}/harvest`,
        method: 'POST',
        body: { rowIndex, plantIndex }
      })
    })
  })
});

export const { useFetchUserQuery, useStartGrowMutation, useHarvestMutation } =
  usersApi;
