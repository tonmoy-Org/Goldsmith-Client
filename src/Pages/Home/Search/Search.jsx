import { useLocation } from "react-router-dom";


const Search = () => {
    const location = useLocation();
    const searchResults = JSON.parse(decodeURIComponent(new URLSearchParams(location.search).get('results')));
    console.log(searchResults)

    return (
        <div>
            {/* Use the decoded results */}
            <h1 className='my-40'>Search results: {searchResults?.length}</h1>
        </div>
    );
}
export default Search;

