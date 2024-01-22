import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
  } from "firebase/auth";
  import google from "../../../assets/icon/google.jpg";
  import facebook from "../../../assets/icon/fb.png";
  import { useLocation, useNavigate } from "react-router-dom";
  import app from "../../../firebase/firebase.config";
  import Swal from "sweetalert2";
  
  const SocialLogIn = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
  
    const location = useLocation();
    const navigate = useNavigate();
  
    const from = location.state?.from?.pathname || "/";
  
    const handleLoginSuccess = () => {
      navigate(from, { replace: true });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User successfully logged in.",
        showConfirmButton: false,
        timer: 1500,
      });
    };
  
    const handleLoginError = (error) => {
      console.error(error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    };
  
    const saveUserToServer = (user) => {
      const saveUser = { name: user.displayName, email: user.email };
  
      fetch("https://goldsmith-server.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
  
          // Check if the response content type is JSON
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            // Handle non-JSON response (e.g., display an error message)
            throw new Error("Non-JSON response from the server");
          }
        })
        .then(handleLoginSuccess)
        .catch((error) => {
          handleLoginError(error);
        });
    };
  
    const handleGoogleLogin = () => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const newUser = result.user;
          saveUserToServer(newUser);
        })
        .catch((error) => {
          handleLoginError(error);
        });
    };
  
    const handleFacebookLogin = () => {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          const loggedUserFacebook = result.user;
          saveUserToServer(loggedUserFacebook);
        })
        .catch((error) => {
          handleLoginError(error);
        });
    };
  
    return (
      <div className="text-center mb-5">
        <button
          onClick={handleGoogleLogin}
          className="mr-6 transform transition duration-300 ease hover:-translate-y-1 hover:scale-95"
        >
          <img className="w-10 mx-auto rounded-full" src={google} alt="" />
        </button>
        <button
          onClick={handleFacebookLogin}
          className="transform transition duration-300 ease hover:-translate-y-1 hover:scale-95"
        >
          <img className="w-10 mx-auto rounded-full" src={facebook} alt="" />
        </button>
      </div>
    );
  };
  
  export default SocialLogIn;
  