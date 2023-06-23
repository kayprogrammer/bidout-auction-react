import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Image,
  useBreakpointValue,
  Slide,
  GridItem,
  Grid,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/header-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../features/auth/authSlice'


const Header = () => {
  const navigate = useNavigate();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const navDisplayCols = useBreakpointValue({ base: 2, lg: 4 })
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

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/login')
    })
  }


  return (
    <>
      <Grid gap={0} templateColumns={[`repeat(${navDisplayCols}, 1fr)`]} backgroundColor="rgb(248, 249, 250)" px={4} py={3} position="fixed" top="0" left="0" right="0" zIndex="10">
        <GridItem>
          <Image src={Logo} float='left' alt='Logo' role='button' onClick={() => navigate('/')} />
        </GridItem>
        {isLargeScreen ? (
          <>
            <GridItem display='table' colSpan={2} textAlign='center' m='o auto' alignSelf='center'>
              <Link to='/' style={linkStyles}>Home</Link>
              <Link to='/listings' style={linkStyles}>Active Listings</Link>
              {(!user?.access) && (
                <>
                  <Link to='/login' style={linkStyles}>Login</Link>
                  <Link to='/signup' style={linkStyles}>Sign Up</Link>
                </>
              )}
              <Link to='/watchlist' style={linkStyles}>Watch List</Link>
              {(user?.access) && (
                <>
                  <Link to='/create-listing' style={linkStyles}>Create Listing</Link>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ alignSelf: 'center' }} role='button' onClick={handleLogout} />
                </>
              )}
            </GridItem>
            <GridItem>
              {(user?.access) && (
                <Button float='right' _hover={{ bg: 'red.600' }} backgroundColor="rgb(220, 53, 69)" color='white' onClick={() => navigate('/dashboard')}>My Dashboard</Button>
              )}
            </GridItem>
          </>
        ) : (
          <Button ml='auto' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HamburgerIcon w={8} h={8} />
          </Button>
        )}

      </Grid>
      {!isLargeScreen && (
        <Slide backgroundColor="rgb(248, 249, 250)" direction="top" in={isMenuOpen} unmountOnExit={true} style={{ width: "100%", height: "100vh", zIndex: 1 }}>
          <Box pos="absolute" top="60px" left="0" right="0" backgroundColor="rgb(248, 249, 250)" p='1em 2.5em 2.5em 2.5em'>
            <Link onClick={() => setIsMenuOpen(false)} to='/' style={linkStyles2}>Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} to='/listings' style={linkStyles2}>Active Listings</Link>
            {(!user?.access) && (
              <>
                <Link onClick={() => setIsMenuOpen(false)} to='/login' style={linkStyles2}>Login</Link>
                <Link onClick={() => setIsMenuOpen(false)} to='/signup' style={linkStyles2}>Sign Up</Link>
              </>
            )}

            <Link onClick={() => setIsMenuOpen(false)} to='/watchlist' style={linkStyles2}>Watch List</Link>
            {(user?.access) && (
              <>
                <Link onClick={() => setIsMenuOpen(false)} to='/create-listing' style={linkStyles2}>Create Listing</Link>
                <FontAwesomeIcon icon={faSignOutAlt} style={{ alignSelf: 'center' }} role='button' onClick={handleLogout} />
                <br />
                <Button mt={2} backgroundColor="rgb(220, 53, 69)" _hover={{ bg: 'red.600' }} color='white' onClick={() => { navigate('/dashboard'); setIsMenuOpen(false) }}>My Dashboard</Button>
              </>
            )}

          </Box>
        </Slide>
      )}
    </>
  )
}

export default Header;
