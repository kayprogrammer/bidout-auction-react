import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import './App.css'
import { Header, Footer } from './components'
import { Home, ActiveListings, SignUp, Login } from './pages';

const App = () => {
  document.title = "Kay's Auction House"
  return (
    <ChakraProvider>
      <Box className='app' w='100%'>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/listings" element={<ActiveListings />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;