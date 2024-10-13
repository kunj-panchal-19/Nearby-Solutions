import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import connectionString from '../connectionString';
import { IoInformationCircleSharp } from "react-icons/io5";
import { storage } from './firebase.js';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate("/");
        }
    }, [navigate]);    
    let long , lat;
    const Caliber=(e)=>{
        // console.log("asdf");
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((x)=>{
                long=x.coords.longitude;
                lat=x.coords.latitude;
                console.log(long)
                console.log(lat)
            })
        }
        else{
            toast.error("Location services not supported by browser")
        }

    }
    const u_id=sessionStorage.getItem('u_id');
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(undefined);
    const [ratedFor, setratedFor] = useState('')
    const [category, setcategory] = useState('')
    const [availibility, setAvailibility] = useState(false); // Initialize to false

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (file === undefined) {
                throw new Error("No file selected for upload.");
            }
    
            const fileRef = ref(storage, `files/${file.name}`);
    
            // Upload the file
            await uploadBytes(fileRef, file);
            alert("File uploaded successfully");
    
            // Get the download URL
            const url = await getDownloadURL(fileRef);
            console.log("Download URL", url);
    
            const item = {
                imageUrl: url
            };
            console.log(item);
    
            // Validate required fields
            if (!long || !lat) {
                throw new Error("Longitude and Latitude are required");
            }
    
            // Make POST request to backend API
            const response = await axios.post(`${connectionString}registerService`, {
                name: serviceName,
                user_id:u_id,
                description: description,
                photo: url,  // Ensure that the photo property is being correctly sent
                category: category,
                longitude: long,
                latitude: lat,
                ratedFor: ratedFor,
                availability: availibility,
                price: price
            });
            console.log(response);
            if (response.status !== 201) {
                throw new Error(`Failed to register service: ${response.statusText}`);
            }
    
            // Reset the form fields after successful submission
            setServiceName('');
            setPrice('');
            setDescription('');
            setFile(undefined);
            setcategory('');
            setratedFor('');
            setAvailibility(false);
    
            // Show success message
            toast.success("Your data has been added successfully");
        } catch (error) {
            console.error('Error adding service:', error);
            toast.error(`Error adding service: ${error.message}`);
        }
    };
    
   
    return (
        <>            
        <h1 className='text-3xl  font-bold text-center bold'>Add new service/ product</h1>
        <div className="top-0 left-0 flex justify-center items-center">
            <div className="bg-gray-100 bg-opacity-100 rounded-lg p-8 w-3/6 shadow-2xl ">

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="serviceName" className="block text-gray-700 font-bold mb-2">Service Name:</label>
                        <input
                            type="text"
                            id="serviceName"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            placeholder="Service Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            placeholder="Price"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category:</label>
                        <input
                            type="text"
                            id="category"
                            placeholder='clothing'
                            onChange={(e) => setcategory(e.target.value)}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Photo:</label>
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="ratedFor" className="block text-gray-700 font-bold mb-2">Rated For:</label>
                        <input
                            type="text"
                            id="ratedFor"
                            onChange={(e) => setratedFor(e.target.value)}
                            className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                            placeholder='6-50'
                            required
                        />
                    </div>
                    <div className='mb-4'>
  <input type='checkbox' id="availibility" checked={availibility} onChange={() => setAvailibility(!availibility)} required />
  <label htmlFor='availibility' className='block text-gray-700 font-bold mb-2 flex items-center'>
    Available 
    <a data-tooltip-id="my-tooltip" data-tooltip-content="Kindly provide details about availibility">
      <IoInformationCircleSharp className='ml-1' />
    </a>
  </label>
</div>
<div className='mb-4'>
  <input type='checkbox' id="location" onClick={Caliber} required />
  <label htmlFor='location' className='block text-gray-700 font-bold mb-2 flex items-center'>
    Allow location 
    <a data-tooltip-id="my-tooltip" data-tooltip-content="The location you are allowing must be your business location">
      <IoInformationCircleSharp className='ml-1' />
    </a>
  </label>
</div>
                    <button type="submit" className="bg-blue-950 text-white font-bold px-3 py-1 rounded hover:bg-blue-700">Add Service</button>
                </form>
            </div>
        </div>
        </>

    );
};

export default AddService;
