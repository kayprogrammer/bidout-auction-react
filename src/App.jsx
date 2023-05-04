import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"

import { HomePage } from './pages';

const App = () => {
  console.log(theme)
  document.title = "Kay's Auction House"
  return (
    <ChakraProvider>
      <Box className='app'>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;