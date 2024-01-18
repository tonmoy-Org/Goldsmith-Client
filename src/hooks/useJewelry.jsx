import { useQuery } from "react-query";

const useJewelry = () => {
    const { data: jewelry = [], refetch } = useQuery(
        ['jewelry'],
        async () => {
            const res = await fetch(`http://localhost:5000/jewelry`);
            return res.json();
        },
        {
            staleTime: 8000, // Set staleTime to 5000 milliseconds (5 seconds)
        }
    );

    return [jewelry, refetch];
};

export default useJewelry;
