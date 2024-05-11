import { commonApi } from '../common.api';
import { IProductsModel } from '../models/products.model';

export const productsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProducts: build.query<IProductsModel[], void>({
      query: () => ({ url: `/products` }),
      providesTags: (_) => [{ type: 'Products' }]
    })
  })
});

export const { useFetchProductsQuery } = productsApi;
