import React from "react";
import "./Cart.scss";
import { useGetCartQuery } from "service/cartApi";
import CartItem from "./components/CartItem/CartItem";
import Checkout from "./components/Checkout/Checkout";

const Cart: React.FunctionComponent = () => {

  const { data, error, isLoading } = useGetCartQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (!data || data.cart.length <= 0) return <div>No items in cart!</div>;

  const total = data.cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="cart">

      <h1>Cart</h1>
      <h2>Total: ${total}</h2>

      <div className="cart__items">
        {data.cart.map((item) => (
          <div key={item.id} className="cart__items__item">
            <CartItem 
              cart={item}
            />
          </div>
        ))}
      </div>
      <Checkout />
    </div>
  );
}

export default Cart;