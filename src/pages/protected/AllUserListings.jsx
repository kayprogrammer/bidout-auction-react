import { Box, Image, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { SubHeader } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const AllUserListings = () => {
    const tableElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const navigate = useNavigate();

    return (
        <>
            <SubHeader name='My Listings' backgroundColor='rgb(13, 110, 253)' />
            <Box p={{ base: '50px 30px 50px 30px', md: '50px 80px 50px 80px' }}>
                <Box maxW='100%' overflowX='scroll'>
                    <Table variant='simple' size={{ base: 'sm', md: 'md' }}>
                        <Thead>
                            <Tr>
                                <Th>S/N</Th>
                                <Th>Product</Th>
                                <Th>Image</Th>
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
                                    <Td maxW='100%' w='15%'><Image src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' /></Td>
                                    <Td>$1000</Td>
                                    <Td>Active</Td>
                                    <Td><Link to='/dashboard/listings/1/bids'>1</Link></Td>
                                    <Td role='button' onClick={() => navigate(`/dashboard/listings/${el}/update`)}><FontAwesomeIcon icon={faEdit} /></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default AllUserListings