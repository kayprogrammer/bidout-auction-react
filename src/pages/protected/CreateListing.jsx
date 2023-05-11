import { Box, Button, Grid, GridItem, Input, InputGroup, InputLeftAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, Textarea, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { SubHeader } from '../../components'

const CreateListing = ({ type }) => {
  const displayCols = useBreakpointValue({ base: 1, md: 2 })
  const categoryElements = [1, 2, 3, 4, 5, 6]
  return (
    <>
      <SubHeader name={!type ? 'Create a Listing' : 'Update a Listing'} />
      <Box p={{ base: "30px", lg: "50px 140px 50px 140px" }} w='100%'>
        <form method='POST'>
          <Text fontSize='22px' mb={2}>Upload a clear image of your item</Text>
          <Input type='file' p={1.5} name='image' required mb={3} />
          <Grid gap={6} templateColumns={[`repeat(${displayCols}, 1fr)`]}>
            <GridItem>
              <Text fontSize='19px' mb={2}>Product Name</Text>
              <Input type='text' name='name' placeholder='Input The Product Name' required mb={4} />
              <Text fontSize='19px' mb={2}>Select Product Category</Text>
              <Select placeholder='Choose a category' name='category' mb={4} required>
                {categoryElements.map((el) => (
                  <option value={el}>Category {el}</option>
                ))}
                <option value={null}>Other</option>
              </Select>
              <Text fontSize='19px' mb={2}>Bidding Price</Text>
              <NumberInput mb={4}>
                <InputGroup>
                  <InputLeftAddon children='$'/>
                  <NumberInputField name='price' placeholder='Enter a starting price' required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </InputGroup>
              </NumberInput>
              <Text fontSize='19px' mb={2}>Closing Date</Text>
              <Input type='datetime-local' name='closing_date' />
            </GridItem>
            <GridItem>
              <Text fontSize='19px' mb={2}>Product Description</Text>
              <Textarea name='desc' rows={6} />
            </GridItem>
          </Grid>
          <Button display='table' m='0 auto' mt='3.5em' mb='3.5em' size='lg' type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }}>{!type ? 'Create Listing' : 'Update Listing'}</Button>
        </form>
      </Box>
    </>
  )
}

export default CreateListing