import React from "react";
import "./Cart.scss";
import { useGetCartQuery } from "service/cartApi";
import CartItem from "./components/CartItem/CartItem";
import Checkout from "./components/Checkout/Checkout";
import {
  Box,
} from "@chakra-ui/react";

const Cart: React.FunctionComponent = () => {

  const { data, error, isLoading } = useGetCartQuery();

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error</Box>;

  if (!data || data.cart.length <= 0) return <Box>No items in cart!</Box>;

  const total = data.cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <Box className="cart">

      <h1>Cart</h1>
      <h2>Total: ${total}</h2>

      <Box className="cart__items">
        {data.cart.map((item) => (
          <Box key={item.id} className="cart__items__item">
            <CartItem 
              cart={item}
            />
          </Box>
        ))}
      </Box>
      <Checkout />
    </Box>
  );
}

export default Cart;