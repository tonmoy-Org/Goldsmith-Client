import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();

    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const validatePassword = (value) => {
        // Check for password length
        if (value.length < 6) {
            return "Password must be at least 6 characters long";
        }

        // Check for capital letter
        // if (!/[A-Z]/.test(value)) {
        //     return "Password must contain at least one capital letter";
        // }

        // // Check for special character
        // if (!/[!@#$%^&*()]/.test(value)) {
        //     return "Password must contain at least one special character";
        // }

        return true;
    };
    const onSubmit = (data) => {
        const passwordValidation = validatePassword(data.password);

        if (passwordValidation === true) {
            if (data.password === data.confirmPassword) {
                createUser(data.email, data.password)
                    .then((result) => {
                        const newUser = result.user;
                        console.log(newUser);
                        updateUserProfile(data.name, data.photoURL)
                            .then(() => {
                                const saveUser = { name: data.name, email: data.email, image: data.photoURL };
                                fetch('https://goldsmith-server-5v7skvcoj-tonmoy-org.vercel.app/users', {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                    body: JSON.stringify(saveUser),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if (data.insertedId) {
                                            navigate(from, { replace: true });
                                            reset();
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "User created successfully.",
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });

                                        }
                                    })
                                    .catch((error) => console.log(error));
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            } else {
                setError("Password didn't match, please try again.");
            }
        } else {
            setError(passwordValidation);
        }
    };

    return (
        <div>
            <div className="hero  min-h-[110vh] bg-base-200">
                <div className="hero-content">
                    <div className="card lg:w-[450px] flex-shrink-0 max-w-xl shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        name="name"
                                        placeholder="name"
                                        className="input input-bordered"
                                    />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo Url</span>
                                    </label>

                                    <input
                                        type="text"
                                        {...register("photoURL", { required: true })}
                                        placeholder="Photo URL"
                                        className="input input-bordered"
                                    />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                    />
                                    {errors.email && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                        <small className="text-blue-600" onClick={() => setShow(!show)}>
                                            {show ? <span>Hide</span> : <span>Show</span>}
                                        </small>
                                    </label>
                                    <input
                                        type={show ? "text" : "password"}
                                        {...register("password", { required: true })}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                    />
                                    {errors.password && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type={show ? "text" : "password"}
                                        {...register("confirmPassword", { required: true })}
                                        name="confirmPassword"
                                        placeholder="confirm password"
                                        className="input input-bordered"
                                    />
                                    {errors.confirmPassword && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <input className="btn btn-success text-white" type="submit" value="SignUp" />
                                </div>
                            </form>
                            <div className="py-3">

                            </div>
                            <div>
                                <p>
                                    Already a member? <Link className="text-primary font-semibold" to="/login">Login</Link>
                                </p>
                            </div>
                            <div className="text-red-400">{error}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;