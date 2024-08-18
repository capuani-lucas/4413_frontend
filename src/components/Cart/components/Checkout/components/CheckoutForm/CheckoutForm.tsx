import React from "react";

import "./CheckoutForm.scss";
import { FormValues } from "../../Checkout";

type CheckoutFormProps = {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const CheckoutForm: React.FunctionComponent<CheckoutFormProps> = ({ formValues, setFormValues }) => {


  const handleInputChange = (field: keyof FormValues, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <div className="checkoutForm">
      <div>
        <p>First Name</p>
        <input 
          type="text" 
          value={formValues.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
        />
      </div>
      <div>
        <p>Last Name</p>
        <input
          type="text" 
          value={formValues.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
      </div>
      <div>
        <p>Address</p>
        <input 
          type="text" 
          value={formValues.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </div>
      <div>
        <p>Card Number</p>
        <input 
          type="number" 
          value={formValues.cardNumber || ""}
          placeholder="1234123412341234"
          onChange={(e) => {
            if (e.target.value.length <= 16) {
              handleInputChange("cardNumber", e.target.value)
            }
          }}
        />
      </div>
      <div>
        <p>Expiry Date</p>
        <input 
          type="number" 
          value={formValues.expiryDate === undefined ? "" : formValues.expiryDate}
          placeholder="MMYY"
          onChange={(e) => {
            if (e.target.value.length <= 4) {
              handleInputChange("expiryDate", e.target.value)
            }
          }}
        />
      </div>
      <div>
        <p>CVV</p>
        <input 
          type="number" 
          value={formValues.cvv === undefined ? "" : formValues.cvv}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              handleInputChange("cvv", e.target.value)
            }
          }}
        />
      </div>
  </div>
  );
}

export default CheckoutForm;
