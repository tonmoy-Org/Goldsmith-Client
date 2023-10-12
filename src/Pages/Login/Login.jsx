import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                setError(error.message);
                console.error(error.message);
            })
    }
    return (
        <div className="hero min-h-[100vh] bg-base-200">

            <div className="hero-content flex-col lg:w-6/12">

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">Login now</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                    <small className='text-blue-600' onClick={() => setShow(!show)}>
                                        <>
                                            {
                                                show ? <span>Hide</span> : <span>Show</span>
                                            }
                                        </>
                                    </small>
                                </label>
                                <input type={show ? "text" : "password"}  {...register("password", { required: true, minLength: 6, maxLength: 20 })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <span className="text-red-600">This field is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-success text-white" type="submit" value="SignUp" />
                            </div>
                        </form>
                        <br />
                        <div>

                        </div>
                        <div>
                            <p>New to Goldsmith ? <Link className="text-primary" to="/signUp">Sign in</Link></p>
                            <p className="text-red-600 py-3">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;