import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Input,
    Label,
    Button,
    Text,
    Flex,
} from '@chakra-ui/react'
import GoogleButton from 'react-google-button'

const Login = () => {
    const handleSocialLogin = social => {
        signIn(social, { callbackUrl: 'http://localhost:5000/' });
    };

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Flex alignSelf='center' margin='auto'>
                    <GoogleButton onClick={() => handleSocialLogin('google')} />
                </Flex>
            </Flex>
        </>
    )
}

export default Login