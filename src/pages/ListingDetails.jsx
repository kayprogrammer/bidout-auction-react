import React from 'react'
import { SubHeader } from '../components'
import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useBreakpointValue } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import kay from '../assets/kay.png'

const ListingDetails = () => {
    const latestBidsElements = [1, 2, 3]
    const generalItemsDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3 })
    const bidsRelatedItemsDisplayCols = useBreakpointValue({ base: 1, md: 3 })
    const relatedItemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })
    const buttonDisplayCols = useBreakpointValue({ base: 1, sm: 2 })

    const navigate = useNavigate();
    return (
        <>
            <SubHeader name='Product Details' />
            <Box minHeight='28.7vh' p={{ base: "35px", md: "70px" }}>
                <Card>
                    <Grid templateColumns={[`repeat(${generalItemsDisplayCols}, 1fr)`]}>
                        <GridItem colSpan={1} maxW='100%' padding={5} borderRight={{ md: '2px solid gainsboro' }} borderBottom={{ base: '2px solid gainsboro', md: "none" }}>
                            <Image alt='auction-img' src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                        </GridItem>

                        <GridItem colSpan={2} padding={6} maxW='100%'>
                            <Heading fontSize='1.5em'>Brand New royal Enfield 250 CC For special Sale</Heading>
                            <Text mt={2}>Korem ipsum dolor amet, consectetur adipiscing elit. Maece nas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla.</Text>
                            <Text fontSize={20} mt={4} display='flex'>Bidding Price: <Text ml={2} color='rgb(220, 53, 69)' fontSize={20}> $450</Text></Text>
                            <Text fontSize={20} mb={4} display='flex'>Highest Bid: <Text ml={2} color='rgb(220, 53, 69)' fontSize={20}> $1450</Text></Text>
                            <Card bgColor='rgb(248, 249, 250)'>
                                <CardBody>
                                    <Text fontWeight='bold' mb={4}>Place your bid now</Text>
                                    <Text mb={3}>Bid Amount:</Text>
                                    <form method='POST'>
                                        <NumberInput mb={4}>
                                            <NumberInputField name='price' placeholder='$0.00' required />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Grid templateColumns={[`repeat(${buttonDisplayCols}, 1fr)`]}>
                                            <GridItem mb={{ base: 4, sm: 0 }}>
                                                <Button type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>Place bid</Button>
                                            </GridItem>
                                            <GridItem ml={{ sm: 'auto' }}>
                                                <Button type='click' color='white' bgColor='rgb(220, 53, 69)' _hover={{ bg: 'red.600' }}>Close Auction</Button>
                                            </GridItem>
                                        </Grid>
                                    </form>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </Grid>
                </Card>
                <Grid mt={10} templateColumns={[`repeat(${bidsRelatedItemsDisplayCols}, 1fr)`]} gap={6}>
                    <GridItem >
                        <Heading mb={4}>Latest Bids</Heading>
                        {latestBidsElements.map((el) => (
                            <Card mb={5}>
                                <CardBody>
                                    <Flex alignItems='center'>
                                        <Image src={kay} alt='photo' borderRadius='full' boxSize='35px' objectFit='cover' />
                                        <Box>
                                            <Text fontSize='lg' fontWeight='bold' ml={6}>Taiwo Jolomi</Text>
                                            <Text fontSize='lg' fontWeight='bold' ml={6}>Bid Price: $50</Text>
                                        </Box>
                                    </Flex>
                                </CardBody>
                            </Card>
                        ))}
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Heading mb={4}>Related Items</Heading>
                        <Grid templateColumns={[`repeat(${relatedItemsDisplayCols}, 1fr)`]} gap={6}>
                            {latestBidsElements.map((el) => (
                                <GridItem>
                                    <Card borderRadius={15}>
                                        <CardBody>
                                            <Image role='button' borderRadius={15} _hover={{ transform: 'scale(1.05)' }} alt='auc-img' src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' mb={3} onClick={() => navigate('/listings/id/')} />
                                            <Link to="/listings/id" style={{ fontSize: '17px' }}>Brand New royal Enfield 250 CC For special Sale</Link>
                                            <Text color='rgb(220, 53, 69)' fontSize='2xl'>$6000</Text>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            ))}
                        </Grid>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default ListingDetails