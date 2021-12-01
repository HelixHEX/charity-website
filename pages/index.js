import {
  Button,
  Text,
  Flex,
  Grid,
  GridItem,
  WrapItem,
  Tooltip,
  Icon
} from "@chakra-ui/react"
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "../components/nav"
import Login from "./login"
import DonationsStat from '../components/donationsstat'
import { FaDollarSign, FaHandHoldingHeart, FaPlus } from 'react-icons/fa'
import { useUser } from "../utils/api"
import MobileNav from "../components/mobilenav"

const Home = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Dashboard />
    )
  }
  return (
    <>
      <Login />
    </>
  )
}

const Dashboard = () => {
  const { data: session } = useSession()
  const { data, error, isLoading } = useUser({ session, email: session.user.email })

  if (error) return <div>{error.info}</div>
  if (isLoading) return <div>loading...</div>
  if (!data) return <div>error</div>

  return (
    <>
      <Flex w='100%' h='100vh'>
        <Nav />
        <MobileNav />
        <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
          <Text fontWeight='200' fontSize={40}>Dashboard</Text>
          <Flex mt={55}>
            <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)",]} rowGap={4} gap={4}>
              <GridItem h={120} colSpan={[2, 2, 1, 1]} bg="tomato">
                <DonationsStat amount={`#${data.ranking}`} title={'Ranking'} />
              </GridItem>
              <GridItem h={120} colSpan={2} bg="tomato">
                <DonationsStat amount={`$${data.user.total_donated}`} title={'Total donated'} />
              </GridItem>
              <GridItem colSpan={2} h={120} bg="brandpurple">
                <DonationsStat amount={data.user.donatedCharities.length} title={'Total charities'} />
              </GridItem>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home