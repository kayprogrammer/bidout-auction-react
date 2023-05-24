import React, { useEffect, useState } from 'react'
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

const CardListing = ({listing}) => {
  const navigate = useNavigate();
  const buttonStyles = {
    bgColor: 'rgb(220, 53, 69)',
    color: 'white',
    _hover: { bg: 'red.600' }
  }

  const handleListingImageError = (event) => {
    event.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'; // Replace with your fallback image link
  };

  const handleAcutioneerImageError = (event) => {
    event.target.src = kay; // Replace with your fallback image link
  };

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const serverDateUTC = new Date(listing.closing_date);
    const serverDateLocal = new Date(
      serverDateUTC.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    );

    const interval = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = serverDateLocal.getTime() - currentDate.getTime();

      if (timeDifference <= 0) {
        clearInterval(interval);
        setCountdown('Closed!!!');
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ).toString().padStart(2, '0');
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        ).toString().padStart(2, '0');
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

        setCountdown(
          `-${days}D :${hours}H :${minutes}M :${seconds}S`
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [listing]);

  return (
    <Card width='100%'>
      <CardBody>
        <Box role='button' className='card-img' _hover={{ transform: 'scale(1.05)' }} transitionProperty='all' onClick={() => navigate('/listings/id/')}>
          <Image
            w='90%'
            h='16em'
            mx='auto'
            objectFit='cover'
            src={listing.image}
            onError={handleListingImageError}
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
          >{countdown}
          </Text>
        </Box>
        <Stack mt='6' spacing='3'>
          <Heading fontSize={23} mb={2}>{listing.name}</Heading>
          <Flex>
            <Image src={listing.auctioneer.avatar || kay} onError={handleAcutioneerImageError} alt='avatar' borderRadius='full' boxSize='35px' objectFit='cover' mr={4} />
            <Text>By {listing.auctioneer.name}</Text>
            <Text ml='auto' color='rgb(220, 53, 69)' fontSize='2xl'>${listing.price}</Text>
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