import React, { useState } from 'react';
import { Rating } from "@material-tailwind/react";
import { axiosInstance } from '../../../Api/axiosinstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import UserRootState from '../../../Redux/rootstate/UserState';





export  const Review: React.FC=() => {

  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const vendorId :string= queryParams.get('vid') as string;
  const user   = useSelector((state: UserRootState) => state.user.userdata);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const navigate=useNavigate();


  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };




  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!user){
      toast.error("please login first to add review.")
    }else{

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
  
    if (!review.trim()) {
      toast.error("Please enter a review.");
      return;
    }
    setRating(0);
    setReview('');

    
    axiosInstance
    .post(`/addVendorReview?vendorid=${vendorId}&&username=${user?.name}`, {content:review,rate:rating},{withCredentials:true})
    .then((response) => {
      console.log(response);
      toast.success(response.data.message)
      navigate(`/viewVendor?vid=${vendorId}`);
    })
    .catch((error) => {
      toast.error(error.response.data.message)
      console.log("here", error);
    });
  }
  };

  return (
    <div className="max-w-2xl mx-5 lg:mx-auto mt-20 p-8 bg-gray rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
          <Rating value={rating} onChange={handleRatingChange} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        </div>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
          <textarea id="review" name="review" rows={4} value={review} onChange={handleReviewChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="text-right ">
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </div>
      </form>
    </div>
  );
}