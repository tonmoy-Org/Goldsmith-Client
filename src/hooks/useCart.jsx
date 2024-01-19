import { useQuery } from "react-query";
import useAuth from "./useAuth";


const useCart = () => {
    const {user} = useAuth();
    const { data: carts = [], refetch } = useQuery(['carts'], async () => {
        const res = await fetch(`https://goldsmith-server.vercel.app/carts?email=${user?.email}`); // Replace with the correct URL for fetching user data
        return res.json();
    });
    return [carts, refetch];
}

export default useCart;