import axios from "axios"

export const fetcher = params => async url => {
    const res = await axios.get(url, {params})
    if(res.status !== 200) {
        const error = new Error('An error occurred while fetching the data.')
        error.info = await res.data
        error.status = res.status
        throw error
    } else return res.data
}