import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Heading,
  Text,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  useBreakpointValue
} from '@chakra-ui/react';
import BoredApe from '../assets/boredape.jpg'

const HomePage = () => {
  const firstDisplayCols = useBreakpointValue({ base: 1, md: 1, lg: 2 })
  const isLargeScreen = useBreakpointValue({ base: false, lg: true })
  return (
    <Box padding='70px' minHeight='28.7vh'>
      <Grid templateColumns={[`repeat(${firstDisplayCols}, 1fr)`]} gap={6}>
        <GridItem>
          <Heading fontSize={15} color='rgb(220, 53, 69)' fontWeight='bold' mb={6}>Welcome to the Auction House</Heading>
          <Heading fontSize={58} mb={4}>Build, sell & collect digital items.</Heading>
          <Text mb={12} fontSize={13}>Nulla facilisi. Maecenas tellus ut ligula interdum convallis. Nullam dapibus on erat in dolor posuere, none hendrerit lectus ornare. Suspendisse sit amet turpina sagittis, ultrices dui et, aliquam urna. </Text>
          <Button size='lg' bgColor='rgb(220, 53, 69)' color='white' _hover={{ bg: 'red.600' }}>Start Exploring</Button>
        </GridItem>
        <GridItem>
          <Image ml={isLargeScreen ? 'auto' : 'none'} maxWidth='85%' src={BoredApe} alt='BoredApe' mb='3.5' />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default HomePage