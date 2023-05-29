import { Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Spinner, SubHeader } from '../../components'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveListingBids } from '../../features/listings/listingsSlice';
import toast from '../toasts';

const ListingBids = () => {
    const { listingSlug } = useParams();

    const { listing, bids, isLoading, message, isError } = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(retrieveListingBids(listingSlug))
    }, [isError, message, dispatch, listingSlug])

    if (isLoading) return <Spinner />;

    return (
        <>
            <SubHeader name='My Listing Bids' backgroundColor='rgb(13, 110, 253)' />
            <Box p={{ base: '50px 30px 50px 30px', md: '50px 80px 50px 80px' }}>
                <Heading size='md' textAlign='center' mb={6}>{listing.name}</Heading>
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
                            {bids.map((bid, i) => (
                                <Tr key={i}>
                                    <Td>{i + 1}</Td>
                                    <Td>{bid.user.name}</Td>
                                    <Td>${bid.amount}</Td>
                                </Tr>
                            ))}
                            <Tr>
                                <Td colSpan={3}>
                                    <Text fontWeight='bold' fontSize='md' color='blue' textAlign='center'>No bids for this listing yet!</Text>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default ListingBids