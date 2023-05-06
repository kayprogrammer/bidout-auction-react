import { Box, Button, Card, CloseButton, Heading, Slide, ModalOverlay, Modal } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SubHeader = ({ name }) => {
  const current_path = window.location.pathname
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

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

  const categoryElements = [1, 2, 3, 4, 5]
  return (
    <>
      <Box display={{ sm: 'block', md: 'flex' }} bgColor='rgb(220, 53, 69)' alignItems='center' p={{ base: '30px 30px 30px 30px', md: '58px 100px 50px 100px' }}>
        <Heading size='2xl' color='white'>{name}</Heading>
        {(current_path === '/listings' || current_path === '/listings/') && (
          <Button mt={{ base: 5 }} colorScheme='blue' ml='auto' onClick={() => setIsSideMenuOpen(true)}>Categories</Button>
        )}
      </Box>
      {(current_path === '/listings' || current_path === '/listings/') && (
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
              <Button {...categoryButtonStyles}><Link>All</Link></Button>
              {categoryElements.map((el) => (
                <Button {...categoryButtonStyles}><Link>Category {el}</Link></Button>
              ))}
              <Button {...categoryButtonStyles}><Link>Other</Link></Button>
            </Box>

          </Card>
        </Slide>
      )}
    </>
  )
}

export default SubHeader