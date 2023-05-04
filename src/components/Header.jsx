import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const buttonStyles = {
    fontSize: 14,
    color: "black",
    colorScheme: "none",
    mr: 5,
  }

  const buttonStyles2 = {
    ...buttonStyles,
    display: "block",
    mb: 2
  }

  return (
    <>
      <Box backgroundColor="rgb(248, 249, 250)" px={4} py={3} position="fixed" top="0" left="0" right="0" zIndex="10">
        <Image src={Logo} float='left' alt='Logo' role='button' onClick={() => navigate('/')} />
        <Flex mx="auto">
          {isLargeScreen && (
            <>
              <Spacer />
              <Button {...buttonStyles}>Home</Button>
              <Button {...buttonStyles}>Active Listings</Button>
              <Button {...buttonStyles}>Login</Button>
              <Button {...buttonStyles}>Sign Up</Button>
              <Button {...buttonStyles}>Watch List</Button>
              <Button {...buttonStyles}>Create Listing</Button>
              <Spacer />
              <Button float='right' _hover={{ bg: 'red.600' }} backgroundColor="rgb(220, 53, 69)" color='white' onClick={() => console.log("dashboard")}>My Dashboard</Button>
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
          <Box pos="absolute" top="60px" left="0" right="0" backgroundColor="rgb(248, 249, 250)" p={2}>
            <Button {...buttonStyles2}>Home</Button>
            <Button {...buttonStyles2}>Active Listings</Button>
            <Button {...buttonStyles2}>Login</Button>
            <Button {...buttonStyles2}>Sign Up</Button>
            <Button {...buttonStyles2}>Watch List</Button>
            <Button {...buttonStyles2}>Create Listing</Button>

            <Button mt={2} backgroundColor="rgb(220, 53, 69)" _hover={{ bg: 'red.600' }} color='white' onClick={() => console.log("dashboard")}>My Dashboard</Button>
          </Box>
        </Slide>
      )}
    </>
  )
}

export default Header;
