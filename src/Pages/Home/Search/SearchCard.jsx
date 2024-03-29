import Swal from 'sweetalert2';
import view from '../../../assets/icon/view.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';



const SearchCard = ({ data }) => {
    const { _id, image, name, price, description, categories, tags, items } = data;
    const [, refetch] = useCart();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/login";


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
        console.log(data)

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

    const [loading, setLoading] = useState(false);

    const handleReadMore = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate(`/details/${_id}`);
        }, 4000); // Replace with the actual API call
    };


    return (
        <div className='mt-2 lg:mt-0 lg:mx-0 mx-auto'>
            <div className="relative lg:w-64 overflow-hidden">
                <div className="group relative">
                    <div className="flex flex-col justify-center">
                        <img
                            className="w-full h-full transform scale-100 group-hover:scale-110 transition duration-700 ease-in-out"
                            src={image}
                            alt=""
                        />
                        <div className="absolute inset-x-0 top-4 right-0 left-24 lg:left-48 bottom-0 opacity-0 transform translate-x-full  group-hover:translate-x-0 group-hover:opacity-100 transition duration-700 ease-in-out">
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn rounded-full bg-white py-[7px] px-4 transition-opacity" onClick={() => showModal(_id, name, description, categories, tags)}>
                                <img className='w-6' src={view} alt="" />
                            </button>
                            <dialog id={`my_modal_${_id}`} className="modal p-0">
                                <div className="modal-box w-11/12 max-w-5xl rounded-none lg:p-6 p-0 mx-auto">
                                    <div className='grid lg:grid-cols-2 gap-4'>
                                        <div className='flex' style={{ width: '100%', height: 'auto' }}>
                                            <Carousel className='w-[290px] lg:w-10/12  mx-auto mt-8'>
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
                                        <div className='p-4'>
                                            <h1 className="font-semibold text-2xl mt-5">{name}</h1>
                                            <h2 className='py-3 text-base-400 text-xl'>${price}</h2>
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


                                            {loading ? (
                                                <div className="loader-overlay">
                                                    <div className="loader"></div>
                                                </div> // Replace with your loader component
                                            ) : (
                                                <div className='mt-10'>
                                                    <button className="bg-black text-white font-semibold py-2 px-7 border border-white hover:border-transparent rounded" onClick={handleReadMore}>
                                                        Read more
                                                    </button>
                                                </div>
                                            )}

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
                <h2 className="text-[17px] font-semibold">{name}</h2>
                <p className="text-[16px] text-orange-400 pt-2">${price}</p>
            </div>
        </div>

    );
};

export default SearchCard;
