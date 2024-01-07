import Offer from "../../Offer/Offer";
import Reflect from "../../Reflect/Reflect";
import SocialMedia from "../../SocialMedia/SocialMedia";
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
         <SocialMedia></SocialMedia>
        </div>
    );
};

export default Home;