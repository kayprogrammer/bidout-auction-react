import { Flex, Spinner as Spin } from '@chakra-ui/react'
import React from 'react'

const Spinner = () => {
  return (
    <Flex height='100vh' alignItems='center' justifyContent='center'>
      <Spin
        size='xl' 
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='rgb(220, 53, 69)'
        display='table'
        m='0 auto'
        verticalAlign='middle'
      />
    </Flex>
  )
}

export default Spinner