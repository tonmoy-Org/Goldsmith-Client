import { useQuery } from "react-query";


const useJewelry = () => {
    const { data: collage = [], refetch } = useQuery(['collage'], async () => {
        const res = await fetch(`http://localhost:5000/jewelry`); // Replace with the correct URL for fetching user data
        return res.json();
    });
    return [collage, refetch];
}

export default useJewelry;