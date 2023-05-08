import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import './App.css'
import { Header, Footer } from './components'
import { Home, ActiveListings, SignUp, Login, VerifyOtp, PasswordResetRequest, PasswordReset, CreateListing, ListingDetails } from './pages';

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
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/password-reset-request" element={<PasswordResetRequest />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/listings/:listing_id" element={<ListingDetails />} />
          </Routes>
        </div>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;