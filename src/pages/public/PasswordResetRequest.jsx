import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { requestPasswordReset, reset } from '../../features/auth/authSlice'
import toast from '../toasts'

const PasswordResetRequest = () => {
    const [userData, setUserData] = useState({
        email: "",
    })
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/password-reset")
            toast.success(message)
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(requestPasswordReset(userData))
    }

    const loadingButtonAttrs = {
        isLoading,
        loadingText: 'Submitting',
        spinnerPlacement: 'start'
    }
    return (
        <>
            <SubHeader name='Password Reset Request' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Password Reset Request</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter your email address to reset your password.</Text>

                        <form method='POST' onSubmit={submitHandler}>
                            <Text>Email Address*</Text>
                            <Input type='email' name='email' value={userData.email} onChange={handleChange} mb={6} required />

                            <Button {...(isLoading && { ...loadingButtonAttrs })} type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Submit</Button>
                            <Text mt='2' mb={10}><Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Back to Login</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default PasswordResetRequest