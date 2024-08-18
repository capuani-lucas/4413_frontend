import React, { useEffect, useState } from "react";
import "./CartItem.scss";

import { cartApi, CartItem as CartItemType, useRemoveFromCartMutation, useUpdateCartMutation } from "service/cartApi";
import { toast } from "react-toastify";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";

type CartItemProps = {
  cart: CartItemType;
};

const CartItem: React.FunctionComponent<CartItemProps> = ({ cart }) => {

  const [updateCart, result] = useUpdateCartMutation();
  const [removeFromCart, removeResult] = useRemoveFromCartMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState<number | null>(cart.quantity);

  const handleUpdate = (quantity: number | null) => {

    if (!quantity || quantity === cart.quantity) {
      return;
    }

    if (quantity <= 0) {
      handleRemove();
      return;
    }

    updateCart({ cartId: cart.id, quantity })
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.error, {
            position: "bottom-right"
          });
          setQuantity(cart.quantity);
          return
        }
        dispatch(cartApi.endpoints.getCart.initiate(undefined, { forceRefetch: true }));
        toast.success("Cart updated successfully", {
          position: "bottom-right"
        });
      })
  }

  const handleRemove = () => {
    removeFromCart(cart.id)
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.error, {
            position: "bottom-right"
          });
          return
        }
        dispatch(cartApi.endpoints.getCart.initiate(undefined, { forceRefetch: true }));
        toast.success("Item removed from cart", {
          position: "bottom-right"
        });
      })
  }

  return (
    <div className="cartItem">
      
      <div className="cartItem__left">
        <img src={cart.product.image_url} alt={cart.product.name} />
      </div>
      <div className="cartItem__right">
        <div className="cartItem__right__name">
          <p>Name</p>
          <p>{cart.product.name}</p>
        </div>
        <div className="cartItem__right__quantity">
          <p>Quantity</p>
          <input 
            type="number" 
            value={quantity || ""}
            onChange={(e) => setQuantity(!e.target.value ? null : parseInt(e.target.value))} 
            onBlur={() => handleUpdate(quantity)}
          />
        </div>
        <div className="cartItem__right__price">
          <p>Price</p>
          <p>${cart.product.price * cart.quantity}</p>
        </div>
        <button 
          className="cartItem__right__remove"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;