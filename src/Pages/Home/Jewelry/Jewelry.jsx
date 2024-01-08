import React, { useState, useEffect } from 'react';
import banner2 from '../../../assets/section-banner/banner-1.png';
import useJewelry from '../../../hooks/useJewelry';
import JewelryCard from './JewelryCard';

const Jewelry = () => {
    const [jewelry, loading] = useJewelry();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const loaderTimeout = setTimeout(() => {
            // Hide the loader after 2000 milliseconds (2 seconds)
            setShowLoader(false);
        }, 2000);

        return () => {
            // Clear the timeout if the component unmounts before the timeout completes
            clearTimeout(loaderTimeout);
        };
    }, []);

    // Use slice(0, 8) to get the first 8 items from the array
    const slicedJewelry = jewelry.slice(0, 8);

    return (
        <div className='lg:flex mx-5 gap-5 mt-20 mb-6'>
            <div className='mb-10'>
                <div style={{ position: 'relative', height: '100%' }}>
                    <img className='lg:w-full lg:h-[690px] w-[374px] h-[450px] mx-auto scale-100 rounded-xl' src={banner2} alt="" />
                    <div className="lg:px-20 px-10 space-y-4 absolute text-white text-center bottom-20 left-0 right-0">
                        <span>GOLD PIERCING</span>
                        <h1 className='text-3xl'>FLASH SALE</h1>
                        <p>15 NOV - 25 NOV</p>
                    </div>
                </div>
            </div>
            {showLoader ? (
                <p className="w-16 mx-auto mt-40">
                    <span className="loading loading-dots w-20"></span>
                </p>
            ) : (
                <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-7 gap-4'>
                    {slicedJewelry.map(data => (
                        <JewelryCard key={data._id} data={data}></JewelryCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Jewelry;
