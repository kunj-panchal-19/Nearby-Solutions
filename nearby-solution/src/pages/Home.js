import React, { useContext, useEffect } from 'react';
import { authContext } from '../context/context';
import Navbar from '../components/Layout/Navbar';
import { Link } from 'react-router-dom';
import Map from './Map';

const Home = () => {
  const { currentUser } = useContext(authContext);

  useEffect(() => {
    sessionStorage.removeItem('id');
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 p-4">
        <Map className="w-full h-64 md:h-full" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-blue-950 mb-4">NearMe</h1>
        <p className="text-lg text-gray-700 mb-8">Connect with services and products nearby</p>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-700">Popular Categories</h2>
          <ul className="flex flex-wrap">
            <li className="text-lg text-gray-700 mr-4 mb-2">Food</li>
            <li className="text-lg text-gray-700 mr-4 mb-2">Electronics</li>
            <li className="text-lg text-gray-700 mr-4 mb-2">Fashion</li>
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full md:w-96 mb-8">
            <h2 className="text-xl font-bold mb-4">New Here?</h2>
            <p className="text-lg mb-6">Register as a business owner to access exclusive features.</p>
            <Link to="/sign-up">
            <button
              className="bg-blue-950 my-2 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0">
              
              Register
            </button>
            </Link>
            &nbsp;

            <Link to="/search">
            <button
              className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
              Start Searching...
            </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
