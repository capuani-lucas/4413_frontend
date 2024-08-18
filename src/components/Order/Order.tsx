import React from "react";
import "./Order.scss";
import { useGetOrdersQuery } from "service/orderApi";

const Order: React.FunctionComponent = () => {

  const { data, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="order">
      <h1>Orders</h1>

      <div className="order__orders">
        {data?.orders.map((order) => (
          <div className="order__orders__order" key={`order-${order.id}`}>
            <div className="order__orders__order__left">
              <img src={order.product.image_url} alt={order.product.name} />
            </div>
            <div className="order__orders__order__right">
              <div>
                <div>
                  <p>Name</p>
                  <p>{order.product.name}</p>
                </div>
                <div>
                  <p>Price</p>
                  <p>${order.price}</p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p>{order.quantity}</p>
                </div>
                <div>
                  <p>Order Date</p>
                  <p>{order.created_at}</p>
                </div>
                <div>
                  <p>Delivery Address</p>
                  <p>{order.address}</p>
                </div>
              </div>
              <div> 
                <div>
                  <p>Card Number</p>
                  <p>{order.card_number}</p>
                </div>
                <div>
                  <p>Card Expiry</p>
                  <p>{order.card_expiry}</p>
                </div>
                <div>
                  <p>Card CVV</p>
                  <p>{order.card_cvv}</p>
                </div>
                <div>
                  <p>Total</p>
                  <p>${order.price * order.quantity}</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Order;
