import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SubHeader } from '../../components'

const Login = () => {
    return (
        <>
            <SubHeader name='Login' />
            <Box minHeight='28.7vh' p='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Sign Up</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Don't have an account? <Link to='/signup' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Sign Up Here!</Link></Text>

                        <form method='POST'>
                            <Text>Email Address*</Text>
                            <Input type='email' name='email' mb={6} required />

                            <Text>Password*</Text>
                            <Input type='password' name='password' mb={6} required />

                            <Button type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Login</Button>
                            <Text mt='2' mb={10}>Forgot Password? <Link to='/password-reset-request' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Click Here!</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default Login