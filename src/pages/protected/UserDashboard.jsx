import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { Box, Button, Card, Grid, GridItem, Image, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import kay from '../../assets/kay.png'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAuctioneerListings } from '../../features/listings/listingsSlice'
import toast from '../toasts'

const UserDashboard = () => {
    const [currentTab, setCurrentTab] = useState('dashboard')
    const tableElements = [1, 2, 3]
    const tabDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 4, lg: 4 })
    const profileDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 2 })

    const navigate = useNavigate();
    const { listings, isLoading } = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctioneerListings());
    }, [dispatch])

    if (isLoading) return <Spinner />;

    return (
        <>
            <SubHeader name='Dashboard' backgroundColor='rgb(13, 110, 253)' />
            <Box p={{ base: '50px 30px 50px 30px', md: '50px 80px 50px 80px' }}>
                <Grid templateColumns={[`repeat(${tabDisplayCols}, 1fr)`]} gap={6}>
                    <GridItem maxW='100%'>
                        <Card role='button' bgColor='rgb(25, 135, 84)' p={3.5} borderRadius={0} mb={4} onClick={() => setCurrentTab('dashboard')}>
                            <Text>Dashboard</Text>
                        </Card>
                        <Card role='button' p={3.5} borderRadius={0} mb={4} onClick={() => setCurrentTab('profile')}>
                            <Text>My Profile</Text>
                        </Card>
                        <Card role='button' bgColor='rgb(220, 53, 69)' p={3.5} borderRadius={0}>
                            <Text color='white'>Logout</Text>
                        </Card>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3 }} maxW='100%' overflowX='scroll'>
                        {(currentTab === 'dashboard') ? (
                            <>
                                <Table variant='simple' size={{ base: 'sm', md: 'md' }}>
                                    <Thead>
                                        <Tr>
                                            <Th>S/N</Th>
                                            <Th>Product</Th>
                                            <Th isNumeric>Price</Th>
                                            <Th>Status</Th>
                                            <Th isNumeric>Bids</Th>
                                            <Th>Update</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {tableElements.map((el) => (
                                            <Tr>
                                                <Td>1</Td>
                                                <Td>Brand New royal Enfield 250 CC For special Sale</Td>
                                                <Td>$1000</Td>
                                                <Td>Active</Td>
                                                <Td>1</Td>
                                                <Td role='button' onClick={() => navigate(`/dashboard/listings/${el}/update`)}><FontAwesomeIcon icon={faEdit}/></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Text fontWeight='bold' fontSize='sm' color='blue' role='button' mt={4} textAlign='center' onClick={() => navigate('/dashboard/listings')}>All listings!</Text>
                            </>
                        ) : (
                            <>
                                <Grid templateColumns={[`repeat(${profileDisplayCols}, 1fr)`]} gap={6}>
                                    <GridItem>
                                        <Text fontSize={{ base: '17px', md: '21px' }}>Avatar</Text>
                                        <Image src={kay} w='100%' maxH='300px' objectFit='cover' mb={4} />
                                        <Input type='file' p={1.5} name='image' required mb={3} />
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize={{ base: '17px', md: '21px' }}>First Name</Text>
                                        <Input type='text' name='first_name' required mb={4} />
                                        <Text fontSize={{ base: '17px', md: '21px' }}>Last Name</Text>
                                        <Input type='text' name='last_name' required />
                                    </GridItem>
                                </Grid>
                                <Button display='table' m='0 auto' mt='3.5em' mb='3.5em' size='lg' type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>Update Profile</Button>
                            </>
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default UserDashboard