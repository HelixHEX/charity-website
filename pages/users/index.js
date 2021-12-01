import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import CharitiesTable from '../../components/charitiestable'
import MobileNav from '../../components/mobilenav'
import Nav from '../../components/nav'
import UsersTable from '../../components/userstable'
import { useUsers } from '../../utils/api'

const Users = () => {
    const { data: session } = useSession()
    const { data, error, isLoading } = useUsers({ session })

    if (error) return <div>{error.info}</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>error</div>

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <MobileNav />
                <Flex ml={[0, 0, '25%', '25%']} mr={[0, 0, 0, 0]} flexDir='column' color='brandgray.200' w={['100%', '100%', '50%', '50%']} h='70%' alignSelf='center' >
                    <Text ml={10} fontWeight='200' fontSize={40}>Charities</Text>
                    <Flex mt={55}>
                        <UsersTable users={data.users} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Users