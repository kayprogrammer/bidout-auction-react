import React, { useState } from 'react'
import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import toast from '../toasts'
import { login, resendActivationEmail, updateUserState } from '../../features/auth/authSlice'

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const { isLoading } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(userData)).then((e) => {
            if (e?.payload?.status === 'success') {
                navigate("/dashboard")
                toast.success(e.payload.message)
            } else {
                const errMsg = e?.payload
                if (errMsg === 'Verify your email first'){
                    const emailData = {email: userData.email}
                    dispatch(updateUserState(emailData))
                    dispatch(resendActivationEmail(emailData)).then((e) => {
                        if(e?.payload?.status === 'success'){
                            navigate('/verify-activation-otp')
                        }
                    })
                } else {
                    toast.error(errMsg)
                }

            }
        })
    }

    const loadingButtonAttrs = {
        isLoading,
        loadingText: 'Logging in',
        spinnerPlacement: 'start'
    }
    return (
        <>
            <SubHeader name='Login' />
            <Box minHeight='28.7vh' p='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Login</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Don't have an account? <Link to='/signup' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Sign Up Here!</Link></Text>

                        <form method='POST' onSubmit={submitHandler}>
                            <Text>Email Address*</Text>
                            <Input type='email' name='email' mb={6} required value={userData.email} onChange={handleChange} />

                            <Text>Password*</Text>
                            <Input type='password' name='password' mb={6} required value={userData.password} onChange={handleChange} />

                            <Button {...(isLoading && { ...loadingButtonAttrs })} type='submit' color='white' bgColor='rgb(25, 135, 84)' _hover={{ bg: 'green.600' }} w='100%'>Login</Button>
                            <Text mt='2' mb={10}>Forgot Password? <Link to='/password-reset-request' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Click Here!</Link></Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default Login