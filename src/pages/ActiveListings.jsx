import React from 'react'
import {
    Grid,
    useBreakpointValue,
} from '@chakra-ui/react';

import { CardListing, SubHeader } from '../components'

const ActiveListings = () => {
    const itemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })
    const itemElements = [1, 2, 3, 4, 5, 6, 7]

    return (
        <>
            <SubHeader name='Active Listings' />
            <Grid mt={12} templateColumns={[`repeat(${itemsDisplayCols}, 1fr)`]} gap={8} alignItems='center' minHeight='28.7vh' p={{ base: "0px 30px 50px 30px", md: "0px 50px 50px 50px" }}>
                {itemElements.map((el) => (
                    <CardListing />
                ))}
            </Grid>
        </>
    )
}

export default ActiveListings