import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SubHeader } from '../components'

const PasswordResetRequest = () => {
    return (
        <>
            <SubHeader name='Password Reset Request' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Password Reset Request</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter your email address to reset your password.</Text>

                        <form method='POST'>
                            <Text>Email Address*</Text>
                            <Input type='email' name='email' mb={6} required />

                            <Button type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Submit</Button>
                            <Text mt='2' mb={10}><Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Back to Login</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default PasswordResetRequest