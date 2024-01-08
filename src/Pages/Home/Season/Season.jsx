import { TypeAnimation } from 'react-type-animation';
import background2 from '../../../assets/season/background-2-scaled.webp';

const Season = () => {
    return (
        <div className='mt-24'>
            <div className="carousel-item relative w-full" style={{ height: '100vh' }}>
                <div className="relative w-full">
                    <img src={background2} className="w-full brightness-75 object-cover" style={{ height: '80vh' }} />
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center text-white text-center">
                        <span className='bg-yellow-500 rounded-3xl px-4 py-1 text-xs font-bold'>DEALS OF THE WEEK</span>
                        <TypeAnimation className='lg:text-[2rem] text-2xl font-semibold my-4'
                            sequence={[
                                'Back to the past: Earrings',
                                1000,
                                'Back to the past: Necklaces',
                                1000,
                                'Back to the past: Bracelets',
                                1000,
                            ]}
                            speed={50}
                            repeat={Infinity}
                        />

                        <p className='lg:w-2/4 mx-auto pb-6 px-4'>You can hide so much behind theatrics, and I don't need to do that anymore. My relationships with producers or photographers - these are relationships that took years.</p>
                        <button className="bg-transparent hover:bg-white hover:text-black text-white font-semibold py-2 px-7 border border-white hover:border-transparent rounded">
                            View all leather products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Season;
