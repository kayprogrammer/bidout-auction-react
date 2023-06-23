import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Heading,
  Text,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
  CardBody,
  Card,
  Flex,
} from '@chakra-ui/react';
import BoredApe from '../../assets/boredape.jpg'
import kay from '../../assets/kay.png'
import quoteImg from '../../assets/quote-red.svg'
import { Spinner, CardListing } from '../../components';
import { Link } from 'react-router-dom';
import toast from '../toasts';
import { getReviews } from '../../features/general/generalSlice';
import { getListings } from '../../features/listings/listingsSlice';

const Home = () => {
  const firstDisplayCols = useBreakpointValue({ base: 1, md: 1, lg: 2 })
  const itemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })

  const buttonStyles = {
    bgColor: 'rgb(220, 53, 69)',
    color: 'white',
    _hover: { bg: 'red.600' }
  }
  const boxStyles = {
    padding: { md: '70px', sm: '70px', base: "30px" },
    minHeight: '28.7vh'
  }
  const { reviews, listings, isLoading, isError, message } = useSelector((state) => ({
    ...state.general,
    ...state.listings
  }));
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getReviews())
    dispatch(getListings(6))

  }, [dispatch, isError, message])

  if (isLoading) return <Spinner />;

  return (
    <Box {...boxStyles}>
      <Grid templateColumns={[`repeat(${firstDisplayCols}, 1fr)`]} gap={6}>
        <GridItem>
          <Heading fontSize={15} color='rgb(220, 53, 69)' fontWeight='bold' mb={6}>Welcome to the Auction House</Heading>
          <Heading fontSize={58} mb={4}>Build, sell & collect digital items.</Heading>
          <Text mb={12} fontSize={13}>Nulla facilisi. Maecenas tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices dui et, aliquam urna. </Text>
          <Button size='lg' {...buttonStyles}><Link to='/listings'>Start Exploring</Link></Button>
        </GridItem>
        <GridItem>
          <Image ml={{ lg: 'auto' }} maxWidth='85%' src={BoredApe} alt='BoredApe' mb='3.5' />
        </GridItem>
      </Grid>
      <Grid mt={12} templateColumns={[`repeat(${firstDisplayCols}, 1fr)`]} gap={6} alignItems='center'>
        <GridItem>
          <Heading fontSize={50}>Live Auction</Heading>
          <Text fontSize={15}>Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.</Text>
        </GridItem>
        <GridItem>
          <Button width='150px' {...buttonStyles} float={{ lg: "right" }}><Link to='/listings'>View All</Link></Button>
        </GridItem>
      </Grid>
      <Grid mt={12} templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={8} alignItems='center'>
        {listings.map((listing, i) => (
          <CardListing listing={listing} key={i}/>
        ))}


      </Grid>
      <Box mt='100px' textAlign='center' w='100%'>
        <Heading>What Clients Say</Heading>
        <Text display='table' m='0 auto' maxW={{ lg: '55%' }}>Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.</Text>
      </Box>
      <Grid mt='60px' templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={5}>
        {reviews.map((review, i) => (
          <Card key={i}>
            <CardBody>
              <Flex mb={5}>
                <Image src={review.reviewer.avatar || kay} alt='avatar' borderRadius='full' boxSize='60px' objectFit='cover' />
                <Image src={quoteImg} style={{ marginLeft: 'auto', color: 'grey' }} />
              </Flex>
              <Heading size='md' mb={3}>{review.reviewer.name}</Heading>
              <Text>{review.text}</Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}

export default Home