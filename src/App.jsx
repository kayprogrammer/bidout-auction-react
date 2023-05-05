import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import './App.css'
import { Header, Footer } from './components'
import { HomePage, ActiveListings } from './pages';

const App = () => {
  document.title = "Kay's Auction House"
  return (
    <ChakraProvider>
      <Box className='app' w='100%'>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/listings" element={<ActiveListings />} />
          </Routes>
        </div>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;