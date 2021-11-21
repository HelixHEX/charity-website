import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Admin = () => {
    const {data: session} = useSession()
    const {push} = useRouter()
    useEffect(() => {
        if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN) {
            push('/')
        }
    }, [])
    return (
        <>

        </>
    )
}

export default Admin