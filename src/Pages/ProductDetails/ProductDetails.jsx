// ✅ ProductDetails.jsx - Display single product details with upvote & report

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaHeart, FaFlag } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddReview from './AddReview';
import { useQuery } from '@tanstack/react-query';

import ReviewSlider from './ReviewSlider';
import Loading from '../../Components/Loading/Loading';

const ProductDetails = () => {
  const { id } = useParams();
  const { user,loading } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
//    const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();


   // product review   get api  
 const { data: reviews = [], refetch, isLoading } = useQuery({
  queryKey: ['reviews', id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/reviews/${id}`);
    return res.data;
  },
  enabled: !!id, // wait until `id` is available
});








  // product details get api 
  useEffect(() => {
     if(!loading){

    axiosSecure.get(`/productDetails/${id}`)
      .then((res) => setProduct(res.data))
       
      .catch((err) => console.error(err));
   }

  }, [id, axiosSecure,loading]);




 
  const handleUpvote = async (id) => {
         console.log("vole")
      
    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/upvote/${id}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
       setProduct((prev) => ({
        ...prev,
             vote_count: (prev.vote_count || 0) + 1,
              voted: true,
      }));
      }
    }  catch (error) {
      console.error('Upvote failed:', error);
    }
  };


  // handle report  count
  const handleReport = async (id,status) => {
    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/report/${id}`, {
        userEmail: user.email,
        report_status: status,
        
      });


      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Reported!',
          text: 'The product has been reported successfully.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Report failed:', error);
    }
  };


//   if (loading || !product) {
//   return <p className="text-white text-center mt-20 min-h-screen">Loading....</p>;
// }
 if (loading || !product) {
  return  <Loading></Loading>;
}


  
  return (
    <div className='min-h-screen max-w-6xl mx-auto  py-10'>

  
    <div className=" max-w-5xl mx-auto px-6 py-10 mb-20 text-white  ">

         <h2 className="text-3xl font-bold text-white mb-14 text-center mt-10">Product Details</h2>
      <div className= " md:flex gap-6  bg-blue-950 p-6 rounded-lg shadow-lg border border-white/20 ">
       <div> 
             <img src={product.image} alt={product.productName} className="w-full h-72 object-cover rounded-lg mb-6" />
       </div>
       <div> 

        <h2 className="text-3xl font-bold mb-2 capitalize">{product.productName}</h2>
        <p className="text-lg mb-4 text-gray-300">{product.description}</p>

        <div className="mb-4 flex flex-wrap gap-2 mt-14">
          {product.tags.map((tag, index) => (
            <span key={index} className="bg-[#1d80d1]/30 px-3 py-2 text-sm rounded-full">#{tag}</span>
          ))}
        </div>

        <div className='mt-6'>
            <p className="text-lg font-semibold  text-gray-300" >Added By : <span className='font-normal'>{product.ownerName}  </span> </p>
        </div>
       <p className="text-lg font-semibold mb-4 text-gray-300" >Votes : <span className='font-normal'>{product.vote_count || 0}  </span> </p>
       {/* <p className="text-lg font-semibold mb-3  text-gray-300" >Report Count : <span className='font-normal'> {product.report_count || 0}  </span> </p> */}
<div className='flex justify-between gap-21 items-center'>
  
        <a
          href={`https://${product.externalLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9bb6e0] font-semibold  inline-block border p-2  rounded-lg"
        >
          Visit  Site
        </a>
      

        <div className="space-y-3 md:flex gap-4 justify-between items-center ">
          <button
            onClick={()=> handleUpvote(product._id)}
            className="flex items-center gap-2   text-[#9bb6e0] border-1 cursor-pointer hover:bg-blue-600/20 px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={user?.email === product.ownerEmail || product.voted}
          >
            <FaHeart /> {product.vote_count || 0} Upvotes
          </button>

          <button
            onClick={() => handleReport(product._id,"reported" )}
            className="flex items-center gap-2 border-1 border-yellow-500 cursor-pointer hover:bg-yellow-600/30 px-4 py-2 mb-2 rounded-lg"
            disabled={product.report_status === 'reported'}
          >
            <FaFlag /> Report Product
          </button>
        </div>

          </div>
       </div>
    </div>   
 </div>
                                                {/* product review section */}
     
                 <div className='max-w-md mx-auto mb-28'>
                    <h2 className="text-3xl font-bold text-white mb-6 text-center ">product Review</h2>
                    <p className='text-center text-gray-300'> You can see the product review here  </p>
                    <ReviewSlider productId={id} reviews={reviews}></ReviewSlider>
                 </div>

                                                 {/* review add section  */}

                <div className='max-w-3xl mx-auto mb-10'>

                     <h2 className="text-3xl font-bold text-white mb-6 text-center">Add Review</h2>
                      <p className='text-center text-gray-400'>You can add review about this product that helps to others people ensure this products quality and work ability. </p>
                    <AddReview refetch={refetch}></AddReview>
                    
                </div>            

      </div>
  );
};

export default ProductDetails;
