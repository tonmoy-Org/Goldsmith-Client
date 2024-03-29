import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Newslatter from "../Newslatter/Newslatter";
import DetailsSwiper from "./DeatilsSwiper";
import { Helmet } from "react-helmet";


const Details = () => {
    const data = useLoaderData();
    const { image, name, price, description, categories, tags, items } = data;

    return (
        <div>
            <Helmet>
                <title>{`Product Details - Goldsmith`}</title>
            </Helmet>
            <div className="p-0">
                <div className='grid lg:grid-cols-2  lg:mx-24 lg:my-20 my-16'>
                    <div className='flex' style={{ width: '100%', height: 'auto' }}>
                        <Carousel className='w-[340px] lg:w-11/12  mx-auto mt-8'>
                            <div>
                                <img src={image} style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div>
                                <img src={items.img1} style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div>
                                <img src={items.img2} style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <div>
                                <img src={items.img3} style={{ width: '100%', height: 'auto' }} />
                            </div>
                        </Carousel>
                    </div>
                    <div className="p-4 mt-8">
                        <div className="mb-8">
                            <p className="uppercase font-semibold text-[13px]">HOME - PRODUCTS - <span>{name}</span></p>
                        </div>
                        <h1 className="font-bold text-4xl">{name}</h1>
                        <h2 className='py-3 text-base-400 text-xl'>${price}.00</h2>
                        <p className="item-description py-4 text-[#7D7D7D]">{description}</p>
                        <div className='pt-3'>
                            {Array.isArray(categories) ? (
                                <p className="item-categories font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Categories: </span> {categories.join(", ")}</p>
                            ) : (
                                <p className="item-categories font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Categories: </span>{categories}</p>
                            )}
                        </div>
                        <div className='pt-3'>
                            {Array.isArray(tags) ? (
                                <p className="item-tags font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Tags: </span>{tags.join(", ")}</p>
                            ) : (
                                <p className="item-tags font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Tags: </span>{tags}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-24 lg:mx-8 mx-4">
                <h1 className="text-[25px] font-semibold my-5">You May Also Like</h1>
                <div>
                    <DetailsSwiper></DetailsSwiper>
                </div>
            </div>
            <Newslatter></Newslatter>
        </div >
    );
};

export default Details;