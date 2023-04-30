import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Button,
  Image,
  useMediaQuery,
  Slide
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/header-logo.png';

export const Header = () => {
  const navigate = useNavigate();
  const [isSmallerThan992] = useMediaQuery("(max-width: 991px)")
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Box backgroundColor="rgb(248, 249, 250)" px={4} py={3} position="fixed" top="0" left="0" right="0" zIndex="10">
        <Image src={Logo} float='left' alt='Logo' role='button' onClick={() => navigate('/')} />
        <Flex mx="auto">
          {!isSmallerThan992 && (
            <>
              <Spacer />
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Home</Button>
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Active Listings</Button>
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Login</Button>
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Sign Up</Button>
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Watch List</Button>
              <Button fontSize={14} color="black" colorScheme="none" mr={5}>Create Listing</Button>
              <Spacer />
              <Button float='right' _hover={{ bg: 'red.600' }} backgroundColor="rgb(220, 53, 69)" color='white' onClick={() => console.log("dashboard")}>My Dashboard</Button>
            </>

          )}
          {isSmallerThan992 && (
            <>
              <Spacer />
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <HamburgerIcon w={8} h={8} />
              </Button>
            </>
          )}
        </Flex>
      </Box>
      {isSmallerThan992 && (
        <Slide backgroundColor="rgb(248, 249, 250)" direction="top" in={isMenuOpen} unmountOnExit={true} style={{ width: "100%", height: "100vh" }}>
          <Box float='left' display="block" pos="absolute" top="60px" left="0" right="0" backgroundColor="rgb(248, 249, 250)" p={2}>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Home</Button>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Active Listings</Button>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Login</Button>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Sign Up</Button>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Watch List</Button>
            <Button fontSize={14} color="black" colorScheme="none" mr={2} mb={2} w="100%">Create Listing</Button>

            <Button mt={2} backgroundColor="rgb(220, 53, 69)" _hover={{ bg: 'red.600' }} color='white' onClick={() => console.log("dashboard")}>My Dashboard</Button>
          </Box>
        </Slide>
      )}
    </>
  )
}
