import {
    Text,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Button,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { mutate } from 'swr'

const DonateModal = ({ charity, isOpen, onClose }) => {
    const [amount, setAmount] = useState("1.00")
    const toast = useToast()
    const { data: session } = useSession()

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, "")
    
    const donate = async () => {
        let num = parseFloat(amount.split("$"))
        if (num > 0) {
            if (num <= 5000) {
                await axios.post(process.env.NEXT_PUBLIC_API + '/donation/', {
                    charityId: charity.id,
                    amount,
                    session,
                    anonymous: false
                }).then(res => {
                    if (res.data.success) {
                        toast({
                            title: 'Success',
                            description: `You have donated $${amount} to ${charity.name}!`,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        })
                        onClose()
                        setAmount("1.00")
                        mutate(process.env.NEXT_PUBLIC_API + `/charity/${charity.id}`)
                    } else if (res.data.error) {
                        toast({
                            title: 'Uh Oh :(',
                            description: res.data.error,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })

                    }
                })
            } else {
                toast({
                    title: 'LOLLLL',
                    description: 'We both know you don\'t have that much money ;)',
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    }
    return (
        <>
            <Modal size='md' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>New Donation</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Donate to {charity.name}</Text>
                        <NumberInput
                            mt={3}
                            onChange={(valueString) => setAmount(parse(valueString))}
                            value={format(amount)}
                            step={1.00}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </ModalBody>

                    <ModalFooter>
                        <Button size='sm' color='white' _hover={{ color: 'gray.800', bg: 'gray.200' }} bg="brandgray.100" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button size='sm' color='white' _hover={{ color: 'gray.800', bg: 'gray.200' }} bg="brandpurple" mr={3} onClick={() => donate()}>
                            Donate
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DonateModal