import {
    Flex,
    Text
} from "@chakra-ui/react"

const DonationsStat = ({amount, title}) => {
    return (
        <>
            <Flex  flexDir='column' justifyContent='center' w='100%' h='100%' bg='white'>
                <Flex alignSelf='center' flexDir='column'>
                    <Text fontSize={50} >{amount}</Text>
                    <Text fontSize={20} color='brandgray.100' mt={-3}>{title}</Text>
                </Flex>
            </Flex>
        </>
    )
}

export default DonationsStat