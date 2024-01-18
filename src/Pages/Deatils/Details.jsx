import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Newslatter from "../Newslatter/Newslatter";
import DetailsSwiper from "./DeatilsSwiper";


const Details = () => {
    const data = useLoaderData();
    const { image, name, price, description, categories, tags, items } = data;

    return (
        <div>
            <div className='grid lg:grid-cols-2 mx-24 my-28'>
                <div className='flex' style={{ width: '88%', height: 'auto' }}>
                    <Carousel>
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
                <div>
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
            <div className="mb-24 mx-8">
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