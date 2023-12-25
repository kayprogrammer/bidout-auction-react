import { Box, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Spinner, SubHeader } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAuctioneerListings, updateListing } from '../../features/listings/listingsSlice'
import toast from '../toasts'
import { parseInteger } from '../../features/utils'

const AllUserListings = () => {
    const navigate = useNavigate();
    const { listings, isLoading } = useSelector((state) => state.listings)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuctioneerListings());
    }, [dispatch])

    const handleListingImageError = (event) => {
        event.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'; // Replace with your fallback image link
    };

    const handleUpdateStatus = (event, listingSlug, timeLeftSeconds) => {
        const status = event.target.textContent
        var listingData = { slug: listingSlug, active: true }

        if (status === 'Active') {
            listingData['active'] = false
        }

        if (status === 'Closed' && timeLeftSeconds < 1) {
            toast.warning('Expired Listing')
        } else {
            dispatch(updateListing(listingData)).then((e) => {
                if (e?.payload?.status === 'success') {
                    if (status === 'Active') {
                        event.target.textContent = 'Closed'
                        event.target.style.color = 'red'
                    } else {
                        event.target.textContent = 'Active'
                        event.target.style.color = 'blue'
                    }
                } else {
                    toast.error(e?.payload?.message)
                }
            })
        }
    }

    if (isLoading) return <Spinner />;

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
                            {listings?.length > 0 ?
                                listings.map((listing, i) => (
                                    <Tr key={i}>
                                        <Td><Link style={{color:"blue"}} to={`/listings/${listing.slug}`}>{i + 1}</Link></Td>
                                        <Td><Link style={{color:"blue"}} to={`/listings/${listing.slug}`}>{listing.name}</Link></Td>
                                        <Td maxW='100%' w='15%'><Image src={listing.image} onError={handleListingImageError} /></Td>
                                        <Td>${parseInteger(listing.price)}</Td>
                                        <Td onClick={(event) => handleUpdateStatus(event, listing.slug, listing.time_left_seconds)} role='button' color={listing.active ? 'blue' : 'red'}>{listing.active ? 'Active' : 'Closed'}</Td>
                                        <Td color='blue'><Link to={`/dashboard/listings/${listing.slug}/bids`}>{listing.bids_count}</Link></Td>
                                        <Td role='button' onClick={() => navigate(`/dashboard/listings/${listing.slug}/update`)}><FontAwesomeIcon icon={faEdit} /></Td>
                                    </Tr>
                                ))
                            : (
                                <Td colSpan={7}>
                                    <Text fontWeight='bold' fontSize='sm' color='blue' mt={4} textAlign='center'>You don't have any listings yet!</Text>
                                </Td>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default AllUserListings