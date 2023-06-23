import { Box, Button, Grid, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { createListing, getCategories, getListing, updateListing } from '../../features/listings/listingsSlice'
import toast from '../toasts'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadImage } from '../imageUploader'
import NotFound from '../general/NotFound'

const CreateListing = ({ type }) => {
  const displayCols = useBreakpointValue({ base: 1, md: 2 })
  const [createLoading, setCreateLoading] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [notFoundError, setNotFoundError] = useState(false)

  const [listingData, setListingData] = useState({
    name: "",
    category: "",
    price: "",
    closing_date: "",
    desc: "",
    file: null,
    file_type: null,
  })

  const { categories } = useSelector((state) => state.listings)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listingSlug } = useParams();

  useEffect(() => {
    if (listingSlug) {
      dispatch(getListing(listingSlug)).then((e) => {
        if (e?.payload?.status === 'success') {
          setNotFoundError(false)
          const listing = e.payload.data
          dispatch(getCategories()).then((e) => {
            if (e?.payload?.status === 'success') {
              const categories = e.payload.data
              const listingCategory = categories.find(category => category.name === listing?.listing?.category)

              const closingDate = new Date(listing?.listing?.closing_date)
              const closingDateLocal = new Date(closingDate.getTime() - closingDate.getTimezoneOffset() * 60000).toISOString()

              setListingData((prevListingData) => ({
                ...prevListingData,
                name: listing?.listing?.name,
                category: listingCategory ? listingCategory.slug : "other",
                price: listing?.listing?.price,
                closing_date: closingDateLocal.substring(0, closingDateLocal.lastIndexOf(".")),
                desc: listing?.listing?.desc,

              }))
              setIsLoading(false)              
            }
          })
          
        } else if (e?.payload?.status === 404) {
          setNotFoundError(true)
          setIsLoading(false)
        } else {
          setNotFoundError(false)
          setIsLoading(false)
        }
      })
    } else {
      setNotFoundError(false)
      setIsLoading(false)
      setListingData((prevListingData) => ({
        ...prevListingData,
        name: "",
        category: "",
        price: "",
        closing_date: "",
        desc: "",
        file: null,
        file_type: null

      }))
      dispatch(getCategories())
    }
    
  }, [dispatch, listingSlug])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target?.files) {
      var file = e.target.files[0]
      setListingData({ ...listingData, [name]: file.type, file: file })
    } else {
      setListingData({ ...listingData, [name]: value })
    }
  }

  if (isLoading && !createLoading) return <Spinner />;

  const submitHandler = (event) => {
    event.preventDefault()
    setCreateLoading(true)
    var file = listingData.file
    listingData['closing_date'] = new Date(listingData.closing_date).toISOString()
    delete listingData['file']
    if (!file) {
      delete listingData['file_type']
    }

    if (type) {
      listingData['slug'] = listingSlug
    }
    dispatch(type ? updateListing(listingData) : createListing(listingData)).then((e) => {
      if (e?.payload?.status === 'success') {
        const fileData = e.payload.data.file_upload_data
        if (file) {
          uploadImage(file, fileData.public_id, fileData.signature, fileData.timestamp).then(() => {
            setCreateLoading(false)
            toast.success(e.payload.message)
            navigate("/dashboard/listings")
          })
        } else {
          setCreateLoading(false)
          toast.success(e.payload.message)
          navigate("/dashboard/listings")
        }
      }
    })
  }

  const loadingButtonAttrs = {
    isLoading: true,
    loadingText: type ? 'Updating' : 'Creating',
    spinnerPlacement: 'start',
  }

  if (notFoundError) return <NotFound />;

  return (
    <>
      <SubHeader name={!type ? 'Create a Listing' : 'Update a Listing'} />
      <Box p={{ base: "30px", lg: "50px 140px 50px 140px" }} w='100%'>
        <form method='POST' onSubmit={submitHandler}>
          <Text fontSize='22px' mb={2}>Upload a clear image of your item</Text>
          <Input type='file' p={1.5} name='file_type' required={type ? false : true} mb={3} onChange={handleChange} accept="image/png, image/jpeg, image/bmp, image/webp" />
          <Grid gap={6} templateColumns={[`repeat(${displayCols}, 1fr)`]}>
            <GridItem>
              <Text fontSize='19px' mb={2}>Product Name</Text>
              <Input type='text' name='name' placeholder='Input The Product Name' onChange={handleChange} value={listingData.name} required mb={4} />
              <Text fontSize='19px' mb={2}>Select Product Category</Text>
              <Select placeholder='Choose a category' name='category' mb={4} required onChange={handleChange} value={listingData.category}>
                {categories.map((category, i) => (
                  <option value={category.slug} key={i}>{category.name}</option>
                ))}
                <option value='other'>Other</option>
              </Select>
              <Text fontSize='19px' mb={2}>Bidding Price</Text>
              <NumberInput mb={4} value={listingData.price}>
                <InputGroup>
                  <InputLeftAddon children='$' />
                  <NumberInputField name='price' placeholder='Enter a starting price' onChange={handleChange} value={listingData.price} required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </InputGroup>
              </NumberInput>
              <Text fontSize='19px' mb={2}>Closing Date</Text>
              <Input
                type='datetime-local'
                name='closing_date'
                onChange={handleChange}
                value={listingData.closing_date}
                min={new Date().toLocaleString("sv-SE").replace(" ", "T").split(".")[0].slice(0, -3)}
              />
            </GridItem>
            <GridItem>
              <Text fontSize='19px' mb={2}>Product Description</Text>
              <Textarea name='desc' rows={6} onChange={handleChange} value={listingData.desc} />
            </GridItem>
          </Grid>
          <Box textAlign='center' mt='3.5em' mb='3.5em'>
            <Button {...(createLoading && { ...loadingButtonAttrs })} size='lg' type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>{!type ? 'Create Listing' : 'Update Listing'}</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default CreateListing