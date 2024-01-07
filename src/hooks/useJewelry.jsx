import { useQuery } from "react-query";


const useJewelry = () => {
    const { data: jewelry = [], refetch } = useQuery(['jewelry'], async () => {
        const res = await fetch(`https://goldsmith-server.vercel.app/jewelry`); // Replace with the correct URL for fetching user data
        return res.json();
    });
    return [jewelry, refetch];
}

export default useJewelry;