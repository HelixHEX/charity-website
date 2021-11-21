import {
    Flex,
    Icon,
    useDisclosure
} from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { DollarSign, Home } from 'react-feather'
import { AiFillHome } from 'react-icons/ai'
import { FaDollarSign, FaHandHoldingHeart, FaPlus, FaUsers } from 'react-icons/fa'
import { RiLogoutBoxFill } from 'react-icons/ri'
import NewCharityModal from "./newcharitymodal"

const Nav = () => {
    const { pathname, push, query } = useRouter()
    const { email } = query
    const { data: session } = useSession()
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
            <Flex flexDir='column' justifyContent='center' h='100vh' w={75} bg='white' pos='fixed'>
                {session.user.email === process.env.NEXT_PUBLIC_ADMIN ? <Icon onClick={onOpen} mb={55} color={pathname === '/newcharity' ? 'brandpurple' : 'brandgray.100'} _hover={{ cursor: 'pointer', color: 'brandpurple' }} alignSelf='center' w={30} h={30} as={FaPlus} /> : null}
                <Icon onClick={() => push('/')} color={pathname === '/' ? 'brandpurple' : 'brandgray.100'} _hover={{ cursor: 'pointer', color: 'brandpurple' }} alignSelf='center' w={30} h={30} as={AiFillHome} />
                <Icon onClick={() => push('/users')} color={pathname === '/users' || (pathname === '/users/[email]' && email !== 'me' && email !== session.user.email ) ? 'brandpurple' : 'brandgray.100'} _hover={{ cursor: 'pointer', color: 'brandpurple' }} mt={55} alignSelf='center' w={30} h={30} as={FaUsers} />
                <Icon onClick={() => push('/charities')} color={pathname === '/charities' || pathname === '/charities/[id]' ? 'brandpurple' : 'brandgray.100'} _hover={{ cursor: 'pointer', color: 'brandpurple' }} mt={55} alignSelf='center' w={30} h={30} as={FaHandHoldingHeart} />
                <Icon onClick={() => push(`/users/me`)} color={pathname === '/users/[email]' && (email === 'me' || email === session.user.email )? 'brandpurple' : 'brandgray.100'} _hover={{ cursor: 'pointer', color: 'brandpurple' }} mt={55} alignSelf='center' w={30} h={30} as={FaDollarSign} />
                <Icon onClick={() => signOut()} color='brandgray.100' _hover={{ cursor: 'pointer', color: 'brandpurple' }} mt={55} alignSelf='center' w={30} h={30} as={RiLogoutBoxFill} />
            </Flex>
            <NewCharityModal onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default Nav