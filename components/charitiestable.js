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
import { mutate } from 'swr'
import { useCharities } from '../utils/api'
import { fetcher } from '../utils/globalvar'

const CharitiesTable = () => {
    const { push } = useRouter()
    const { data: session } = useSession()
    const { data, error } = useCharities({ session })

    if (error) return <div>{error.info}</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th >Donations</Th>
                        {/* <Th isNumeric>Total likes</Th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.charities.map((charity, index) => (
                        <Tr onClick={() => push(`/charities/${charity.id}`)} _hover={{ cursor: 'pointer', bg: 'brandgray.200', color: 'white' }} key={index}>
                            <Td>{charity.name}</Td>
                            <Td >${charity.totalDonations}</Td>
                            {/* <Td isNumeric>{charity.likedBy.length}</Td> */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default CharitiesTable