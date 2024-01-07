// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import A1 from '../../assets/social/A-1.jpg'
import A2 from '../../assets/social/A-2.jpg'
import A3 from '../../assets/social/A-3.jpg'
import A4 from '../../assets/social/A-4.jpg'
import A5 from '../../assets/social/A-5.jpg'
import A6 from '../../assets/social/A-6.jpg'
import A7 from '../../assets/social/A-7.jpg'
import A8 from '../../assets/social/A-8.jpg'


import insta from '../../assets/icon/instagram.png'

const SocialMedia = () => {
    return (
        <div className='mx-4'>
            <div>
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold">#GoldSmith</h1>
                    <p className="py-4 text-base-content">Tag @ninetheme in your Instagram posts for a chance to be featured here.</p>
                    <p className="text-base-content">Find more inspiration on our Instagram account.</p>
                </div>
                <div className='my-20'>
                    <>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={8}
                            navigation={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 7,
                                    spaceBetween: 20,
                                },
                            }}
                            modules={[Autoplay, Navigation, Pagination]}
                            className="mySwiper w-full h-full"
                        >
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A1}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A2}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A3}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A4}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A5}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A6}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A7}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className='relative'>
                                <div className='group'>
                                    <img
                                        className='rounded-full w-full h-full object-cover transition-transform transform group-hover:scale-110'
                                        src={A8}
                                        alt=""
                                    />
                                    <div className='absolute top-0 -left-2 right-0 px-4 py-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        {/* Button */}
                                        <a href="" className='transition-transform transform hover:scale-110'>
                                            <img className='w-8' src={insta} alt="" />
                                        </a>
                                    </div>
                                    <div className='absolute bottom-8 left-0 right-0 px-4 py-8 text-white text-center transition-all transform translate-y-full group-hover:translate-y-0 duration-500'>
                                        {/* Text */}
                                        <p className='font-semibold'>#goldSmith</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </>
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;