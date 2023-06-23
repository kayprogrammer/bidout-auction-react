import { Box, Button, Card, CloseButton, Heading, Slide, ModalOverlay, Modal } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { store } from '../app/store';
import { pathToRegexp } from 'path-to-regexp';

const SubHeader = ({ name, backgroundColor }) => {
  const location = useLocation()
  const currentPath = location.pathname
  const listingPaths = ['/listings/', '/listings', '/listings/categories/:categorySlug', '/listings/categories/:categorySlug/']
  // Check if the current path matches any of the specific paths
  const isMatchingPath = listingPaths.some(path => {
    const keys = [];
    const pattern = pathToRegexp(path, keys);
    const match = pattern.exec(currentPath);
    return !!match;
  });

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const bgColor = backgroundColor ? backgroundColor : 'rgb(220, 53, 69)'
  const categoryButtonStyles = {
    w: '100%',
    size: 'lg',
    h: '60px',
    mb: 5,
    bgColor: 'rgb(108, 117, 125)',
    color: 'white',
    borderRadius: 12,
    _hover: { bg: 'rgb(108, 117, 125)' }
  }

  const categories = store.getState().listings.categories

  return (
    <>
      <Box display={{ sm: 'block', md: 'flex' }} bgColor={bgColor} alignItems='center' p={{ base: '30px 30px 30px 30px', md: '58px 100px 50px 100px' }}>
        <Heading size='2xl' color='white'>{name}</Heading>
        {(isMatchingPath) && (
          <Button mt={{ base: 5 }} colorScheme='blue' ml='auto' onClick={() => setIsSideMenuOpen(true)}>Categories</Button>
        )}
      </Box>
      {(isMatchingPath) && (
        <Slide onClick={() => setIsSideMenuOpen(false)} direction='left' in={isSideMenuOpen} unmountOnExit={true} p='400px' style={{ "zIndex": 9999 }}>
          {isSideMenuOpen && (
            <Modal isOpen={true}>
              <ModalOverlay />
            </Modal>
          )}
          <Card width='400px' maxW='100%' height='100%' p='1' onClick={(e) => e.stopPropagation()}>
            <CloseButton size='lg' ml='auto' mt='2' onClick={() => setIsSideMenuOpen(false)} />
            <Heading color='gray' mt={6} ml={3}>Categories</Heading>
            <Box p={7} pt={6}>
              <Button {...categoryButtonStyles}><Link to='/listings'>All</Link></Button>
              {categories.map((category, i) => (
                <Button {...categoryButtonStyles} key={i}><Link to={`/listings/categories/${category.slug}`}>{category.name}</Link></Button>
              ))}
              <Button {...categoryButtonStyles}><Link to='/listings/categories/other'>Other</Link></Button>
            </Box>

          </Card>
        </Slide>
      )}
    </>
  )
}

export default SubHeader