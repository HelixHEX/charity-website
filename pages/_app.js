import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { SessionProvider, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react"

const publicPages = ['/', '/login',]
//test
const theme = extendTheme({
  colors: {
    brandgray: {
      50: '#E5E7ED',
      100: '#BBC3CE',
      200: '#474862'
    },
    brandpurple: '#625ED7',
    brandblue: {
      100: '#39B4F3',
      200: '#2012FE'
    }
  },
  styles: {
    global: {
      body: {
        bg: "brandgray.50",
      },
    },
  },
})

function MyApp({ Component, pageProps, session }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname)

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {isPublicPage ?
          <Component {...pageProps} />
          : <Auth isPublicPage={isPublicPage}>
            <Component {...pageProps} />
          </Auth>}
      </ChakraProvider>
    </SessionProvider>
  )
}


function Auth({ children, isPublicPage }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user

  useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
    if (!isPublicPage && !isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

export default MyApp
