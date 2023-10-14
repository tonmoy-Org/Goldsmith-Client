import Swal from 'sweetalert2';
import view from '../../../assets/icon/view.png'
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';


const JewelryCard = ({ data }) => {
    const { _id, image, name, price, description, categories, tags } = data;
    const [, refetch] = useCart();
    const { user } = useAuth();

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


    return (
        <div className='mt-2 lg:mt-0 lg:mx-0 mx-auto'>
            <div className="relative w-64 overflow-hidden ">
                <div className="group relative">
                    <div className="flex justify-center">
                        <img
                            className="w-full h-full transform scale-100 group-hover:scale-110 transition duration-700 ease-in-out"
                            src={image}
                            alt=""
                        />
                        <div className="absolute inset-x-0 top-4 right-0 left-48 bottom-0  opacity-0 transform translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition duration-700 ease-in-out">
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn rounded-full bg-white py-[7px] px-4 transition-opacity" onClick={() => showModal(_id, name, description, categories, tags)}>
                                <img className='w-6' src={view} alt="" />
                            </button>
                            <dialog id={`my_modal_${_id}`} className="modal">
                                <div className="modal-box w-11/12 max-w-5xl rounded-none">
                                    <div className='grid lg:grid-cols-2'>
                                        <div>
                                            <img src={image} alt="" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{name}</h3>
                                            <p className="item-description py-4">Description: {description}</p>
                                            {Array.isArray(categories) ? (
                                                <p className="item-categories">Categories: {categories.join(", ")}</p>
                                            ) : (
                                                <p className="item-categories">Categories: {categories}</p>
                                            )}
                                            {Array.isArray(tags) ? (
                                                <p className="item-tags">Tags: {tags.join(", ")}</p>
                                            ) : (
                                                <p className="item-tags">Tags: {tags}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm">Close</button>
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

export default JewelryCard;
