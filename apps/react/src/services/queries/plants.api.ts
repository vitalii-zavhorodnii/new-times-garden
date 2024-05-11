import { commonApi } from '../common.api';
import { IPlantsList } from '../models/plants.model';

export const plantsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlants: build.query<IPlantsList, void>({
      query: () => ({ url: `/plants` }),
      providesTags: (_) => [{ type: 'Plants' }]
    })
  })
});

export const { useFetchPlantsQuery } = plantsApi;
