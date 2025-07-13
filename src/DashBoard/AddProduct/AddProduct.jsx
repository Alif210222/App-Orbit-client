import React, { use, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import { toast } from 'react-toastify';

// ... [Keep other code unchanged]
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [productImage, setProductImage] = useState("");
  const [userInfo, setUserInfo] = useState(null); // ✅ user info
  
//   console.log(userInfo)
  const [userProducts, setUserProducts] = useState([]); // ✅ products by current user


//   tag related code 
//handle delete tag
const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    const movedTag = newTags.splice(currPos, 1)[0];
    newTags.splice(newPos, 0, movedTag);
    setTags(newTags);
  };





  // ✅ Fetch user info from DB
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/userData/${user?.email}`).then(res => {
        setUserInfo(res.data);
         console.log(res.data)
        
      });

      axiosSecure.get(`/productsData?email=${user?.email}`).then(res => {
        setUserProducts(res.data || []);
      });
    }
  }, [user?.email, axiosSecure]);

  // ✅ Main Submit Handler
  const onSubmit = async (data) => {
    console.log("submit btn click")
    // if (!userInfo) return;

    console.log("user info asce")

    // ✅ Enforce 1-product limit for non-verified users
    if (userInfo.role === 'user' && userInfo.membership_status !== 'verified' && userProducts.length >= 1) {
      toast.error("🚫 Your free product posting limit is over. Please subscribe for unlimited access.");
      return;
    }

    const productData = {
      productName: data.productName,
      description: data.description,
      externalLink: data.externalLink,
      tags: tags.map(tag => tag.text),
      product_status: "pending",
      ownerName: user.displayName,
      ownerEmail: user.email,
      ownerImage: user.photoURL,
      createdAt: new Date().toISOString(),
      image: productImage,
    };

    axiosSecure.post("/products", productData)
      .then(res => {
        // console.log("data added", res.data)
        if (res.data.insertedId) {
          toast.success('✅ Product added successfully!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
          });
          reset();
          navigate("/dashboard/myProduct");
        }
      });
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_upload_key}`, formData);
    console.log(res.data.data.url)
    setProductImage(res.data.data.url);
  };

  return (
   <div className="max-w-3xl mx-auto   mt-10  bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-white border border-white/20      ">
     
      <h2 className="text-3xl font-bold mb-6 text-center">Add Your Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="font-medium">Product Name *</label>
          <input
          type='text'
            {...register("productName", { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded"
            placeholder="Enter product name"
          />
          {errors.productName && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Product Image */}
        <div>
          <label className="font-medium">Product Image URL *</label>
          <input
          type="file"
          name="image"
          onChange={handleImageUpload}
            // {...register("image", { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded"
            placeholder="Enter image URL"
          />
          {/* {errors.image && <p className="text-red-500 text-sm">This field is required</p>} */}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description *</label>
          <textarea 
          type="text"
            {...register("description", { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded"
            rows={4}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">This field is required</p>}
        </div>

        {/* Tags */}
          <div >
          <label className="font-medium border-b-2  ">Tags</label>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Enter tags"
            classNames={{
              tags: 'border rounded px-2 py-1  text-white',
              tagInputField: 'w-full border-none outline-none px-2 py-1',
              selected: 'flex flex-wrap gap-2',
              tag: 'bg-blue-500 text-white px-2 py-1 rounded',
              remove: 'ml-2 cursor-pointer text-sm',
            }}
            
            
          />
        </div>

        {/* External Link */}
        <div>
          <label className="font-medium">External Link</label>
          <input
            {...register("externalLink")}
            className="w-full mt-1 px-4 py-2 border rounded"
            placeholder="https://product-site.com"
          />
        </div>

        {/* Read-only Owner Info */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="font-medium">Owner Name</label>
            <input
              value={user?.displayName}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded "
            />
          </div>
          <div>
            <label className="font-medium">Owner Email</label>
            <input
              value={user?.email}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded "
            />
          </div>
          <div>
            <label className="font-medium">Owner Image</label>
            <input
              value={user?.photoURL}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded "
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-semibold transition"
          >
            Submit Product 
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;











