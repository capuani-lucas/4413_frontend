import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthBaseQuery } from './utils';
import { Product } from './catalogAPI';

export type Order = {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  address: string;
};

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: getAuthBaseQuery('order/'),
  endpoints: (builder) => ({
    getOrders: builder.query<{orders: Order[]}, void>({
      query: () => '/',
    }),
    createOrder: builder.mutation<Order, { first_name: string, last_name: string, address: string }>({
      query: ({ first_name, last_name, address }) => ({
        url: '/',
        method: 'POST',
        body: { first_name, last_name, address },
      }),
    })
  }),
});

export const { 
  useGetOrdersQuery, 
  useCreateOrderMutation
} = orderApi;
