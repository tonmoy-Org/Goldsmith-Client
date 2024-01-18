import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import google from '../../../assets/icon/google.jpg';
import facebook from '../../../assets/icon/fb.png';
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../../firebase/firebase.config";
import Swal from 'sweetalert2'; // Import SweetAlert2 library if not imported already

const SocialLogIn = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const newUser = result.user;
                console.log(newUser);
                const saveUser = { name: newUser.displayName, email: newUser.email }
                fetch('https://goldsmith-server-5v7skvcoj-tonmoy-org.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "User successfully login.",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const handleFacebookLogin = () => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const loggedUserFacebook = result.user;
                console.log(loggedUserFacebook);

                const saveUser = { name: loggedUserFacebook.displayName, email: loggedUserFacebook.email };
                fetch('https://goldsmith-server-5v7skvcoj-tonmoy-org.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
                    .catch((error) => console.log(error));
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <div className="text-center mb-5">
            <button onClick={handleGoogleLogin} className="mr-6 transform transition duration-300 ease hover:-translate-y-1 hover:scale-95"><img className="w-10 mx-auto rounded-full" src={google} alt="" /></button>
            <button onClick={handleFacebookLogin} className="transform transition duration-300 ease hover:-translate-y-1 hover:scale-95"><img className="w-10 mx-auto rounded-full" src={facebook} alt="" /></button>
        </div>
    );
};

export default SocialLogIn;
