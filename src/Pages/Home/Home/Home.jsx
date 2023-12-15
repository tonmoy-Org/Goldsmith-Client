import Offer from "../../Offer/Offer";
import Reflect from "../../Reflect/Reflect";
import Banner from "../Banner/Banner";
import Jewelry from "../Jewelry/Jewelry";
import Tags from "../Tags/Tags";


const Home = () => {
    return (
        <div>
         <Banner></Banner>
         <Tags></Tags>
         <Jewelry></Jewelry>
         <Offer></Offer>
         <Reflect></Reflect>
        </div>
    );
};

export default Home;