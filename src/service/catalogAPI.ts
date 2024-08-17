import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthBaseQuery } from './utils';

export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  category: Category;
};

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: getAuthBaseQuery('catalog/'),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => 'categories/',
    }),
    getProducts: builder.query<Product[], void>({
      query: () => '/',
    }),
    getProduct: builder.query<Product, number>({
      query: (productId) => `${productId}/`,
    }),
  }),
});


export const { 
  useGetCategoriesQuery, 
  useGetProductsQuery, 
  useGetProductQuery 
} = catalogApi;
