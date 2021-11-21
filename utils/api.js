import { fetcher } from "./globalvar"
import useSWR from "swr"

export const useCharity = (params) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + `/charity/${params.id}`, fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useCharities = (params) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + '/charity/all', fetcher(params))
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useDonations = (params) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + `/donation/${params.session.user.email}`, fetcher(params))
    console.log(params)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useUser = (params) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + `/user?user=${params.email}`, fetcher(params))
    console.log(params)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

export const useUsers = (params) => {
    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + `/user/all`, fetcher(params))
    console.log(params)
    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}


// export const useUsers = (params) => {
//     const { data, error } = useSWR(process.env.NEXT_PUBLIC_API + `/user/${params.userId}`, fetcher(params))
//     console.log(params)
//     return {
//         data,
//         isLoading: !error && !data,
//         isError: error
//     }
// }