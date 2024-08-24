import React from "react";
import "./Order.scss";
import { useGetOrdersQuery } from "service/orderApi";
import {
  Box,
  Text
} from "@chakra-ui/react";

const Order: React.FunctionComponent = () => {

  const { data, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error</Box>;
  return (
    <Box className="order">
    <Text fontSize="2xl" fontWeight="bold" textAlign="center">Orders</Text>

      <Box className="order__orders">
        {data?.orders.map((order) => (
          <Box className="order__orders__order" key={`order-${order.id}`}>
            <Box className="order__orders__order__left">
              <img src={order.product.image_url} alt={order.product.name} />
            </Box>
            <Box className="order__orders__order__right">
              <Box>
                <Box>
                  <p>Name</p>
                  <p>{order.product.name}</p>
                </Box>
                <Box>
                  <p>Price</p>
                  <p>${order.price}</p>
                  </Box>
                <Box>
                  <p>Quantity</p>
                  <p>{order.quantity}</p>
                </Box>
                <Box>
                  <p>Order Date</p>
                  <p>{order.created_at}</p>
                </Box>
                <Box>
                  <p>Delivery Address</p>
                  <p>{order.address}</p>
                </Box>
              </Box>
              <Box>
               <Box>
                  <p>Card Number</p>
                  <p>{order.card_number}</p>
                </Box>
                <Box>
                  <p>Card Expiry</p>
                  <p>{order.card_expiry}</p>
                </Box>
                <Box>
                  <p>Card CVV</p>
                  <p>{order.card_cvv}</p>
                </Box>
                <Box>
                  <p>Total</p>
                  <p>${order.price * order.quantity}</p>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Order;
