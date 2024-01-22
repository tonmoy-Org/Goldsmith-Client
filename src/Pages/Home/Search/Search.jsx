import { useLocation } from "react-router-dom";
import shop1 from "../../../assets/section-banner/shop-1.png";
import SearchCard from "./SearchCard";
import Newslatter from "../../Newslatter/Newslatter";
import { Helmet } from "react-helmet";

const Search = () => {
    const location = useLocation();
    const { encodedSearchValue, searchResults } = location.state || {};

    // Decode the search value when using it in the component
    const decodedSearchValue = decodeURIComponent(encodedSearchValue);
    console.log(decodedSearchValue);

    return (
        <div>
            <Helmet>
                <title>{`Search - Goldsmith`}</title>
            </Helmet>
            <div>
                <div className="mt-16 mb-10">
                    <img className="w-full lg:h-[128px] object-cover" src={shop1} alt="" />
                    <div className="top-32 px-8 absolute text-black">
                        <span className="font-semibold">Home . Search</span>
                        <h1 className="text-2xl font-bold">Search</h1>
                    </div>
                </div>
            </div>
            <div className='text-center mb-4'>
                <label className="font-semibold">Showing  of {searchResults.length} results</label>
            </div>
            {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 w-11/12 mx-auto mb-16">
                    {searchResults.map((data) => (
                        <SearchCard key={data._id} data={data}></SearchCard>
                    ))}
                </div>
            ) : (
                <p>No search results</p>
            )}
            <div className="mt-9">
                <Newslatter></Newslatter>
            </div>
        </div>
    );
};

export default Search;
