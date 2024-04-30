import React, { useState } from 'react';
import { Box, Button, Input, VStack, useToast, useMediaQuery } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const handleLogin = async () => {
    // Placeholder for login logic
    toast({
      title: 'Login Attempt',
      description: 'This is a placeholder login function.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      minH="100vh"
      d="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, teal.400, purple.300)"
    >
      <VStack
        spacing={4}
        p={isLargerThan768 ? 8 : 4}
        borderRadius="lg"
        bg="whiteAlpha.900"
        boxShadow="xl"
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          variant="filled"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          variant="filled"
        />
        <Button
          colorScheme="purple"
          size="lg"
          w="full"
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;