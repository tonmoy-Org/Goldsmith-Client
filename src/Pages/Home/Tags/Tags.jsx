import tag1 from '../../../assets/brands/tag-1.png'
import tag2 from '../../../assets/brands/tag-2.png'
import tag3 from '../../../assets/brands/tag-3.png'
import tag4 from '../../../assets/brands/tag-4.png'

const Tags = () => {
    return (
        <div className='my-16'>
            <div className='lg:flex gap-16 w-11/12 mx-auto '>
                <div className='text-center mb-8'>
                    <img className='w-16 mx-auto mb-6' src={tag1} alt="" />
                    <h2 className='text-2xl font-bold'>Amazing Value Every Day</h2>
                    <p className='text-base-content mt-3'>Items prices that fit your budget</p>
                </div>
                <div className='text-center mb-8'>
                    <img className='w-16 mx-auto mb-6' src={tag2} alt="" />
                    <h2 className='text-2xl font-bold'>Successful Customer Service</h2>
                    <p className='text-base-content mt-3'>We work with a focus on 100% customer satisfaction.</p>
                </div>
                <div className='text-center mb-8'>
                    <img className='w-16 mx-auto mb-6' src={tag3} alt="" />
                    <h2 className='text-2xl font-bold'>All Payment Methods</h2>
                    <p className='text-base-content mt-3'>Don't bother with payment details.</p>
                </div>
                <div className='text-center'>
                    <img className='w-16 mx-auto mb-6' src={tag4} alt="" />
                    <h2 className='text-2xl font-bold'>Completely free shipping</h2>
                    <p className='text-base-content mt-3'>We'll handle the shipping.</p>
                </div>
            </div>
        </div>
    );
};

export default Tags;