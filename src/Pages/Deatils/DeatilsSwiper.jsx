import useJewelry from "../../hooks/useJewelry";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import view from '../../assets/icon/view.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const DetailsSwiper = () => {
    const [, refetch] = useCart();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/login";

    const [jewelry] = useJewelry();
    const slicedJewelry = jewelry.slice(0, 6);

    const showModal = (_id, name, description, categories, tags, image) => {
        const modal = document.getElementById(`my_modal_${_id}`);

        if (modal) {
            modal.showModal();
            // Set the item's name in the modal
            modal.querySelector(".modal-box h3").innerText = name;
            modal.querySelector(".modal-box .item-description").innerText = `Description: ${description}`;
            modal.querySelector(".modal-box .item-categories").innerText = `Categories: ${categories}`;
            modal.querySelector(".modal-box .item-tags").innerText = `Tags: ${tags}`;
            const imgElement = modal.querySelector(".modal-box .item-image");
            imgElement.src = image;
        }
    }

    const handleAddToCart = (data) => {
        const { _id, name, price, image } = data;
        if (!user) {
            navigate(from, { replace: true });
            return;
        }
        const cartItem = { price, name, image, item: _id, email: user?.email, userName: user?.displayName }
        fetch('https://goldsmith-server.vercel.app/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    refetch();// refetch cart to update the number of items in the cart
                    Swal.fire({
                        icon: 'success',
                        title: 'Item added on the cart.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const slicedJewelryItems = slicedJewelry.map((data, index) => (
        <SwiperSlide key={index}>
            <div className='mt-2 lg:mt-0 lg:mx-0'>
                <div className="relative lg:w-12/12 overflow-hidden">
                    <div className="group relative">
                        <div className="flex flex-col justify-center">
                            <img
                                className="w-full h-full transform scale-100 group-hover:scale-110 transition duration-700 ease-in-out"
                                src={data.image}
                                alt={`Jewelry ${index + 1}`}
                            />
                             <div className="absolute inset-x-0 top-4 right-0 left-24 lg:left-[250px] bottom-0 opacity-0 transform translate-x-full  group-hover:translate-x-0 group-hover:opacity-100 transition duration-700 ease-in-out">
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn rounded-full bg-white py-[7px] px-4 transition-opacity" onClick={() => showModal(data._id, data.name, data.description, data.categories, data.tags)}>
                                    <img className='w-6' src={view} alt="" />
                                </button>
                                <dialog id={`my_modal_${data._id}`} className="modal">
                                    <div className="modal-box lg:max-w-5xl rounded-none p-0 w-11/12">
                                        <div className='grid lg:grid-cols-2 gap-4'>
                                            <div className='flex' style={{ width: '100%', height: 'auto' }}>
                                                <Carousel className='w-[290px] lg:w-10/12 mx-auto mt-8'>
                                                    <div>
                                                        <img src={data.items.img1} style={{ width: '100%', height: 'auto' }} />
                                                    </div>
                                                    <div>
                                                        <img src={data.items.img2} style={{ width: '100%', height: 'auto' }} />
                                                    </div>
                                                    <div>
                                                        <img src={data.items.img3} style={{ width: '100%', height: 'auto' }} />
                                                    </div>
                                                </Carousel>
                                            </div>
                                            <div className='p-4'>
                                                <h1 className="font-semibold text-2xl mt-5">{data.name}</h1>
                                                <h2 className='py-3 text-base-400 text-xl'>${data.price}</h2>
                                                <p className="item-description py-4 text-[#7D7D7D]">{data.description}</p>
                                                <div className='pt-3'>
                                                    {Array.isArray(data.categories) ? (
                                                        <p className="item-categories font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Categories: </span> {data.categories.join(", ")}</p>
                                                    ) : (
                                                        <p className="item-categories font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Categories: </span>{data.categories}</p>
                                                    )}
                                                </div>
                                                <div className='pt-3'>
                                                    {Array.isArray(data.tags) ? (
                                                        <p className="item-tags font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Tags: </span>{data.tags.join(", ")}</p>
                                                    ) : (
                                                        <p className="item-tags font-semibold text-black"><span className='text-[#7D7D7D] text-[18px]'>Tags: </span>{data.tags}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in the form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-0">✕</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 text-center opacity-0 transform translate-y-2/4 group-hover:translate-y-0 group-hover:opacity-100 transition duration-700 ease-in-out">
                                <button onClick={() => handleAddToCart(data)} className="bg-black text-white py-2 px-4 w-full transition-opacity">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-[17px] font-semibold">{data.name}</h2>
                    <p className="text-[16px] text-orange-400 pt-2">${data.price}</p>
                </div>
            </div>
        </SwiperSlide>
    ));

    return (
        <div>
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                // navigation={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper"
            >

                {slicedJewelryItems}
            </Swiper>
        </div>
    );
};

export default DetailsSwiper;
