import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const DonationsTable = ({ donations }) => {
    const { push } = useRouter()
    return (
        <>
            <Table variant='simple' mb={10}>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Amount</Th>
                        <Th>Donated on</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {donations.map((donation, index) => (
                        !donation.anonymous ?
                            <Tr key={index} _hover={{ cursor: 'pointer', bg: 'brandgray.200', color: 'white' }} onClick={() => push(`/users/${donation.user.email}`)}>
                                <Td >{donation.user.name}</Td>
                                <Td >${donation.amount}</Td>
                                <Td>{donation.createdAt}</Td>
                            </Tr>
                            : null
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default DonationsTable