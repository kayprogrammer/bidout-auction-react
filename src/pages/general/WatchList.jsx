import React, { useEffect } from 'react'
import {
    Grid,
    GridItem,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { CardListing, Spinner, SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlistListings } from '../../features/listings/listingsSlice';
import toast from '../toasts';

const WatchList = () => {
    const itemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })

    const { listings, isLoading, isError, message } = useSelector((state) => state.listings);
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getWatchlistListings())

    }, [dispatch, isError, message])

    if (isLoading) return <Spinner />;

    return (
        <>
            <SubHeader name='My WatchList' />
            <Grid mt={12} templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={8} alignItems='center' minHeight='28.7vh' p={{ base: "0px 30px 50px 30px", md: "0px 50px 50px 50px" }}>
                {listings.length > 0 ? (
                    listings.map((listing, i) => (
                        <CardListing listing={listing} key={i} />
                    ))
                ) : (
                    <GridItem textAlign='center' colSpan={3}>
                        <Text fontSize='xl' fontWeight='bold' color='blue'>You have no listings in your watchlist.</Text>
                    </GridItem>
                )}

            </Grid>
        </>
    )
}

export default WatchList