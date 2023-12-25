import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import './App.css'
import { Header, Footer } from './components'
import { Home, ActiveListings, SignUp, Login, PasswordResetRequest, PasswordReset, CreateListing, ListingDetails, UserDashboard, AllUserListings, ListingBids, WatchList, VerifyActivationOtp, ProtectedRoute, PublicRoute, NotFound } from './pages';
import { store } from './app/store';
import interceptors from "../src/features/interceptors"

const App = () => {
  document.title = "Kay's Auction House"
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  if (!isLoaded) {
    setIsLoaded(true)
    interceptors(store, navigate)
  }

  return (
    <ChakraProvider>
      <Box className='app' w='100%'>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/listings" element={<ActiveListings />} />
            <Route path="/listings/categories/:categorySlug" element={<ActiveListings />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/listings/:listingSlug" element={<ListingDetails />} />

            <Route path="/signup" element={<PublicRoute Component={SignUp} />} />
            <Route path="/login" element={<PublicRoute Component={Login} />} />
            <Route path="/verify-activation-otp" element={<PublicRoute Component={VerifyActivationOtp} />} />
            <Route path="/password-reset-request" element={<PublicRoute Component={PasswordResetRequest} />} />
            <Route path="/password-reset" element={<PublicRoute Component={PasswordReset} />} />

            <Route path="/dashboard" element={<ProtectedRoute Component={UserDashboard} />} />
            <Route path="/dashboard/listings" element={<ProtectedRoute Component={AllUserListings} />} />
            <Route path="/dashboard/listings/:listingSlug/bids" element={<ProtectedRoute Component={ListingBids} />} />
            <Route path="/create-listing" element={<ProtectedRoute Component={CreateListing} />} />
            <Route path="/dashboard/listings/:listingSlug/update" element={<ProtectedRoute Component={CreateListing} type='update' />} />

            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;