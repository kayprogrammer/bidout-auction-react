import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import { SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setNewPassword, requestPasswordReset } from '../../features/auth/authSlice'

import toast from '../toasts'

const PasswordReset = () => {
    const [userData, setUserData] = useState({
        email: "",
        otp: "",
        password: "",
    })

    const { user, isLoading, isError, isSuccess, otpResent, message } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user?.email) {
            navigate('/')
        }
        setUserData((prevUserData) => ({
            ...prevUserData,
            email: user?.email
        }))

        if (isError) {
            if (message?.password) {
                toast.error(message?.password)
            } else {
                toast.error(message)
            }
        }
        if (isSuccess) {
            if (!otpResent) {
                navigate("/login")
            }
            toast.success(message)
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch, otpResent])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(setNewPassword(userData))
    }

    const loadingButtonAttrs = {
        isLoading,
        loadingText: 'Submitting',
        spinnerPlacement: 'start'
    }
    return (
        <>
            <SubHeader name='Password Reset' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Set New Password</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter Otp sent to your email and your new password.</Text>

                        <form method='POST' onSubmit={submitHandler}>
                            <Text>Otp*</Text>
                            <Input pattern=".{6}" type='number' name='otp' value={userData.otp} onChange={handleChange} mb={6} required title="Field must be 6 characters long" />
                            <Text>New Password*</Text>
                            <Input minLength={8} type='password' name='password' value={userData.password} onChange={handleChange} mb={6} required />

                            <Button {...((isLoading && !otpResent) && { ...loadingButtonAttrs })} type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Submit</Button>
                            <Heading fontSize={14} mt={4} display='flex'><Text role='button' color='rgb(220, 53, 69)' fontWeight='bold' mr={1} onClick={() => { dispatch(requestPasswordReset({ "email": user?.email })) }}>Click Here!</Text> to get new otp</Heading>
                            <Text textAlign='center' mt='2' mb={10}><Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Back to Login</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default PasswordReset