import { useParams } from "react-router-dom";


const Success = () => { 
    const {tranId} = useParams();
    
    return (
        <div>
           <h1 className="my-20">Payment Success !!! {tranId}</h1> 
        </div>
    );
};

export default Success;