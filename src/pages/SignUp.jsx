import React from 'react'
import { SubHeader } from '../components'
import { Box, Button, Card, CardBody, Checkbox, Heading, Input, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <>
            <SubHeader name='Sign Up' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Sign Up</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Do you already have an account? <Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Log In Here!</Link></Text>

                        <form method='POST'>
                            <Text>First name*</Text>
                            <Input type='name' name='first_name' mb={6} required />

                            <Text>Last name*</Text>
                            <Input type='name' name='last_name' mb={6} required />

                            <Text>Email Address*</Text>
                            <Input type='email' name='email' mb={6} required />

                            <Text>Password*</Text>
                            <Input type='password' name='password' mb={6} required />

                            <Checkbox mb={8}>I agree to the Terms & Policy</Checkbox>
                            <Button type='submit' color='white' bgColor='rgb(220, 53, 69)' _hover={{ bg: 'red.600' }} w='100%'>Sign Up</Button>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default SignUp