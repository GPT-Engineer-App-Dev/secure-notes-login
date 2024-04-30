import React, { useState, useEffect } from 'react';
import { client } from '../../lib/crud';
import { Box, Button, Input, VStack, useToast, Textarea, Tag, TagLabel, TagCloseButton, HStack } from '@chakra-ui/react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      setNotes(localNotes);
    } else {
      const fetchNotes = async () => {
        const fetchedNotes = await client.getWithPrefix('note:');
        if (fetchedNotes) {
          const notesValue = fetchedNotes.map(note => note.value);
          setNotes(notesValue);
          localStorage.setItem('notes', JSON.stringify(notesValue));
        }
      };
      fetchNotes();
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

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    const noteObject = { note, tags };
    const success = await client.set(`note:${new Date().toISOString()}`, noteObject);
    if (success) {
      const updatedNotes = [...notes, noteObject];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      toast({
        title: 'Note saved',
        description: 'Your note has been saved successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setNote('');
      setTags([]);
    }
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
          <>
            <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
            <Textarea placeholder="Write your note here..." value={note} onChange={handleNoteChange} />
            <HStack spacing={2}>
              {tags.map((tag, index) => (
                <Tag size="lg" key={index} borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
              <Input placeholder="Add a tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={event => event.key === 'Enter' ? handleAddTag() : null} />
            </HStack>
            <Button colorScheme="green" onClick={handleSaveNote}>Save Note</Button>
            <VStack spacing={4}>
              {notes.map((noteObj, index) => (
                <Box key={index} p={4} shadow="md" borderWidth="1px">
                  <Text mt={2}>{noteObj.note}</Text>
                  <HStack spacing={2}>
                    {noteObj.tags.map((tag, tagIndex) => (
                      <Tag size="md" key={tagIndex} borderRadius="full">
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                </Box>
              ))}
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;