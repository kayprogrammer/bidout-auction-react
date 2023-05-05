import { Box, Button, Card, Heading, Slide } from '@chakra-ui/react'
import React, { useState } from 'react'

const SubHeader = ({ name }) => {
  const current_path = window.location.pathname
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);

  return (
    <>
      <Box display={{ sm: 'block', md: 'flex' }} bgColor='rgb(220, 53, 69)' alignItems='center' p={{ base: '30px 30px 30px 30px', md: '58px 100px 50px 100px' }}>
        <Heading size='2xl' color='white'>{name}</Heading>
        {(current_path === '/listings' || current_path === '/listings/') && (
          <Button mt={{ base: 5 }} colorScheme='blue' ml='auto' onClick={() => setisSideMenuOpen(!isSideMenuOpen)}>Categories</Button>
        )}
      </Box>
      {(current_path === '/listings' || current_path === '/listings/') && (
        <Slide direction='left' in={isSideMenuOpen} unmountOnExit={true} p='400px' style={{ "zIndex": '10' }}>
          <Card width='25%' height='100%'>

          </Card>
        </Slide>
      )}
    </>
  )
}

export default SubHeader