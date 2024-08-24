import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "service/userAPI";
import { Input, Button, Box, Text, Flex } from '@chakra-ui/react';

const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error: loginError }] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    try {
      const response: any = await login({ username, password }).unwrap();
      localStorage.setItem('token', response.access);
      navigate('/');
    } catch (error: any) {
      setError(error?.data?.error?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center" p={4}>
    <Box className="login" w="25%" bg="teal" p={8} borderRadius='md' >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">Login</Text>
        {error && <Text color="red.500" textAlign="center">{error}</Text>}
        <Box mb={4}>
          <Text mb={1}>Username</Text>
          <Input 
            bg="white"
            type="text" 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Box>
        <Box mb={4}>
          <Text mb={1}>Password</Text>
          <Input 
            bg="white"
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Box>
        <Button
          mb={4}
          mr={4}
          colorScheme="teal"
          onClick={handleLogin}
          isLoading={isLoading}
          loadingText="Logging in"
        >
          Login
        </Button>
        <Button
          bg="white"
          mb={4}
          variant="outline"
          onClick={() => navigate('/signup')}
          isDisabled={isLoading}
        >
          Sign Up
        </Button>
    </Box>
    </Flex>
  );
};

export default Login;
