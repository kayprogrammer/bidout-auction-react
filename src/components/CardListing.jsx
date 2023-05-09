import React from 'react'
import {
  Heading,
  Text,
  Box,
  Button,
  Image,
  CardBody,
  Stack,
  Card,
  Flex,
} from '@chakra-ui/react';

import kay from '../assets/kay.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CardListing = () => {
  const navigate = useNavigate();
  const buttonStyles = {
    bgColor: 'rgb(220, 53, 69)',
    color: 'white',
    _hover: { bg: 'red.600' }
  }
  return (
    <Card width='100%'>
      <CardBody>
        <Box role='button' className='card-img' _hover={{ transform: 'scale(1.05)' }} transitionProperty='all' onClick={() => navigate('/listings/id/')}>
          <Image
            maxW='90%'
            mx='auto'
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius={15}
          />
          <Text
            style={{ transform: 'translateY(-50%)', width: '67%', position: 'relative' }}
            display='table'
            m='0 auto'
            color='rgb(220, 53, 69)'
            fontWeight='bold'
            bgColor='white'
            mx='auto'
            p={3}
            textAlign='center'
            borderTopRadius={15}
          >-124D :23H : 02M : 53S
          </Text>
        </Box>
        <Stack mt='6' spacing='3'>
          <Heading fontSize={23} mb={2}>Brand New royal Enfield 250 CC For special Sale</Heading>
          <Flex>
            <Image src={kay} alt='avatar' borderRadius='full' boxSize='35px' objectFit='cover' mr={4} />
            <Text>By Sara Alexa</Text>
            <Text ml='auto' color='rgb(220, 53, 69)' fontSize='2xl'>$450</Text>
          </Flex>
          <Flex>
            <Button {...buttonStyles}>Place a Bid</Button>
            <FontAwesomeIcon icon={faHeart} style={{ marginLeft: 'auto', color: 'grey' }} size='2x' role='button' />
          </Flex>

        </Stack>
      </CardBody>
    </Card>
  )
}

export default CardListing