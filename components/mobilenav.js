import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Icon,
    Flex,
    Button,
    Text
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { HiMenu } from 'react-icons/hi'
import NewCharityModal from './newcharitymodal'

const MobileNav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:cisOpen, onOpen:conOpen, onClose:conClose } = useDisclosure()

    const btnRef = React.useRef()
    const { push } = useRouter()
    const { data: session } = useSession()
    return (
        <>
            <Flex display={['flex', 'flex', 'none', 'none',]}>
                <Icon pos='absolute' onClick={onOpen} mt={5} ml={10} w={35} h={35} as={HiMenu} />
                <Drawer
                    size='full'
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent color='white' bg='brandpurple'>
                        <DrawerCloseButton />
                        <DrawerHeader>Menu</DrawerHeader>

                        <DrawerBody w='100%'>
                            <Flex fontSize={30} fontWeight='200' textAlign='center' flexDir='column'>
                                {session.user.email === process.env.NEXT_PUBLIC_ADMIN ? <Text onClick={conOpen}>New Charity</Text> : null}
                                <Text onClick={() => push('/')} mt={session.user.email === process.env.NEXT_PUBLIC_ADMIN ? 3 : 0}>Dashboard</Text>
                                <Text onClick={() => push('/users')} mt={3}>Users</Text>
                                <Text onClick={() => push('/charities')} mt={3}>Charities</Text>
                                <Text onClick={() => push('/users/me')} mt={3}>Donations</Text>
                                <Text onClick={() => signOut()} mt={3}>Logout</Text>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <NewCharityModal onClose={conClose} isOpen={cisOpen} />
        </>
    )
}

export default MobileNav
