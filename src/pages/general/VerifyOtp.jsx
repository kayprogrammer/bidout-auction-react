import { Box, Button, Card, CardBody, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SubHeader } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import toast from '../toasts'
import { reset } from '../../features/auth/authSlice'
import { activate } from '../../features/auth/authSlice'

const VerifyOtp = () => {
    const [userData, setUserData] = useState({
        email: "",
        otp: ""
    })

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
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
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/login")
            toast.success(message)
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch ])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(activate(userData))
    }

    const loadingButtonAttrs = {
        isLoading,
        loadingText: 'Submitting',
        spinnerPlacement: 'start'
    }
    return (
        <>
            <SubHeader name='Verify Otp' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Verify Otp</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Enter the 6-digit otp sent to your email.</Text>

                        <form method='POST' onSubmit={submitHandler}>
                            <Text>Otp*</Text>
                            <Input type='number' name='otp' mb={6} value={userData.otp} required onChange={handleChange} {...(isError && { isInvalid: true })}/>
                            <Button
                                {...(isLoading && { ...loadingButtonAttrs })}
                                type='submit' 
                                color='white' 
                                bgColor='rgb(25, 135, 84)' 
                                _hover={{ bg: 'green.600' }} 
                                w='100%'
                            >Submit
                            </Button>
                            <Text mt={4}><Link to='/signup' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Click Here!</Link> to get new otp</Text>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default VerifyOtp