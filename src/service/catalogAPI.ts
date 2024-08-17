import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthBaseQuery } from './utils';

export type Category = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type Brand = {
  id: number;
  name: string;
  image_url: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  category: Category;
  brand: Brand;
};

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: getAuthBaseQuery('catalog/'),
  endpoints: (builder) => ({
    getCategories: builder.query<{categories: Category[]}, void>({
      query: () => 'categories/',
    }),
    getBrands: builder.query<{brands: Brand[]}, void>({
      query: () => 'brands/',
    }),
    getProducts: builder.query<{catalog: Product[]}, { brand?: string, category?: string, sort_by?: string, search?: string } >({
      query: ({ brand, category, sort_by, search }) => {
        const params = new URLSearchParams();
        if (brand) params.append('brand', brand);
        if (category) params.append('category', category);
        if (sort_by) params.append('sort_by', sort_by);
        if (search) params.append('search', search);
        return { url: `/?${params.toString()}` };
      },
    }),
    getProduct: builder.query<Product, number>({
      query: (productId) => `${productId}/`,
    }),
  }),
});


export const { 
  useGetCategoriesQuery, 
  useGetProductsQuery, 
  useGetProductQuery,
  useGetBrandsQuery
} = catalogApi;
