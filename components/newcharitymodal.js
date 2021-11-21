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
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewCharityModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const { data: session } = useSession()
    const toast = useToast()
    const router = useRouter()

    const createCharity = async () => {
        await axios.post(process.env.NEXT_PUBLIC_API + '/charity/create', {
            name,
            description: desc,
            session
        }).then(res => {
            if (res.data.success) {
                toast({
                    title: 'Success',
                    description: 'Charity created',
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                router.push(`/charities/${res.data.charity.id}`)
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
    }
    return (
        <>
            <Modal size='md' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text>New Charity</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Name</Text>
                        <Input value={name} onChange={e => setName(e.target.value)} val variant='flushed' placeholder='Enter name' />
                        <Text mt={3}>Description</Text>
                        <Textarea value={desc} onChange={e => setDesc(e.target.value)} mt={2} />
                    </ModalBody>

                    <ModalFooter>
                        <Button size='sm' color='white' _hover={{ color: 'gray.800', bg: 'gray.200' }} bg="brandgray.100" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button size='sm' color='white' _hover={{ color: 'gray.800', bg: 'gray.200' }} bg="brandpurple" mr={3} onClick={() => createCharity()}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NewCharityModal