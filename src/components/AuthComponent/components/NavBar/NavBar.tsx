import React from "react";
import "./NavBar.scss";

import { logout } from "service/utils";
import CartOverview from "./components/CartOverview/CartOverview";
import { BASE_URL } from "config";
import { Link, LinkProps, Button, Box, Text, Flex } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";



const routes = [
  {
    path: "/",
    name: "Catalog",
  },
  {
    path: "/orders",
    name: "Orders",
  }
]

const NavBar: React.FunctionComponent = () => {

  return (
    <Flex as="nav" bg="teal" color="white" p={4} align="center" justify="space-between">
      <Box>
        <h1>Movie Vault</h1>
      </Box>
      <Flex gap={4} alignItems='center'>
        {routes.map((route) => (
          <Link 
            as={RouterLink}
            to={route.path} 
            key={route.path}
          >
            {route.name}
          </Link>
        ))}
      </Flex>
      <Flex justify="space-between" gap={4}>
        <CartOverview />
        <ChakraLink
          href={`${BASE_URL}/admin`}
          target="_blank"
          rel="noreferrer"
        >
            <Button as="a">Admin</Button>
        </ChakraLink>
        <Button
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Flex>

    </Flex>
  );
};

export default NavBar;
