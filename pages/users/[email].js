import {
    Flex,
    Text,
    Icon
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useUser } from '../../utils/api'
import DonationsTableUser from '../../components/donationstableuser'
import Nav from '../../components/nav'
import { useDonations } from '../../utils/api'
import { BiArrowBack } from 'react-icons/bi'
import MobileNav from '../../components/mobilenav'

const User = () => {
    const { query, back } = useRouter()
    const { email } = query
    const { data: session } = useSession()
    const { data, error, isLoading } = useUser({ session, email: email === 'me' ? session.user.email : email })

    if (error) return <div>{error.info}</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>error</div>

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <MobileNav />
                <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
                    <Flex>
                        <Icon _hover={{cursor: 'pointer', color: 'brandpurple'}} onClick={() => back()} alignSelf='center' w={25} h={25} as={BiArrowBack} />
                        <Text fontWeight='200' fontSize={40} ml={3}>Donations</Text>
                    </Flex>
                    <Flex flexDir='column' mt={55}>
                        <Text fontSize={30} fontWeight='500'>{data.user.name}</Text>
                        <DonationsTableUser donations={data.user.donations} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default User