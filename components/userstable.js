import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const UsersTable = ({users}) => {
    const {data:session} = useSession()
    const {push} = useRouter()
    return (
        <>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>Name</Th>
                        <Th>Total donated</Th>
                        <Th>Charities donated to</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user, index) => (
                        !user.anonymous ?
                            <Tr key={index} onClick={() => push(`/users/${user.email === session.user.email ? 'me' : user.email}`)} _hover={{ cursor: 'pointer', bg: 'brandgray.200', color: 'white' }}>
                                <Td>#{index + 1}</Td>
                                <Td >{user.name}</Td>
                                <Td >${user.total_donated}</Td>
                                <Td>{user.donatedCharities.length}</Td>
                            </Tr>
                            : null
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default UsersTable