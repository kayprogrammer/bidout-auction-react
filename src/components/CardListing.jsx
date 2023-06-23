import React, { useEffect, useState } from 'react'
import {
  Heading,
  Text,
  Box,
  Button,
  Image,
  CardBody,
  Stack,
  Card,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import kay from '../assets/kay.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addListingToWatchlist, placeBid, removeFromWatchlist } from '../features/listings/listingsSlice';
import { store } from '../app/store';
import { handleAuctioneerImageError, handleListingImageError, parseInteger } from '../features/utils';
import toast from '../pages/toasts'
import { updateGuestUser } from '../features/auth/authSlice';

const CardListing = ({ listing }) => {
  const navigate = useNavigate();
  const currentUser = store.getState().auth?.user
  const currentUserId = currentUser?.id
  const currentUserAccess = currentUser?.access

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [bidData, setBidData] = useState({ amount: "" })
  const [createBidLoading, setCreateBidLoading] = useState(false)
  const [highestBid, setHighestBid] = useState(null)

  const buttonStyles = {
    bgColor: 'rgb(220, 53, 69)',
    color: 'white',
    _hover: { bg: 'red.600' }
  }

  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (listing.watchlist) {
      setHeartColour('red')
    } else {
      setHeartColour('grey')
    }

    const serverDateUTC = new Date(listing.closing_date);
    const serverDateLocal = new Date(
      serverDateUTC.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    );

    const interval = setInterval(() => {
      const currentDate = new Date();
      var timeDifference = serverDateLocal.getTime() - currentDate.getTime();
      if (!listing.active) {
        timeDifference = 0
      }
      if (timeDifference <= 0) {
        clearInterval(interval);
        setCountdown('Closed!!!');
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ).toString().padStart(2, '0');
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        ).toString().padStart(2, '0');
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

        setCountdown(
          `-${days}D :${hours}H :${minutes}M :${seconds}S`
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, [listing]);

  const [heartColour, setHeartColour] = useState('grey')
  const dispatch = useDispatch();

  const handleWatchlist = (event) => {
    event.preventDefault();
    dispatch(addListingToWatchlist({ "slug": listing.slug })).then((e) => {
      if (e?.payload?.status === 'success') {
        if (window.location.pathname === '/watchlist' || window.location.pathname === '/watchlist/') {
          const listings = store.getState().listings.listings
          dispatch(removeFromWatchlist({ "listings": listings, "slug": listing.slug }))
        } else {
          if ((e.payload.message).includes('added')) {
            const guestUserId = e?.payload?.data?.guestuser_id
            if (guestUserId){
              dispatch(updateGuestUser({"id": guestUserId}))
            }
            setHeartColour('red')
          } else {
            setHeartColour('grey')
          }
        }
      }
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    setCreateBidLoading(true)
    var biddingData = bidData
    biddingData.slug = listing.slug
    dispatch(placeBid(biddingData)).then((e) => {
        setCreateBidLoading(false)
        if (e?.payload?.status === 'success') {
            setHighestBid(parseInteger(parseFloat(bidData.amount)))
            setBidData({ ...bidData, amount: "" })
            toast.success(e.payload.message)
            onClose()
        } else {
            toast.error(e.payload)
        }
    })
  }

  const loadingButtonAttrs = {
      isLoading: true,
      loadingText: 'Submitting',
      spinnerPlacement: 'start',
  }

  return (
    <>
      <Card width='100%'>
        <CardBody>
          <Box role='button' className='card-img' _hover={{ transform: 'scale(1.05)' }} transitionProperty='all' onClick={() => navigate(`/listings/${listing.slug}/`)}>
            <Image
              w='90%'
              h='16em'
              mx='auto'
              objectFit='cover'
              src={listing.image}
              onError={handleListingImageError}
              borderRadius={15}
            />
            <Text
              style={{ transform: 'translateY(-50%)', width: '67%', position: 'relative' }}
              display='table'
              m='0 auto'
              color='rgb(220, 53, 69)'
              fontWeight='bold'
              bgColor='white'
              mx='auto'
              p={3}
              textAlign='center'
              borderTopRadius={15}
            >{countdown}
            </Text>
          </Box>
          <Stack mt='6' spacing='3'>
            <Heading fontSize={23} mb={2}>{listing.name}</Heading>
            <Flex>
              <Image src={listing.auctioneer.avatar || kay} onError={handleAuctioneerImageError} alt='avatar' borderRadius='full' boxSize='35px' objectFit='cover' mr={4} />
              <Text>By {listing.auctioneer.name}</Text>
              <Text ml='auto' color='rgb(220, 53, 69)' fontSize='2xl'>${parseInteger(listing.price)}</Text>
            </Flex>
            <Flex>
              <Button onClick={currentUserAccess ? onOpen : () => navigate('/login')} {...buttonStyles} isDisabled={(currentUserId === listing.auctioneer.id || !listing.active) ? true : false}>Place a Bid</Button>
              <FontAwesomeIcon icon={faHeart} style={{ marginLeft: 'auto', color: heartColour }} size='2x' role='button' onClick={handleWatchlist} />
            </Flex>

          </Stack>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form method='POST' onSubmit={submitHandler}>
            <ModalHeader>Highest Bid: {highestBid || parseInteger(listing.highest_bid)}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <NumberInput mb={4} value={bidData?.amount}>
                <NumberInputField name='amount' placeholder='$0.00' required onChange={(e) => setBidData({ amount: e.target.value })} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button {...(createBidLoading && { ...loadingButtonAttrs })} type='submit' colorScheme='blue'>Submit</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CardListing