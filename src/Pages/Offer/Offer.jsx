
const Offer = () => {
    return (
        <div className="lg:flex gap-10 justify-center my-10 lg:mx-5 mx-3 text-center">
            <div className="border-dashed border-2 bottom-3 border-red-600 rounded-lg lg:flex items-center justify-center mb-6 lg:mb-0 py-5 bg-red-100 font-semibold">
                <p className="mx-8 py-2">Super discount for your first purchase</p>
                <span className='bg-red-500 rounded-3xl px-3 text-[13px] text-white'>DEALS OF THE WEEK</span>
                <p className="mx-8 py-2">Use discount code in checkout page.</p>
            </div>
            <div className="border-2 border-dashed bottom-3 border-yellow-600 rounded-lg lg:flex items-center gap-8 py-6 bg-yellow-100 font-semibold">
                <p className="pb-3 lg:ms-20">2nd shopping surprise campaign!</p>
                <span className='bg-[#FAC213] rounded-3xl px-3 text-[13px] lg:me-20'>DEALS OF THE WEEK</span>
            </div>
        </div>
    );
};

export default Offer;