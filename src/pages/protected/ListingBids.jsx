import { Box, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveListingBids } from '../../features/listings/listingsSlice';
import { parseInteger } from '../../features/utils';
import NotFound from '../general/NotFound';

const ListingBids = () => {
    const { listingSlug } = useParams();
    const [notFoundError, setNotFoundError] = useState(false)


    const { listing, bids, isLoading } = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveListingBids(listingSlug)).then((e) => {
            if (e?.payload?.status === 404){
                setNotFoundError(true)
            } else {
                setNotFoundError(false)
            }
        })
    }, [dispatch, listingSlug])

    if (isLoading) return <Spinner />;

    if (notFoundError) return <NotFound />;

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
                            {bids?.length > 0 ?
                                bids?.map((bid, i) => (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        <Td>{bid.user.name}</Td>
                                        <Td>${parseInteger(bid.amount)}</Td>
                                    </Tr>
                                ))
                            : (
                                <Tr>
                                    <Td colSpan={3}>
                                        <Text fontWeight='bold' fontSize='md' color='blue' textAlign='center'>No bids for this listing yet!</Text>
                                    </Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default ListingBids