import { Box, Button, Grid, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Spinner, SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { createListing, getCategories } from '../../features/listings/listingsSlice'
import toast from '../toasts'
import { useNavigate } from 'react-router-dom'

const CreateListing = ({ type }) => {
  const displayCols = useBreakpointValue({ base: 1, md: 2 })

  const [listingData, setListingData] = useState({
    name: "",
    category: "",
    price: "",
    closing_date: "",
    desc: "",
    file_type: "",
  })

  const { categories, creating, isLoading, isError } = useSelector((state) => state.listings)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (e.target?.files) {
      setListingData({ ...listingData, [name]: e.target.files[0].type })
    } else {
      setListingData({ ...listingData, [name]: value })
    }
  }

  if (isLoading && !creating) return <Spinner />;

  const submitHandler = (event) => {
    event.preventDefault()
    listingData['closing_date'] = new Date(listingData.closing_date).toISOString()
    dispatch(createListing(listingData)).then((e) => {
        if (e?.payload?.status === 'success') {
            toast.success(e.payload.message)
            navigate("/")
        }
    })
  }

  const loadingButtonAttrs = {
      isLoading,
      loadingText: 'Creating...',
      spinnerPlacement: 'start'
  }

  return (
    <>
      <SubHeader name={!type ? 'Create a Listing' : 'Update a Listing'} />
      <Box p={{ base: "30px", lg: "50px 140px 50px 140px" }} w='100%'>
        <form method='POST' onSubmit={submitHandler}>
          <Text fontSize='22px' mb={2}>Upload a clear image of your item</Text>
          <Input type='file' p={1.5} name='file_type' required mb={3} onChange={handleChange} accept="image/png, image/jpeg, image/bmp, image/webp" />
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
              <NumberInput mb={4}>
                <InputGroup>
                  <InputLeftAddon children='$'/>
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
          <Button {...((isLoading && creating) && { ...loadingButtonAttrs })} display='table' m='0 auto' mt='3.5em' mb='3.5em' size='lg' type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>{!type ? 'Create Listing' : 'Update Listing'}</Button>
        </form>
      </Box>
    </>
  )
}

export default CreateListing