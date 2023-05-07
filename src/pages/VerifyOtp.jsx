import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SubHeader } from '../components'

const VerifyOtp = () => {
    return (
        <>
            <SubHeader name='Verify Otp' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Verify Otp</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter the 6-digit otp sent to your email.</Text>

                        <form method='POST'>
                            <Text>Otp*</Text>
                            <Input type='number' name='otp' mb={6} required />
                            <Button type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Submit</Button>
                            <Text mt={4}><Link to='/signup' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Click Here!</Link> to get new otp</Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default VerifyOtp