import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { SubHeader } from '../../components'

const PasswordReset = () => {
    return (
        <>
            <SubHeader name='Password Reset' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Set New Password</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter your new password.</Text>

                        <form method='POST'>
                            <Text>New Password*</Text>
                            <Input type='password' name='password' mb={6} required />

                            <Button type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Submit</Button>
                            <Text mt='2' mb={10}><Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Back to Login</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default PasswordReset