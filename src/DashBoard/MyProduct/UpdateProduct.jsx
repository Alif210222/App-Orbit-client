// ✅ UpdateProduct.jsx (Client-side update form with default values and tags)

import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { WithContext as ReactTags } from 'react-tag-input';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];



const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);



  // product data load from database 

  useEffect(() => {
    axiosSecure
      .get(`/productDetails/${id}`)
      .then((res) => {
        setProduct(res.data);
        reset(res.data); // set default values
        setTags((res.data.tags || []).map(tag => ({ id: tag, text: tag })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, id, reset]);





  //tag delete
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
// tag adding
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    const movedTag = newTags.splice(currPos, 1)[0];
    newTags.splice(newPos, 0, movedTag);
    setTags(newTags);
  };


  // updated data send to data base 
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      tags: tags.map(tag => tag.text),
    };
    try {
      const res = await axiosSecure.put(`/updateProduct/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
                        icon: "success",
                        title: "product updated Successful",
                        text: "Your product information has been saved successfully.",
                   })
        navigate('/dashboard/myProduct');
      } else {
        toast.warn('No changes were made');
      }
    } catch (error) {
      toast.error('Failed to update product',error);
    }
  };


  if (!product) return <Loading></Loading>

  return (
    <div className="max-w-3xl min-h-screen mb-10 mx-auto mt-10 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-white border border-white/20">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* product name  */}
        <div>
          <label className="font-medium">Product Name *</label>
          <input
            type="text"
            {...register('productName', { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded text-white"
            placeholder="Enter product name"
          />
        </div>
 {/* product image  */}
        <div>
          <label className="font-medium">Product Image URL *</label>
          <input
            type="text"
            {...register('image', { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded text-white"
            placeholder="Image URL"
          />
        </div>
{/* product description   */}
        <div>
          <label className="font-medium">Description *</label>
          <textarea
            {...register('description', { required: true })}
            className="w-full mt-1 px-4 py-2 border rounded text-white"
            rows={4}
            placeholder="Enter product description"
          ></textarea>
        </div>
{/* product extarnel link  */}
        <div>
          <label className="font-medium">External Link</label>
          <input
            {...register('externalLink')}
            className="w-full mt-1 px-4 py-2 border rounded text-white"
            placeholder="https://product-site.com"
          />
        </div>
{/* product tag  */}
        <div>
          <label className="font-medium">Tags</label>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="bottom"
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
{/* product owner name  */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="font-medium">Owner Name</label>
            <input
              value={user?.displayName}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded text-white"
            />
          </div>
          {/* product email */}
          <div>
            <label className="font-medium">Owner Email</label>
            <input
              value={user?.email}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded text-white"
            />
          </div>
          {/* product image */}
          <div>
            <label className="font-medium">Owner Image</label>
            <input
              value={user?.photoURL}
              readOnly
              className="w-full mt-1 px-4 py-2 border rounded text-white"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-semibold transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
