import shop1 from '../../assets/section-banner/shop-1.png';
import shop2 from '../../assets/section-banner/shop-2.png';
import useJewelry from '../../hooks/useJewelry';
import ShopCard from './ShopCard';
import Newslatter from '../Newslatter/Newslatter';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const AllJewelry = () => {
    const [jewelry] = useJewelry();


    const [filteredJewelry, setFilteredJewelry] = useState([]);
    const [rangeValue, setRangeValue] = useState(0);
    const [displayedProducts, setDisplayedProducts] = useState(8); // State to track the number of products to display initially
    const [loadingMore, setLoadingMore] = useState(false);

    const handleRangePrice = (e) => {
        const selectedRange = parseInt(e.target.value);
        const filteredProducts = jewelry.filter((product) => product.price <= selectedRange);
        setRangeValue(selectedRange);
        setFilteredJewelry(filteredProducts);
    };

    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
        setFilteredJewelry([]);
    };

    const handleViewAll = () => {
        // Set loadingMore to true when the "View all jewelry products" button is pressed
        setLoadingMore(true);

        // Simulate a delay (you can replace this with your actual API call)
        setTimeout(() => {
            setDisplayedProducts(jewelry.length);
            setLoadingMore(false);
        }, 2000); // Replace 1000 with the actual delay in milliseconds
    };

    return (
        <div>
            <Helmet>
                <title>{`Shop - Goldsmith`}</title>
            </Helmet>
            <div>
                <div className='mt-16 mb-12'>
                    <img className='w-full lg:h-[128px] object-cover' src={shop1} alt="" />
                    <div className="top-32 px-8 absolute text-black">
                        <span className='font-semibold'>Home . Shop</span>
                        <h1 className='text-2xl font-bold'>Shop</h1>
                    </div>
                </div>
            </div>
            <div className='lg:flex mx-5 gap-8'>
                <div>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                <label className='text-[18px] font-bold py-2'>Filter By Price</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="240"
                                    value={rangeValue}
                                    onChange={handleRangePrice}
                                />
                                <span className='pt-2'>${rangeValue}- $240</span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='mb-20'>
                        <div className='lg:flex justify-center gap-5 items-center bg-[#F7F7F8] rounded-lg'>
                            <div className='lg:w-[450px] p-6 lg:ps-10'>
                                <span className='bg-[#7d7d7d35] px-6 text-[15px]'>Nose Rings</span>
                                <h1 className='text-2xl font-semibold mt-6'>Free Shopping over &50</h1>
                                <p className='text-[17px] py-6 text-[#7D7D7D]'>
                                    Fashion is about dressing according to what is fashionable.
                                </p>
                            </div>
                            <div className='overflow-hidden'>
                                <img className='lg:h-[300px] lg:w-[980px] transition-transform transform hover:scale-110 rounded-lg object-cover' src={shop2} alt="" />
                            </div>
                        </div>
                        {jewelry?.length === 0 ? (
                            <p className="w-16 mx-auto mt-40">
                                <span className="loading loading-dots w-20"></span>
                            </p>
                        ) :
                            (<div>
                                <div className='mt-4'>
                                    <div className='text-center'>
                                        <label className="font-semibold">Showing 1–{displayedProducts} of {jewelry.length} results</label>
                                    </div>
                                    <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-7 gap-4 mt-4'>
                                        {filteredJewelry.length === 0
                                            ? jewelry.slice(0, displayedProducts).map(data => (
                                                <ShopCard
                                                    className="column"
                                                    key={data._id}
                                                    data={data}
                                                ></ShopCard>
                                            ))
                                            : filteredJewelry.map(data => (
                                                <ShopCard
                                                    className="column"
                                                    key={data._id}
                                                    data={data}
                                                ></ShopCard>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>)}
                        {loadingMore && <p className="w-16 mx-auto mt-4"><span className="loading loading-dots w-20"></span></p>}

                        {displayedProducts < jewelry.length && (
                            <div className='flex justify-center my-6'>
                                <button
                                    className="bg-black text-white font-semibold py-2 px-7 border border-white hover:border-transparent rounded"
                                    onClick={handleViewAll}
                                >
                                    {loadingMore ? 'Loading...' : 'View all jewelry products'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Newslatter></Newslatter>
        </div>
    );
};

export default AllJewelry;
