import Swal from 'sweetalert2';
import delete1 from '../../assets/icon/delete.png';
import useCart from '../../hooks/useCart';

const CardItem = ({ data }) => {
    const { _id, image, name, price } = data;
    const [, refetch] = useCart();

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className="my-5">
            <div className="flex justify-between gap-6 p-2">
                <div>
                    <img className="w-24" src={image} alt="" />
                </div>
                <div className="">
                    <h2 className="">{name}</h2>
                    <p className='text-orange-400 py-2'>${price}</p>
                </div>
                <div>
                    <button onClick={() => handleDelete(_id)} className='btn btn-square'><img className='w-5 h-5' src={delete1} alt="" /></button>
                </div>
            </div>
        </div>
    );
};

export default CardItem;