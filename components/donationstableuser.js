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

const DonationsTableUser = ({donations}) => {
    const {push} = useRouter()
    return (
        <>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th >Amount</Th>
                        <Th >Donated on</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {donations.map((donation, index) => (
                        <Tr onClick={() => push(`/charities/${donation.charity.id}`)} _hover={{ cursor: 'pointer', bg: 'brandgray.200', color: 'white' }} key={index}>
                            <Td>{donation.charity.name}</Td>
                            <Td >${donation.amount}</Td>
                            <Td >{donation.createdAt}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default DonationsTableUser