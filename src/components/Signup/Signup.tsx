import React, { useState } from "react";
import './Signup.scss';
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "service/userAPI";
import {
  Box,
  Button,
  Input,
  Flex,
  Text
} from "@chakra-ui/react";

const Signup: React.FunctionComponent = () => {

  const navigate = useNavigate();
  const [signup, signupResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSignup = () => {

    if (!username || !password) {
      return
    }

    signup({ username, password })
      .then((data: any) => {
        if (data.error) {
          setError(data.error.data.error);
          return;
        }
        login({ username, password })
          .then((data: any) => {
            if (data.error) {
              setError(data.error.data.error.detail);
              return;
            }
            localStorage.setItem('token', data.data.access);
            navigate('/');
          })
      })
  }

  return (
    <Flex height="100vh" align="center" justify="center" p={4}>
          <Box className="login" w="25%" bg="teal" p={8} borderRadius='md' >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">Sign Up</Text>
          {
            error && <p className="signup__left__con__error">{error}</p>
          }
          <Box>
            <p>Email</p>
            <Input 
              bg="white"
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              mb={4}
            />
          </Box>
          <Box mb={4}>
            <p>Password</p>
            <Input 
              bg="white"
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}  
            />
          </Box>
          <Button
            mr={4}
            type="submit"
            disabled={signupResult.isLoading || loginResult.isLoading}
            onClick={handleSignup}
            colorScheme="teal"

          >
            Sign Up
          </Button>
          <Button
            type="submit"
            onClick={() => navigate('/login')}
            disabled={signupResult.isLoading || loginResult.isLoading}
            colorScheme="teal"

          >
            Log in
          </Button>
          </Box>
    </Flex>
  );
}

export default Signup;
