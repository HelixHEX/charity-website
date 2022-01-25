import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import axios from 'axios'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        }),
    ],
    secret: process.env.SECRET,
    jwt: {
        encryption: true
    },
    callbacks: {
        async jwt(token, account) {
            if (account?.accessToken) {
                console.log(account)
                token.accessToken = account.accessToken;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login'
    },
    debug: true
})

// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
//             params: { grant_type: "authorization_code" },
//             authorizationUrl:'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
//         }),
//     ],
//     jwt: {
//         encryption: true,
//     },
//     secret: process.env.SECRET,
//     callbacks: {
//         async jwt(token, account) {
//             if (account?.accessToken) {
//                 token.accessToken = account.accessToken;
//             }
//             return token;
//         },
//         redirect: async (url, _baseUrl) => {
//             if (url === '/profile') {
//                 return Promise.resolve('/');
//             }
//             return Promise.resolve('/');
//         },
//     },
//     debug: true
// });

// export default NextAuth({
//     providers: [
//         Providers.Google({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
//         }),
//         Providers.GitHub({
//             clientId: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET
//         })
//     ],
//     jwt: {
//         encryption: true,
//     },
//     secret: process.env.SECRET,
//     callbacks: {
//         async jwt(token, account) {
//             if (account?.accessToken) {
//                 token.accessToken = account.accessToken;
//             }
//             return token;
//         },
//     },
//     pages: {
//         signIn: '/login',
//         error: '/login'
//     }
    // providers: [
    //     Providers.GitHub({
    //         clientId: process.env.GITHUB_CLIENT_ID,
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET
    //     }),
    //     Providers.Google({
    //         clientId: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //         authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    //     }),
    //     Providers.Credentials({
    //         name: 'credentials',
    //         credentials: {
    //             email: { label: 'Email', type: 'email', placeholder: 'example@gmail.com' },
    //             password: { label: 'Password', type: 'password', placeholder: '******' },
    //         },
    //         authorize: async credentials => {
    //             await axios.post(process.env.NEXT_PUBLIC_API_URL + '/user/login', {
    //                 credentials
    //             }).then(res => {
    //                 if (res.data.success) {
    //                     return res.data.user
    //                 } else {
    //                     throw new Error(res.data.error + '&email=' + credentials.email)
    //                 }
    //             })
    //         }
    //     })
    // ],

    // callbacks: {
    //     jwt: async ({ token, user }) => {
    //         if (user.accessToken) {
    //             token.accessToken = user.accessToken;
    //         }
    //         return token;
    //     },
    //     session: async ({ session, token }) => {
    //         if (token) {
    //             session.id = token.id;
    //         }

    //         return session;
    //     },
    // },
    // session: {
    //     jwt: true
    // },
    // pages: {
    //     error: '/login',
    //     signIn: '/login',
    //     signUp: '/signup'
    // },
    // theme: 'dark',
    // jwt: {
    //     encryption: true
    // },
    // secret: process.env.SECRET
// })