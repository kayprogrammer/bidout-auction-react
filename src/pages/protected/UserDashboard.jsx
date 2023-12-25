import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { Box, Button, Card, Grid, GridItem, Image, Input, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react'
import kay from '../../assets/kay.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAuctioneerListings, updateListing } from '../../features/listings/listingsSlice'
import toast from '../toasts'
import { uploadImage } from '../imageUploader'
import { getProfile, logout, updateProfile } from '../../features/auth/authSlice'
import { parseInteger } from '../../features/utils'

const UserDashboard = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        file: null,
        file_type: null,
        file_url: "",
    })
    const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)

    const [currentTab, setCurrentTab] = useState('dashboard')
    const tabDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 4, lg: 4 })
    const profileDisplayCols = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 2 })

    const navigate = useNavigate();
    const { listings, isLoading } = useSelector((state) => state.listings)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctioneerListings(10)).then((e) => {
            dispatch(getProfile()).then((e) => {
                const profile = e.payload.data
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    first_name: profile?.first_name,
                    last_name: profile?.last_name,
                    file_url: profile?.avatar || kay
                }));
            });
        })
    }, [dispatch])

    if (isLoading) return <Spinner />;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (e.target?.files) {
            var file = e.target.files[0]
            setUserData({ ...userData, [name]: file.type, file: file })
        } else {
            setUserData({ ...userData, [name]: value })
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        setProfileUpdateLoading(true)
        var file = userData.file
        delete userData['file']
        dispatch(updateProfile(userData)).then((e) => {
            if (e?.payload?.status === 'success') {
                const fileData = e.payload.data.file_upload_data
                if (file) {
                    uploadImage(file, fileData.public_id, fileData.signature, fileData.timestamp).then(() => {
                        setProfileUpdateLoading(false)
                        toast.success(e.payload.message)
                        setUserData({ ...userData, file_url: URL.createObjectURL(file), file_type: null })
                    })
                } else {
                    setProfileUpdateLoading(false)
                    toast.success(e.payload.message)
                }

            }
        })
    }

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/login')
        })
    }

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

    const loadingButtonAttrs = {
        isLoading: true,
        loadingText: 'Updating',
        spinnerPlacement: 'start',
    }

    return (
        <>
            <SubHeader name='Dashboard' backgroundColor='rgb(13, 110, 253)' />
            <Box p={{ base: '50px 30px 50px 30px', md: '50px 80px 50px 80px' }}>
                <Grid templateColumns={[`repeat(${tabDisplayCols}, 1fr)`]} gap={6}>
                    <GridItem maxW='100%'>
                        <Card role='button' bgColor='rgb(25, 135, 84)' p={3.5} borderRadius={0} mb={4} onClick={() => setCurrentTab('dashboard')}>
                            <Text>Dashboard</Text>
                        </Card>
                        <Card role='button' p={3.5} borderRadius={0} mb={4} onClick={() => setCurrentTab('profile')}>
                            <Text>My Profile</Text>
                        </Card>
                        <Card role='button' bgColor='rgb(220, 53, 69)' p={3.5} borderRadius={0} onClick={handleLogout}>
                            <Text color='white'>Logout</Text>
                        </Card>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 3 }} maxW='100%' overflowX='scroll'>
                        {(currentTab === 'dashboard') ? (
                            <>
                                <Table variant='simple' size={{ base: 'sm', md: 'md' }}>
                                    <Thead>
                                        <Tr>
                                            <Th>S/N</Th>
                                            <Th>Product</Th>
                                            <Th isNumeric>Price</Th>
                                            <Th>Status</Th>
                                            <Th isNumeric>Bids</Th>
                                            <Th>Update</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listings.map((listing, i) => (
                                            <Tr key={i}>
                                                <Td><Link style={{color:"blue"}} to={`/listings/${listing.slug}`}>{i + 1}</Link></Td>
                                                <Td><Link style={{color:"blue"}} to={`/listings/${listing.slug}`}>{listing.name}</Link></Td>
                                                <Td>${parseInteger(listing.price)}</Td>
                                                <Td onClick={(event) => handleUpdateStatus(event, listing.slug, listing.time_left_seconds)} role='button' color={listing.active ? 'blue' : 'red'}>{listing.active ? 'Active' : 'Closed'}</Td>
                                                <Td color='blue'><Link to={`/dashboard/listings/${listing.slug}/bids`}>{listing.bids_count}</Link></Td>
                                                <Td role='button' onClick={() => navigate(`/dashboard/listings/${listing.slug}/update`)}><FontAwesomeIcon icon={faEdit} /></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                {listings?.length > 0 ? (
                                    <Text fontWeight='bold' fontSize='sm' color='blue' role='button' mt={4} textAlign='center' onClick={() => navigate('/dashboard/listings')}>All listings!</Text>
                                ) : (
                                    <Text fontWeight='bold' fontSize='sm' color='blue' mt={4} textAlign='center'>You don't have any listings yet!</Text>
                                )}
                            </>
                        ) : (
                            <form method='POST' onSubmit={submitHandler}>
                                <Grid templateColumns={[`repeat(${profileDisplayCols}, 1fr)`]} gap={6}>
                                    <GridItem>
                                        <Text fontSize={{ base: '17px', md: '21px' }}>Avatar</Text>
                                        <Image src={userData?.file_url} w='100%' maxH='300px' objectFit='cover' objectPosition='top' mb={4} />
                                        <Input type='file' p={1.5} name='file_type' mb={3} onChange={handleChange} />
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize={{ base: '17px', md: '21px' }}>First Name</Text>
                                        <Input type='text' name='first_name' required mb={4} onChange={handleChange} value={userData.first_name} />
                                        <Text fontSize={{ base: '17px', md: '21px' }}>Last Name</Text>
                                        <Input type='text' name='last_name' required onChange={handleChange} value={userData.last_name} />
                                    </GridItem>
                                </Grid>
                                <Box mt='3.5em' mb='3.5em' textAlign='center'>
                                    <Button {...(profileUpdateLoading && { ...loadingButtonAttrs })} size='lg' type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>Update Profile</Button>
                                </Box>
                            </form>
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default UserDashboard