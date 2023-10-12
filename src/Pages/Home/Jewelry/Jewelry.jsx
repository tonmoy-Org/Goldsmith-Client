import banner2 from '../../../assets/section-banner/banner-1.png';
import useJewelry from '../../../hooks/useJewelry';
import JewelryCard from './JewelryCard';

const Jewelry = () => {
    const [jewelry] = useJewelry();
    return (
        <div className='lg:flex mx-5 gap-5 my-20'>
            <div>
                <div style={{ position: 'relative', height: '100%' }}>
                    <img className='lg:w-full lg:h-[690px] w-[374px] h-[450px] mx-auto scale-100 rounded-xl' src={banner2} alt="" />
                    <div className="lg:px-20 px-10 space-y-4 absolute text-white text-center bottom-10">
                        <span>Nose Rings</span>
                        <h1 className='text-3xl'>Nose Rings</h1>
                        <p>15 NOV - 25 NOV</p>
                    </div>
                </div>

            </div>
            <div className='grid lg:grid-cols-4 gap-5'>
                {
                    jewelry.map(data => (
                        <JewelryCard
                            key={data._id}
                            data={data}
                        ></JewelryCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Jewelry;