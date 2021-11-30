import {
    Flex,
    Text
} from '@chakra-ui/react'
import CharitiesTable from '../../components/charitiestable'
import MobileNav from '../../components/mobilenav'
import Nav from "../../components/nav"

const CharitiesPage = () => {
    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <MobileNav />
                <Flex ml={[10, 10, '25%', '25%']} mr={[10, 10, 0, 0]} flexDir='column' color='brandgray.200' w={['100%', '100%', '50%', '50%']} h='70%' alignSelf='center' >
                    <Text fontWeight='200' fontSize={40}>Charities</Text>
                    <Flex mt={55}>
                        <CharitiesTable />
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default CharitiesPage