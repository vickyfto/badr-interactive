import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const UseGetListData = (query, page) => {
    const getFn = async () => {
        const result = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json?description=${query}&page=${page ?? 1}`).then((res) => res)
        return result
    }
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['getData'],
        queryFn: () => getFn(),
        refetch: false,
    })

    return { data, refetch, isLoading }
}

export default UseGetListData;