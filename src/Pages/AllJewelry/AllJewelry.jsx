import { useState } from 'react';
import shop1 from '../../assets/section-banner/shop-1.png';
import shop2 from '../../assets/section-banner/shop-2.png';
import useJewelry from '../../hooks/useJewelry';
import ShopCard from './ShopCard';

const AllJewelry = () => {
    const [jewelry] = useJewelry();
    const [filteredJewelry, setFilteredJewelry] = useState([]); // Initialize as an empty array

    const handleRangePrice = (e) => {
        const selectedRange = parseInt(e.target.value);

        // Filter the jewelry products based on the selected price range
        const filteredProducts = jewelry.filter((product) => product.price <= selectedRange);

        // Update the state with the filtered products
        setRangeValue(selectedRange);
        setFilteredJewelry(filteredProducts);
    };

    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
        // Clear the filter when the range input changes to show all data
        setFilteredJewelry([]);
    };


    return (
        <div>
            <div>
                <div className='mt-24 mb-12'>
                    <img className='w-full h-[128px] object-cover' src={shop1} alt="" />
                    <div className="top-32 lg:px-8 absolute text-black">
                        <span className='font-semibold'>Home . Shop</span>
                        <h1 className='text-2xl font-bold'>Shop</h1>
                    </div>
                </div>
            </div>
            <div className='flex mx-5 gap-8'>
                <div>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
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
                            <div className='w-[450px] ps-10 pb-10'>
                                <span className='bg-[#7d7d7d35] px-6 text-[15px]'>Nose Rings</span>
                                <h1 className='text-2xl font-semibold mt-6'>Free Shopping over &50</h1>
                                <p className='text-[17px] py-6 text-[#7D7D7D]'>
                                    Fashion is about dressing according to what is fashionable.
                                </p>
                            </div>
                            <div className='overflow-hidden'>
                                <img className='h-[300px] w-[980px] transition-transform transform hover:scale-110 rounded-lg object-cover' src={shop2} alt="" />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label>Showing 1–{filteredJewelry?.length === 0 ? jewelry?.length : filteredJewelry?.length} of 20 results</label>
                            <div className='mt-3 grid grid-cols-4 gap-8'>
                                {filteredJewelry.length === 0 // Check if filtered data is empty
                                    ? jewelry.map(data => ( // Show all data if the filter is empty
                                        <ShopCard
                                            className="column"
                                            key={data._id}
                                            data={data}
                                        ></ShopCard>
                                    ))
                                    : filteredJewelry.map(data => ( // Show filtered data when available
                                        <ShopCard
                                            className="column"
                                            key={data._id}
                                            data={data}
                                        ></ShopCard>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllJewelry;
