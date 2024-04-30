import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch('https://mnwefvnykbgyhbdzpleh.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('supabase.auth.token', data.access_token);
      setIsLoggedIn(true);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login failed',
        description: data.error_description || 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('supabase.auth.token');
    setIsLoggedIn(false);
    toast({
      title: 'Logged out',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        {!isLoggedIn ? (
          <>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
          </>
        ) : (
          <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
        )}
      </VStack>
    </Box>
  );
};

export default Index;