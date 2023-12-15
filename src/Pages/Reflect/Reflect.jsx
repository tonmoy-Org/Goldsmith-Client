import bannerBg from '../../assets/section-banner/banner-bg.png'
import Countdown from "react-countdown";


const Reflect = () => {
    // Calculate the target date (9 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10);

    const Completionist = () => <span>You are good to go!</span>;

    return (
        <div className='mb-20'>
            <div className='lg:flex justify-center gap-5 items-center bg-[#F7F7F8] rounded-xl mx-5'>
                <div className='lg:w-[450px] ps-10 pb-10 pt-6'>
                    <span className='bg-[#FAC213] rounded-3xl px-3 text-[14px]'>DEALS OF THE WEEK</span>
                    <h1 className='text-4xl font-semibold mt-10'>Reflect the bonds of the past into your modern life.</h1>
                    <p className='text-[17px] py-6 text-[#7D7D7D]'>
                        Fashion is about dressing according to what's fashionable. Style is more about being yourself. Design is a constant challenge to balance comfort with luxe...
                    </p>
                    <div className='text-5xl mt-4'>
                        <Countdown className='border-dashed border-2 border-[#7D7D7D] lg:px-16 py-1 px-2 rounded-md' date={targetDate}>
                            <Completionist />
                        </Countdown>
                    </div>
                </div>
                <div>
                    <img className='lg:h-[627px] lg:w-[980px] rounded-xl object-cover' src={bannerBg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Reflect;
