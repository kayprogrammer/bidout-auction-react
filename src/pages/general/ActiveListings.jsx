import React, { useEffect, useState } from 'react'
import {
    Grid,
    GridItem,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { CardListing, Spinner, SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getListings, getListingsByCategory } from '../../features/listings/listingsSlice';
import toast from '../toasts';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const ActiveListings = () => {
    const itemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })
    const [notFoundError, setNotFoundError] = useState(false)

    const { listings, isLoading, isError, message } = useSelector((state) => state.listings);
    const dispatch = useDispatch()

    const { categorySlug } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (categorySlug) {
            dispatch(getListingsByCategory(categorySlug)).then((e) => {
                if (e?.payload?.status === 404) {
                    setNotFoundError(true)
                } else {
                    setNotFoundError(false)
                }
            })
        } else {
            setNotFoundError(false)
            dispatch(getListings())
        }
        dispatch(getCategories())

    }, [dispatch, isError, message, categorySlug])

    if (isLoading) return <Spinner />;

    if (notFoundError) return <NotFound />;

    return (
        <>
            <SubHeader name='Active Listings' />
            <Grid mt={12} templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={8} alignItems='center' minHeight='28.7vh' p={{ base: "0px 30px 50px 30px", md: "0px 50px 50px 50px" }}>
                {(categorySlug && listings?.length < 1) ? (
                    <GridItem textAlign='center' colSpan={3}>
                        <Text fontSize='xl' fontWeight='bold' color='blue'>No listings in this category yet.</Text>
                    </GridItem>
                ) :
                    listings.map((listing, i) => (
                        <CardListing listing={listing} key={i} />
                    ))
                }
            </Grid>
        </>
    )
}

export default ActiveListings