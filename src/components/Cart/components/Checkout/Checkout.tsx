import React, { useState } from "react";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import { cartApi, useClearCartMutation } from "service/cartApi";
import { toast } from "react-toastify";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import { orderApi, useCreateOrderMutation } from "service/orderApi";
import { catalogApi } from "service/catalogAPI";

export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FunctionComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [clearCart, result] = useClearCartMutation();
  const [placeOrder, placeOrderResult] = useCreateOrderMutation();

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });


  const handleClearCart = () => {
    clearCart()
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.error, {
            position: "bottom-right"
          });
          return;
        }
        dispatch(cartApi.endpoints.getCart.initiate(undefined, { forceRefetch: true }));
        toast.success("Cart cleared successfully", {
          position: "bottom-right"
        });
        navigate('/');
      })
  }

  const handleCheckout = () => {
    placeOrder({
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      address: formValues.address,
      card_number: formValues.cardNumber,
      card_expiry: formValues.expiryDate,
      card_cvv: formValues.cvv
    })
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.error, {
            position: "bottom-right"
          });
          return;
        }
        dispatch(cartApi.endpoints.getCart.initiate(undefined, { forceRefetch: true }));
        dispatch(catalogApi.endpoints.getProducts.initiate({}, { forceRefetch: true }));
        dispatch(orderApi.endpoints.getOrders.initiate(undefined, { forceRefetch: true }));
        toast.success("Order placed successfully", {
          position: "bottom-right"
        });
        navigate('/orders');
      })
  }

  return (
    <div className="checkout">

      <CheckoutForm 
        formValues={formValues}
        setFormValues={setFormValues}
      />
      <button 
        className="checkout__checkout"
        onClick={handleCheckout}
      >
        Checkout
      </button>
      <button
        className="checkout__clear"
        onClick={handleClearCart}
        disabled={result.isLoading}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Checkout;