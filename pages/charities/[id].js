import {
    Flex,
    Text,
    Button,
    useDisclosure,
    Icon
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Nav from "../../components/nav"
import { fetcher } from '../../utils/globalvar'
import DonateModal from '../../components/donatemodal'
import { useCharity } from '../../utils/api'
import DonationsTable from '../../components/donationstable'
import { BiArrowBack } from 'react-icons/bi'

const CharityPage = () => {
    const { pathname, query, back } = useRouter()
    const { id } = query
    const { data: session } = useSession()
    const { data, error, isLoading } = useCharity({ session, id })
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (error) return <div>{error.info}</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>error</div>

    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
                    <Flex>
                        <Icon _hover={{ cursor: 'pointer', color: 'brandpurple' }} onClick={() => back()} alignSelf='center' w={25} h={25} as={BiArrowBack} />
                        <Text ml={3} fontWeight='200' fontSize={40}>{data.charity.name}</Text>
                        <Button onClick={onOpen} _hover={{ bg: 'brandgray.100' }} color='white' bg='brandblue.100' alignSelf='center' ml={3}>
                            Donate
                        </Button>
                        <DonateModal charity={data.charity} onClose={onClose} isOpen={isOpen} />
                    </Flex>
                    <Flex flexDir='column' mt={55}>
                        <Text fontSize={30} fontWeight='500'>Donations</Text>
                        <DonationsTable mt={10} donations={data.charity.donations} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default CharityPage