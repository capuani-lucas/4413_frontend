import React, { useState } from "react";
import "./Actions.scss";
import { useNavigate } from "react-router-dom";
import { cartApi, useClearCartMutation } from "service/cartApi";
import { toast } from "react-toastify";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";

const Actions: React.FunctionComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [clearCart, result] = useClearCartMutation();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

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

  return (
    <div className="actions">

      <div className="actions__form">
        <div>
          <p>First Name</p>
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <p>Address</p>
          <input 
            type="text" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <button 
        className="actions__checkout"
        onClick={() => navigate('/checkout')}
      >
        Checkout
      </button>
      <button
        className="actions__clear"
        onClick={handleClearCart}
        disabled={result.isLoading}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Actions;