import { Product } from "./catalogAPI";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getAuthBaseQuery } from "./utils";


export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: getAuthBaseQuery('cart/'),
  endpoints: (builder) => ({
    getCart: builder.query<{cart: CartItem[]}, void>({
      query: () => '/',
    }),
    addToCart: builder.mutation<CartItem, { product: number, quantity: number }>({
      query: ({ product, quantity }) => ({
        url: `add/${product}/`,
        method: 'POST',
        body: { quantity },
      }),
    }),
    removeFromCart: builder.mutation<CartItem, number>({
      query: (cartId) => ({
        url: `remove/${cartId}/`,
        method: 'DELETE',
      }),
    }),
    updateCart: builder.mutation<CartItem, { cartId: number, quantity: number }>({
      query: ({ cartId, quantity }) => ({
        url: `update/${cartId}/`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: 'clear/',
        method: 'POST',
      }),
    })
  }),
});

export const { 
  useGetCartQuery, 
  useAddToCartMutation, 
  useRemoveFromCartMutation, 
  useUpdateCartMutation,
  useClearCartMutation
} = cartApi;