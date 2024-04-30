import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, useToast, Heading, Text, Flex } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    // Simulated login logic
    setIsLoggedIn(true);
    toast({
      title: 'Login successful',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: 'Logged out',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
      <Box p={8} maxW="sm" borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
        <VStack spacing={4}>
          {!isLoggedIn ? (
            <>
              <Heading as="h1" size="lg" textAlign="center" mb={6}>Login</Heading>
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} size="lg" mb={3} />
              <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} size="lg" mb={3} />
              <Button colorScheme="blue" size="lg" width="full" onClick={handleLogin}>Login</Button>
              <Text mt={4} fontSize="sm" textAlign="center">Don't have an account? <Text as="span" color="blue.500" fontWeight="bold">Sign up</Text></Text>
            </>
          ) : (
            <>
              <Button colorScheme="red" size="lg" width="full" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default Index;