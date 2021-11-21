import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
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
                <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
                    <Text fontWeight='200' fontSize={40}>Users</Text>
                    <Flex mt={55}>
                        <UsersTable users={data.users} />
                        {/* <CharitiesTable /> */}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Users