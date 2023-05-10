import { Box, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { SubHeader } from '../components'

const ListingBids = () => {
    const tableElements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <>
            <SubHeader name='My Listing Bids' backgroundColor='rgb(13, 110, 253)' />
            <Box p={{ base: '50px 30px 50px 30px', md: '50px 80px 50px 80px' }}>
                <Heading size='md' textAlign='center' mb={6}>Brand New royal Enfield 250 CC For special Sale</Heading>
                <Box maxW='100%' overflowX='scroll'>
                    <Table variant='simple' size={{ base: 'sm', md: 'md' }}>
                        <Thead>
                            <Tr>
                                <Th>S/N</Th>
                                <Th>Full name</Th>
                                <Th>Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tableElements.map((el) => (
                                <Tr>
                                    <Td>1</Td>
                                    <Td>Kenechi Ifeanyi</Td>
                                    <Td>$1000</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default ListingBids