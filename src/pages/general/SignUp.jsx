import React, { useEffect, useState } from 'react'
import { SubHeader } from '../../components'
import { Box, Button, Card, CardBody, Checkbox, Heading, Input, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reset } from '../../features/general/generalSlice'
import { register } from '../../features/auth/authSlice'

const SignUp = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        terms_agreement: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'terms_agreement') {
            setUserData({ ...userData, terms_agreement: e.target.checked });
        } else {
            setUserData({ ...userData, [name]: value })
        }
    }

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/verify-otp")
            toast.success(message);
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(userData))
    }

    const loadingButtonAttrs = {
        isLoading,
        loadingText: 'Submitting',
        spinnerPlacement: 'start'
    }
    return (
        <>
            <SubHeader name='Sign Up' />
            <Box minHeight='28.7vh' padding='30'>
                <Card maxW='100%' width='570px' display='table' m='0 auto' boxShadow='lg'>
                    <CardBody>
                        <Heading size='xl' textAlign='center'>Sign Up</Heading>
                        <Text textAlign='center' mt='2' mb={10}>Do you already have an account? <Link to='/login' style={{ color: 'rgb(220, 53, 69)', fontWeight: 'bold' }}>Log In Here!</Link></Text>

                        <form method='POST' onSubmit={submitHandler}>
                            <Text>First name*</Text>
                            <Input type='name' name='first_name' value={userData.first_name} mb={6} required onChange={handleChange} />

                            <Text>Last name*</Text>
                            <Input type='name' name='last_name' value={userData.last_name} mb={6} required onChange={handleChange} />

                            <Text>Email Address*</Text>
                            <Input type='email' name='email' value={userData.email} mb={6} required onChange={handleChange} />

                            <Text>Password*</Text>
                            <Input type='password' name='password' value={userData.password} mb={6} required onChange={handleChange} />

                            <Checkbox name='terms_agreement' isChecked={userData.terms_agreement} mb={8} onChange={handleChange} required>I agree to the Terms & Policy</Checkbox>
                            <Button
                                {...(isLoading && { ...loadingButtonAttrs })}
                                type='submit'
                                color='white'
                                bgColor='rgb(220, 53, 69)'
                                _hover={{ bg: 'red.600' }}
                                w='100%'
                            >Sign Up
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default SignUp