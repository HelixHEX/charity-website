import {
    Flex,
    Text
} from '@chakra-ui/react'
import CharitiesTable from '../../components/charitiestable'
import Nav from "../../components/nav"

const CharitiesPage = () => {
    return (
        <>
            <Flex w='100%' h='100vh'>
                <Nav />
                <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
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