import { useForm } from "react-hook-form";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { use, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const {register,handleSubmit,formState: { errors },} = useForm();
  const {loginUser} = use(AuthContext)
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");


  // Email/Password Login
  const onSubmit = (data) => {
    const { email, password } = data;
    setFirebaseError("");

    loginUser(email, password)
      .then((result) => {
        // console.log("User logged in:", result.user);
         toast("Registation Successful!") 

        navigate("/"); // Redirect to homepage

      })
      .catch((error) => {
        console.error("Login error:", error);
        setFirebaseError(error.message);
      });
  };

  // Google Sign In
  const handleGoogleLogin = () => {
    setFirebaseError("");

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google sign-in:", result.user);

        navigate("/"); // Redirect to homepage
      })
      .catch((error) => {
        console.error("Google Login error:", error);
        setFirebaseError(error.message);
      });
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0a0400] via-[#231101] to-[#020018]    px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="********"
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Error message */}
          {firebaseError && <p className="text-red-300 text-sm text-center">{firebaseError}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-bold rounded-md hover:bg-gray-00 transition"
          >
            Log In
          </button>
        </form>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-300 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
