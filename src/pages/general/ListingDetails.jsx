import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { Box, Button, Card, CardBody, Flex, Grid, GridItem, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useBreakpointValue } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import kay from '../../assets/kay.png'
import { useDispatch, useSelector } from 'react-redux'
import { getListing, getListingBids, placeBid, updateListing } from '../../features/listings/listingsSlice'
import toast from '../toasts'
import { store } from '../../app/store'
import { handleAuctioneerImageError, handleListingImageError, parseInteger } from '../../features/utils'
import NotFound from './NotFound'

const ListingDetails = () => {
    const [closed, setClosed] = useState(false)
    const [closeLoading, setCloseLoading] = useState(false)
    const [createBidLoading, setCreateBidLoading] = useState(false)
    const [notFoundError, setNotFoundError] = useState(false)

    const [bidData, setBidData] = useState({ amount: "" })
    const [highestBid, setHighestBid] = useState(null)

    const generalItemsDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 3, lg: 3 })
    const bidsRelatedItemsDisplayCols = useBreakpointValue({ base: 1, md: 3 })
    const relatedItemsDisplayCols = useBreakpointValue({ base: 1, md: 2, lg: 3 })
    const buttonDisplayCols = useBreakpointValue({ base: 1, sm: 2 })

    const { listingSlug } = useParams();
    const currentUser = store.getState().auth?.user
    const currentUserId = currentUser?.id
    const accessToken = currentUser?.access

    const { listing, bids, isLoading, message, statusCode } = useSelector((state) => state.listings)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (statusCode === 404) {
            setNotFoundError(true)
        } else {
            setNotFoundError(false)
        }

        dispatch(getListing(listingSlug)).then((e) => {
            if (e?.payload?.status === 'success'){
                dispatch(getListingBids(listingSlug))
            }
        })
    }, [dispatch, listingSlug, message, statusCode])

    if (isLoading || closeLoading) return <Spinner />;

    const handleClose = (event) => {
        event.preventDefault();
        setCloseLoading(true)

        var listingData = { slug: listingSlug, active: false }
        dispatch(updateListing(listingData)).then((e) => {
            if (e?.payload?.status === 'success') {
                setClosed(true)
                setCloseLoading(false)
            }
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (accessToken) {
            setCreateBidLoading(true)
            var biddingData = bidData
            biddingData.slug = listingSlug
            dispatch(placeBid(biddingData)).then((e) => {
                setCreateBidLoading(false)
                if (e?.payload?.status === 'success') {
                    setHighestBid(parseInteger(parseFloat(bidData.amount)))
                    setBidData({ amount: "" })
                    dispatch(getListingBids(listingSlug))
                    toast.success(e.payload.message)
                } else {
                    toast.error(e.payload)
                }
            })
        } else {
            navigate('/login')
            toast.warning('Login first!')
        }
    }

    const loadingButtonAttrs = {
        isLoading: true,
        loadingText: 'Placing',
        spinnerPlacement: 'start',
    }

    if (notFoundError) return <NotFound />;

    return (
        <>
            <SubHeader name='Product Details' />
            <Box minHeight='28.7vh' p={{ base: "35px", md: "70px" }}>
                <Card>
                    <Grid templateColumns={[`repeat(${generalItemsDisplayCols}, 1fr)`]}>
                        <GridItem colSpan={1} maxW='100%' padding={5} borderRight={{ md: '2px solid gainsboro' }} borderBottom={{ base: '2px solid gainsboro', md: "none" }}>
                            <Image maxH='60%' w='100%' objectFit='cover' alt='auction-img' src={listing?.listing?.image} onError={handleListingImageError} />
                        </GridItem>

                        <GridItem colSpan={2} padding={6} maxW='100%'>
                            <Heading fontSize='1.5em'>{listing?.listing?.name}</Heading>
                            <Text mt={2}>{listing?.listing?.desc}</Text>
                            <Heading fontSize={20} mt={4} display='flex'>Bidding Price: <Text ml={2} color='rgb(220, 53, 69)' fontSize={20}> ${parseInteger(listing?.listing?.price)}</Text></Heading>
                            <Heading fontSize={20} mb={4} display='flex'>Highest Bid: <Text ml={2} color='rgb(220, 53, 69)' fontSize={20}> ${highestBid || parseInteger(listing?.listing?.highest_bid)}</Text></Heading>
                            <Card bgColor='rgb(248, 249, 250)'>
                                <CardBody>
                                    <Text fontWeight='bold' mb={4}>Place your bid now</Text>
                                    <Text mb={3}>Bid Amount:</Text>
                                    <form method='POST' onSubmit={submitHandler}>
                                        <NumberInput mb={4} isDisabled={(currentUserId === listing?.listing?.auctioneer?.id || !listing?.listing?.active || closed) ? true : false} value={bidData?.amount}>
                                            <NumberInputField name='amount' placeholder='$0.00' required onChange={(e) => setBidData({ amount: e.target.value })} />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Grid templateColumns={[`repeat(${buttonDisplayCols}, 1fr)`]}>
                                            {(!listing?.listing?.active || closed) ? (
                                                <GridItem mb={{ base: 4, sm: 0 }}>
                                                    <Button type='click' color='white' bgColor='rgb(220, 53, 69)' _hover={{ bg: 'red.600' }} isDisabled>Closed!!!</Button>
                                                </GridItem>
                                            ) : (
                                                <>
                                                    <GridItem mb={{ base: 4, sm: 0 }}>
                                                        <Button {...(createBidLoading && { ...loadingButtonAttrs })} type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} isDisabled={currentUserId === listing?.listing?.auctioneer?.id ? true : false}>Place bid</Button>
                                                    </GridItem>
                                                    {currentUserId === listing?.listing?.auctioneer?.id && (
                                                        <GridItem ml={{ sm: 'auto' }}>
                                                            <Button onClick={handleClose} type='click' color='white' bgColor='rgb(220, 53, 69)' _hover={{ bg: 'red.600' }}>Close Auction</Button>
                                                        </GridItem>
                                                    )}
                                                </>
                                            )}

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
                        {bids?.bids?.length > 0 ? (
                            bids?.bids?.map((bid, i) => (
                                <Card mb={5} key={i}>
                                    <CardBody>
                                        <Flex alignItems='center'>
                                            <Image src={bid.user.avatar || kay} onError={handleAuctioneerImageError} alt='photo' borderRadius='full' boxSize='35px' objectFit='cover' />
                                            <Box>
                                                <Text fontSize='lg' fontWeight='bold' ml={6}>{bid.user.name}</Text>
                                                <Text fontSize='lg' fontWeight='bold' ml={6}>Bid Price: ${parseInteger(bid.amount)}</Text>
                                            </Box>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <Text fontSize='md' fontWeight='bold' color='blue'>No bids for this listing yet.</Text>
                        )}
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Heading mb={4}>Related Items</Heading>
                        <Grid templateColumns={[`repeat(${relatedItemsDisplayCols}, 1fr)`]} gap={6}>
                            {listing?.related_listings?.length > 0 ? (
                                listing?.related_listings?.map((listing, i) => (
                                    <GridItem key={i}>
                                        <Card borderRadius={15}>
                                            <CardBody>
                                                <Image height={140} width='100%' objectFit='cover' role='button' borderRadius={15} _hover={{ transform: 'scale(1.05)' }} alt='auc-img' src={listing.image} onError={handleListingImageError} mb={3} onClick={() => navigate(`/listings/${listing.slug}/`)} />
                                                <Link to={`/listings/${listing.slug}/`} style={{ fontSize: '17px' }}>{listing.name}</Link>
                                                <Text color='rgb(220, 53, 69)' fontSize='2xl'>${listing.price}</Text>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                ))
                            ) : (
                                <Text fontSize='md' fontWeight='bold' color='blue'>No related listings yet.</Text>
                            )}
                        </Grid>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default ListingDetails