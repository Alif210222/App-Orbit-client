import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
import useAxiosSecure from "../../hooks/useAxiosSecure";





const  Register =()=> {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const {createUser,updateUserProfile} = use(AuthContext)
   const [profilePic, setProfilePic] = useState('')
   const navigate = useNavigate()
   const axiosSecure = useAxiosSecure()

   console.log(profilePic)




  // handle submit form
  const onSubmit = (data) => {
    // console.log("Registration Data:", data);
            
    const email = data.email;
    const pass = data.password;
    const displayName = data.name;
    // console.log(email,pass,displayName)
    // TODO: send data to your server / firebase
         createUser(email,pass)
         .then( async(res) => {
              console.log(res.user)

         //user data send to database 
        const userInfo = {
          email:email,
          role:"user",
          created_at:new Date().toISOString(),
          last_log_in:new Date().toISOString(),
        }
         
        // console.log(userInfo)

        const userResult = await axiosSecure.post("/users",userInfo)
        console.log(userResult.data)



        // user profile update 
           const userData = {
            displayName,
            photoURL: profilePic
          
           }

          updateUserProfile(userData)
            .then(()=>{
            console.log("profilwepic update ")
          })
          .catch(error =>{
            console.log(error)
          })
              // navigate
               navigate("/")

         })
         .catch(error =>{
          console.log(error.message)
         })
       


  };


const handleImageUpload = async(e) =>{
     const image  = e.target.files[0];
        // console.log(image)
        const formData = new FormData();
        formData.append("image", image)

         const res = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_key}`, formData) 
        console.log(res.data.data.url)
        setProfilePic(res.data.data.url)

}





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <fieldset>

         
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="Enter Your Email"
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="********"
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="file"
               name="image" 
               onChange={handleImageUpload}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white focus:outline-none"
              placeholder="Upload Your Photo"
            />
            {errors.photo && <p className="text-red-300 text-sm mt-1">{errors.photo.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-6 cursor-pointer bg-white text-black font-bold rounded-md hover:bg-gray-200 transition"
          >
            Register
          </button>
           </fieldset>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Register;