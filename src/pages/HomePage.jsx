import React from 'react';
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
  Stack,
  Card,
  Flex,
} from '@chakra-ui/react';
import BoredApe from '../assets/boredape.jpg'
import kay from '../assets/kay.png'
import quoteImg from '../assets/quote-red.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const firstDisplayCols = useBreakpointValue({ base: 1, md: 1, lg: 2 })
  const itemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })

  const buttonStyles = {
    bgColor: 'rgb(220, 53, 69)',
    color: 'white',
    _hover: { bg: 'red.600' }
  }
  const itemElements = [1, 2, 3, 4, 5, 6]
  const reviewElements = [1, 2, 3]

  return (
    <Box padding={{ md: '70px', sm: '70px', base: "30px" }} minHeight='28.7vh'>
      <Grid templateColumns={[`repeat(${firstDisplayCols}, 1fr)`]} gap={6}>
        <GridItem>
          <Heading fontSize={15} color='rgb(220, 53, 69)' fontWeight='bold' mb={6}>Welcome to the Auction House</Heading>
          <Heading fontSize={58} mb={4}>Build, sell & collect digital items.</Heading>
          <Text mb={12} fontSize={13}>Nulla facilisi. Maecenas tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices dui et, aliquam urna. </Text>
          <Button size='lg' {...buttonStyles}>Start Exploring</Button>
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
          <Button width='150px' {...buttonStyles} float={{ lg: "right" }}>View All</Button>
        </GridItem>
      </Grid>
      <Grid mt={12} templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={8} alignItems='center'>
        {itemElements.map((el) => (
          <Card width='100%'>
            <CardBody>
              <Box role='button' className='card-img' _hover={{ transform: 'scale(1.05)' }} transitionProperty='all'>
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
        ))}


      </Grid>
      <Box mt='100px' textAlign='center' w='100%'>
        <Heading>What Clients Say</Heading>
        <Text display='table' m='0 auto' maxW={{ lg: '55%' }}>Explore on the world's best & largest Bidding marketplace with our beautiful Bidding products. We want to be a part of your smile, success and future growth.</Text>
      </Box>
      <Grid mt='60px' templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={5}>
        {reviewElements.map((el) => (
          <Card>
            <CardBody>
              <Flex mb={5}>
                <Image src={kay} alt='avatar' borderRadius='full' boxSize='60px' objectFit='cover' />
                <Image src={quoteImg} style={{ marginLeft: 'auto', color: 'grey' }} />
              </Flex>
              <Heading size='md' mb={3}>Johan Martin R</Heading>
              <Text>Maecenas vitae porttitor neque, ac porttitor nunc. Duis venenatis lacinia libero. Nam nec augue ut nunc vulputate tincidunt at suscipit nunc.</Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  )
}

export default HomePage