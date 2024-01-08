

const Newslatter = () => {
    return (
        <div className="border-t-2 border-[#7a7a7a3f]">
            <div className="lg:flex justify-between items-center mx-4 mb-20 mt-10">
                <div className="mb-10">
                    <span className="text-[12px] font-semibold">CUSTOMER SERVICES</span>
                    <h1 className="text-3xl font-semibold py-2">(+777) 450-15-415</h1>
                    <span className="lg:text-[11px] text-[14px] text-base-600">Monday – Friday: 9:00 - 20:00</span>
                </div>
                <div>
                    <span className="text-[12px] font-semibold">NEWSLETTER</span>
                    <div className="flex items-center py-2">
                        <input
                            type="text"
                            className="border border-gray-300 ps-3 py-2 rounded-l focus:outline-none focus:border-black"
                            placeholder="Enter text..."
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-r focus:outline-none">
                            Submit
                        </button>
                    </div>
                    <span className="lg:text-[11px] text-[14px] text-base-600">Sign up to get the latest on new Products, Promotions, Design news and more</span>
                </div>
            </div>
        </div>
    );
};

export default Newslatter;