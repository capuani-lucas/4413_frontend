import React from "react";
import "./CartOverview.scss";
import { useGetCartQuery } from "service/cartApi";

const CartOverview: React.FunctionComponent = () => {

  const { data, isLoading, error } = useGetCartQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const cartProductCount = data?.cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="cartOverview">
      <button
        className="cartOverview__button"
      >
        Cart ({ cartProductCount })
      </button>
    </div>
  );
}

export default CartOverview;