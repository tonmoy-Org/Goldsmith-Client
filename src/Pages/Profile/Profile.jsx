import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updateUserProfile, user, updateUserEmail } = useAuth();

    const api = import.meta.env.VITE_API_KEY;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${api}`;
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) {
            setError("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgRes) => {
                if (imgRes.success) {
                    const imgUrl = imgRes.data.display_url;
                    console.log(imgUrl);
                    updateUserProfile(user?.displayName, imgUrl);
                    Swal.fire({
                        title: 'Successfully Updated',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });  
                }
            })
            .catch((error) => {
                setError('Error while uploading the image. Please try again.');
                console.error('Error while uploading the image:', error);
            });
    };

    const onSubmit = (data) => {
        const updateInfo = data.name;
        const profileEmail = data.email;
        console.log(profileEmail);

        updateUserProfile(updateInfo);
        updateUserEmail(profileEmail);

        Swal.fire({
            title: 'Successfully Updated',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
        });
    };


    return (
        <div>
            <Helmet>
                <title>{`Profile - Mentoring`}</title>
            </Helmet>
            <div className="pb-16 text-center bg-base-300">
                <p className="pt-28">Home - My Account</p>
                <h1 className="mb-5 text-3xl font-semibold pt-4">My account</h1>
            </div>
            <div className="w-10/12 mx-auto my-16">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{user?.displayName}</h1>
                        <p>Your personal account</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 pt-4 gap-10">
                    <div>
                        <ul className="menu p-10  w-80 h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <Link className="mb-4" to='/'><li>Home</li></Link>
                            <Link to='/profile'><li>Profile</li></Link>
                        </ul>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    {...register("name", { required: true, minLength: 6, maxLength: 20 })}
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    {...register("email", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-success text-white" type="submit" value="Update Profile" />
                            </div>
                        </form>

                    </div>
                    <div className="ms-20">
                        <div className="avatar">
                            <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} />
                            </div>
                            <div className="absolute -bottom-10 left-0">
                                <div className="relative">
                                    <label
                                        htmlFor="fileInput"
                                        className="btn btn-xs"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                            />
                                            <circle cx="12" cy="12" r="3" fill="red" />
                                        </svg>
                                        Edit
                                    </label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="text-red-400">{error}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
