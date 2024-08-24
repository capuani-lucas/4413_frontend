import React from "react";
import "./CartOverview.scss";
import { useGetCartQuery } from "service/cartApi";
import { useNavigate } from "react-router-dom";
import {Box, Button} from '@chakra-ui/react';


const CartOverview: React.FunctionComponent = () => {

  const { data, isLoading, error } = useGetCartQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const cartProductCount = data?.cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <Box>
      <Button
        className="cartOverview__button"
        onClick={() => navigate('/cart')}
      >
        Cart ({ cartProductCount })
      </Button>
    </Box>
  );
}

export default CartOverview;