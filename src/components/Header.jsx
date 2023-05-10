import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Button,
  Image,
  useBreakpointValue,
  Slide,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/header-logo.png';

const Header = () => {
  const navigate = useNavigate();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyles = {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginRight: 30,
  }

  const linkStyles2 = {
    ...linkStyles,
    display: "block",
    marginBottom: 15
  }

  return (
    <>
      <Box backgroundColor="rgb(248, 249, 250)" px={4} py={3} position="fixed" top="0" left="0" right="0" zIndex="10">
        <Image src={Logo} float='left' alt='Logo' role='button' onClick={() => navigate('/')} />
        <Flex mx="auto">
          {isLargeScreen && (
            <>
              <Spacer />
              <Link to='/' style={linkStyles}>Home</Link>
              <Link to='/listings' style={linkStyles}>Active Listings</Link>
              <Link to='/login' style={linkStyles}>Login</Link>
              <Link to='/signup' style={linkStyles}>Sign Up</Link>
              <Link to='/watchlist' style={linkStyles}>Watch List</Link>
              <Link to='/create-listing' style={linkStyles}>Create Listing</Link>
              <Spacer />
              <Button float='right' _hover={{ bg: 'red.600' }} backgroundColor="rgb(220, 53, 69)" color='white' onClick={() => navigate('/dashboard')}>My Dashboard</Button>
            </>

          )}
          {!isLargeScreen && (
            <>
              <Spacer />
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <HamburgerIcon w={8} h={8} />
              </Button>
            </>
          )}
        </Flex>
      </Box>
      {!isLargeScreen && (
        <Slide backgroundColor="rgb(248, 249, 250)" direction="top" in={isMenuOpen} unmountOnExit={true} style={{ width: "100%", height: "100vh", zIndex: 1 }}>
          <Box pos="absolute" top="60px" left="0" right="0" backgroundColor="rgb(248, 249, 250)" p='1em 2.5em 2.5em 2.5em'>
            <Link to='/' style={linkStyles2}>Home</Link>
            <Link to='/listings' style={linkStyles2}>Active Listings</Link>
            <Link to='/login' style={linkStyles2}>Login</Link>
            <Link to='/signup' style={linkStyles2}>Sign Up</Link>
            <Link to='/watchlist' style={linkStyles2}>Watch List</Link>
            <Link to='/create-listing' style={linkStyles2}>Create Listing</Link>

            <Button mt={2} backgroundColor="rgb(220, 53, 69)" _hover={{ bg: 'red.600' }} color='white' onClick={() => console.log("dashboard")}>My Dashboard</Button>
          </Box>
        </Slide>
      )}
    </>
  )
}

export default Header;
