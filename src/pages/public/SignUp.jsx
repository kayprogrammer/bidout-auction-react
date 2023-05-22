import React, { useEffect, useState } from 'react'
import { SubHeader } from '../../components'
import { Box, Button, Card, CardBody, Checkbox, Heading, Input, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from '../toasts'
import { reset } from '../../features/auth/authSlice'
import { register } from '../../features/auth/authSlice'

const SignUp = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        terms_agreement: false
    })
    const [errors, setErrors] = useState({})
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            setErrors(message)
        }
        if (isSuccess) {
            navigate("/verify-activation-otp")
            toast.success(message)
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, navigate, dispatch])

    const simpleValidation = (name, value) => {
        if (name === 'first_name' || name === 'last_name') {
            if (value.includes(' ')) {
                setErrors({ ...errors, [name]: 'No spacing allowed' })
            } else {
                setErrors({ ...errors, [name]: '' })
            }
        } else if (name === 'password') {
            if (value.length < 8) {
                setErrors({ ...errors, [name]: '8 characters min!' })
            } else {
                setErrors({ ...errors, [name]: '' })
            }
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors({ ...errors, [name]: 'Invalid email!' })
            } else {
                setErrors({ ...errors, [name]: '' })
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'terms_agreement') {
            setUserData({ ...userData, terms_agreement: e.target.checked });
        } else {
            setUserData({ ...userData, [name]: value })
        }

        // Simple Validations
        simpleValidation(name, value)
    }

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
                            <Input type='name' name='first_name' value={userData.first_name} required onChange={handleChange} {...(errors.first_name && { isInvalid: true })} />
                            <Text mb={5} fontSize={13} fontWeight='bold' color='red.500'>{errors?.first_name}</Text>

                            <Text>Last name*</Text>
                            <Input type='name' name='last_name' value={userData.last_name} required onChange={handleChange} {...(errors.last_name && { isInvalid: true })} />
                            <Text mb={5} fontSize={13} fontWeight='bold' color='red.500'>{errors?.last_name}</Text>

                            <Text>Email Address*</Text>
                            <Input type='email' name='email' value={userData.email} required onChange={handleChange} {...(errors.email && { isInvalid: true })} />
                            <Text mb={5} fontSize={13} fontWeight='bold' color='red.500'>{errors?.email}</Text>

                            <Text>Password*</Text>
                            <Input type='password' name='password' value={userData.password} required onChange={handleChange} {...(errors.password && { isInvalid: true })} />
                            <Text mb={5} fontSize={13} fontWeight='bold' color='red.500'>{errors?.password}</Text>

                            <Checkbox name='terms_agreement' isChecked={userData.terms_agreement} onChange={handleChange} required {...(errors.terms_agreement && { isInvalid: true })}>I agree to the Terms & Policy</Checkbox>
                            <Text mb={7} fontSize={13} fontWeight='bold' color='red.500'>{errors?.terms_agreement}</Text>

                            <Button
                                {...((!Object.values(errors).every(value => value === '')) && { isDisabled: true })}
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