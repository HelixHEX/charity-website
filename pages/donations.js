import {
    Flex,
    Text
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import DonationsTableUser from '../components/donationstableuser'
import MobileNav from '../components/mobilenav'
import Nav from '../components/nav'
import { useDonations } from '../utils/api'

const Donations = () => {
    const {data:session} = useSession()
    const {data, error, isLoading} = useDonations({session})

    if (error) return <div>{error.info}</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>error</div>

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <MobileNav />
                <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
                    <Text fontWeight='200' fontSize={40}>Donations</Text>
                    <Flex mt={55}>
                        <DonationsTableUser donations={data.donations} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Donations