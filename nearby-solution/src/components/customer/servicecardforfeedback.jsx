import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myImage from '../../images/myImage.jpg'; // Adjust the path to your image file
import connectionString from '../connectionString';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login';


const ServiceCardForFeedback = ({ id }) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [distance, setDistance] = useState(null);
  const [ObjectId,setId]=useState("");
  useEffect(() => {

    const fetchServiceDetails = async () => {
      try {
        // Fetch additional details for the service using the provided ID
        const response = await axios.get(`${connectionString}api/services/${id}`);
        setServiceDetails(response.data);
        sessionStorage.setItem("id",response.data._id);
        sessionStorage.setItem("s_name",response.data.name);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    
    fetchServiceDetails();
    // console.log(serviceDetails.location.coordinates)
    // debugger;
  }, [id]); // Fetch details when ID changes
  useEffect(() => {
    if (serviceDetails) {
      console.log(serviceDetails);
      console.log(serviceDetails.location.coordinates);
    }
  }, [serviceDetails]);

  return (
    <div className=" bg-slate-300 rounded-xl drop-shadow-2xl justify-self-center w-full relative overflow-hidden">
       {serviceDetails && <a href="#" className="group relative block bg-black">
        <img
          alt="image"
          // src="https://firebasestorage.googleapis.com/v0/b/uplaodfile-749db.appspot.com/o/files%2Fpic1.jpg?alt=media&token=551245c7-6c83-4dce-8964-f579f6511546"
          src={serviceDetails.photo}
          // src={myImage}
          className="absolute inset-0 h-full  w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          
            <>
              <div className="mt-32 sm:mt-48 lg:mt-64">
                <div
                  className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                >
                       <p className='text-sm font-bold uppercase tracking-widest text-black'>Overall rating</p>
                  <p className="text-sm text-white font-semibold">{serviceDetails.totalRating/serviceDetails.numberOfFeedbacks}/5</p>

                  <p className='text-sm font-bold uppercase tracking-widest text-black'>Description</p>
                  <p className="text-sm text-white font-semibold">{serviceDetails.description}</p>
                </div>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-black">Category</p>
              <p className="text-xl font-bold text-white sm:text-2xl">{serviceDetails.category}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-black">Product name</p>
              <p className="text-xl font-bold text-white sm:text-2xl">{serviceDetails.name}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-black">Price</p>
              <p className="text-xl font-bold text-white sm:text-2xl">{serviceDetails.price}</p>
              <p className="text-sm font-bold uppercase tracking-widest text-black">Rated for</p>
              <p className="text-xl font-bold text-white sm:text-2xl">{serviceDetails.ratedFor}</p>
              <div className='flex justify-between justify-items-center'>
                <span className='text-sm font-bold text-white'>{distance} </span>
                
{/*             
              <Link 
                to ='/showfeedback' 
                className="inline-flex drop-shadow-2xl items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Get Feedback
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link> */}
              </div>
            </>
          
        </div>
      </a>
        }
    </div>
  )
}

export default ServiceCardForFeedback;
