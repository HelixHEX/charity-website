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
        <Flex flexDir='column' color='brandgray.200' w='50%' h='70%' alignSelf='center' margin='auto'>
          <Text fontWeight='200' fontSize={40}>Dashboard</Text>
          <Flex mt={55}>
            <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns="repeat(5, 1fr)" rowGap={4} gap={4}>
              <GridItem h={120} colSpan={1} bg="tomato">
                <DonationsStat amount={`#${data.ranking}`} title={'Ranking'} />
              </GridItem>
              <GridItem h={120} colSpan={2} bg="tomato">
                <DonationsStat amount={`$${data.user.total_donated}`} title={'Total donated'} />
              </GridItem>
              <GridItem colSpan={2} h={120} bg="brandpurple">
                <DonationsStat amount={data.user.donatedCharities.length} title={'Total charities'} />
              </GridItem>
              {/* <GridItem minH={120} h='auto' color='white' colSpan={5} rowSpan={2} bg="brandpurple">
                  <Flex flexDir='column' p={3}>
                    <Text fontWeight='300' fontSize={30}>Top Charities</Text>
                    <Flex h={100} justifyContent='space-between' ml={4} flexDir='column' fontSize={20} fontWeight='300'>
                      <Text>1. 1-877-carsforkids</Text>
                      <Text>2. ST.Judes</Text>
                      <Text>3. Random Charity</Text>
                    </Flex>
                  </Flex>
                </GridItem> */}
            </Grid>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Home