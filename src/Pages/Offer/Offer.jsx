

const Offer = () => {
    return (
        <div className="flex gap-10 justify-center mb-6 lg:mx-5 mx-3">
            <div className="border bottom-3 border-red-600 flex py-6 bg-red-100">
                <h2 className="mx-8">Super discount for your first purchase</h2>
                <span className='bg-[#FAC213] rounded-3xl px-3 text-[14px]'>DEALS OF THE WEEK</span>
                <h2 className="mx-8">Use discount code in checkout page.</h2>
            </div>
            <div className="border bottom-3 border-red-600 flex py-6 bg-red-100">
                <h2 className="mx-40">2nd shopping surprise campaign!</h2>
            </div>
        </div>
    );
};

export default Offer;