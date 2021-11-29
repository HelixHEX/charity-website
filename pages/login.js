import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Input,
    Label,
    Button,
    Text,
    Flex,
    Icon
} from '@chakra-ui/react'
import Image from 'next/image'
import { FiDollarSign } from 'react-icons/fi'
const Login = () => {
    const handleSocialLogin = social => {
        signIn(social, { callbackUrl: 'http://localhost:5000/' });
    };

    return (
        <>
            <Flex w='100%' h='100vh' bg='white' display={['none', 'none', 'flex', 'flex', 'flex']}>
                {/* <Flex alignSelf='center' margin='auto'>
                    <GoogleButton onClick={() => handleSocialLogin('google')} />
                </Flex> */}
                <Flex flexDir='column' w='50%' >
                    <Text alignSelf='center' mt={3} fontSize={40} fontWeight='200'>Charity Tracker</Text>
                    <Flex w={[200, 300, 300, 400]} flexDir='column' margin='auto'>
                        <Text fontSize={50} fontWeight='700' color='brandgray.200'>Login</Text>
                        <Button color='brandgray.200'  onClick={() => handleSocialLogin('google')} _hover={{ border: '1px solid #474862', bg: 'brandgray.200', color: 'white' }} mt={10} h={55} borderRadius={100} bg='none' border='1px solid #C4C4C4'>
                            <Image src='/assets/google.png' width={25} height={25} />
                            <Text ml={5}>Sign in with Google</Text>
                        </Button>
                    </Flex>
                </Flex>
                <Flex w='50%' bg='brandpurple' color='brandgray.200'>
                    {/* <Image src='/assets/Top-left.png' width={25} height={25} /> */}
                    <Flex margin='auto' alignSelf='center'  >
                        <Flex boxShadow="xl" flexDir='column' justifyContent='center' w={[200, 200, 300, 340]} h={120} bg='white'>
                            <Flex alignSelf='center' flexDir='column'>
                                <Text fontSize={50} >$2,003</Text>
                                <Text fontSize={20} color='brandgray.100' mt={-3}>Total Donated</Text>
                            </Flex>
                        </Flex>
                        <Flex mt={-75} ml={[-65, -35, -65, -65]} boxShadow="xl" flexDir='column' justifyContent='center' w={120} h={120} bg='white'>
                            <Flex alignSelf='center' flexDir='column'>
                                <Text fontSize={50} >#1</Text>
                                <Text fontSize={20} color='brandgray.100' mt={-3}>Ranking</Text>
                            </Flex>
                        </Flex>
                        <Flex boxShadow="xl" pos='absolute' mt={-40} ml={105} borderRadius={50} w={75} h={75} bg='white'>
                            <Icon width={35} h={35} alignSelf='center' margin='auto' color='#10CA00' as={FiDollarSign} />
                        </Flex>
                        <Flex boxShadow="xl" pos='absolute' mt={-40} ml={105} borderRadius={50} w={75} h={75} bg='white'>
                            <Icon width={35} h={35} alignSelf='center' margin='auto' color='#10CA00' as={FiDollarSign} />
                        </Flex>
                        <Flex ml={[100, 100, 200, 300]} mt={200} pos='absolute' boxShadow="xl" borderRadius={50} w={75} h={75} bg='white'>
                            <Icon viewBox="0 0 590 590" width={35} h={35} alignSelf='center' margin='auto' color='#39B4F3'>
                                <path fill="currentColor" d="M275.2 250.5c7 7.375 18.5 7.375 25.5 0l108.1-114.2c31.5-33.12 29.72-88.1-5.65-118.7c-30.88-26.75-76.75-21.9-104.9 7.724L287.1 36.91L276.8 25.28C248.7-4.345 202.7-9.194 171.1 17.56C136.7 48.18 134.7 103.2 166.4 136.3L275.2 250.5zM568.2 336.3c-13.12-17.81-38.14-21.66-55.93-8.469l-119.7 88.17h-120.6c-8.748 0-15.1-7.25-15.1-15.1c0-8.746 7.25-15.1 15.1-15.1h78.25c15.1 0 30.75-10.87 33.37-26.62c3.25-19.1-12.12-37.37-31.62-37.37H191.1c-26.1 0-53.12 9.25-74.12 26.25l-46.5 37.74l-55.37-.0253c-8.748 0-15.1 7.275-15.1 16.02L.0001 496C.0001 504.8 7.251 512 15.1 512h346.1c22.03 0 43.92-7.187 61.7-20.28l135.1-99.51C577.5 379.1 581.3 354.1 568.2 336.3z"></path>
                            </Icon>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDir='column' w='100%' h='100vh' bg='brandpurple'>
                <Text alignSelf='center' color='white' mt={3} fontSize={40} fontWeight='200'>Charity Tracker</Text>
                <Flex margin='auto' w={400} flexDir='column' alignSelf='center'>
                    <Text fontSize={50} fontWeight='700' color='white'>Login</Text>
                    <Button onClick={() => handleSocialLogin('google')} _hover={{ bg: 'brandgray.200', color: 'white' }} mt={10} h={55} borderRadius={100} color='brandgray.200' bg='white'>
                        <Image src='/assets/google.png' width={25} height={25} />
                        <Text ml={5}>Sign in with Google</Text>
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}

export default Login