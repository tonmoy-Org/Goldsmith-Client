import { useQuery } from "react-query";


const useCart = () => {
    const { data: carts = [], refetch } = useQuery(['carts'], async () => {
        const res = await fetch(`http://localhost:5000/carts`); // Replace with the correct URL for fetching user data
        return res.json();
    });
    return [carts, refetch];
}

export default useCart;