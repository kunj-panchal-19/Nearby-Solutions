import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './serviceCard'; // Assuming ServiceCard is another component
import connectionString from '../connectionString';
import { toast } from 'react-toastify';
import { FaSortAmountUp, FaSortAmountDown, FaDollarSign, FaStar } from 'react-icons/fa';

const SearchService = () => {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [distance, setDistance] = useState(5000);
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(10000000);
  const [serviceIds, setServiceIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLong(position.coords.longitude);
          setLat(position.coords.latitude);
        });
      } else {
        toast.error("Location services not supported by browser");
      }
    };
    sessionStorage.removeItem('id');
    getLocation();
  }, []);

  const handleDistanceChange = (e) => {
    const selectedDistance = e.target.value;
    switch (selectedDistance) {
      case 'less-than-1km':
        setDistance(1000);
        break;
      case '1km-to-5km':
        setDistance(5000);
        break;
      case '5km-to-10km':
        setDistance(10000);
        break;
      default:
        setDistance(5000);
    }
  };

  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    switch (selectedPrice) {
      case 'less-than-500':
        setPriceLow(0);
        setPriceHigh(500);
        break;
      case '500-to-1000':
        setPriceLow(500);
        setPriceHigh(1000);
        break;
      case '1000-to-10000':
        setPriceLow(1000);
        setPriceHigh(10000);
        break;
      case 'greater-than-10000':
        setPriceLow(10000);
        setPriceHigh(10000000);
        break;
      default:
        setPriceLow(0);
        setPriceHigh(10000000);
    }
  };

  const handleSearch = async () => {
    if (searchString.trim() === '') {
      setServiceIds([]);
      return;
    }

    try {
      const response = await axios.get(`${connectionString}services?searchString=${encodeURIComponent(searchString)}&long=${long}&lat=${lat}&distance=${distance}&priceLow=${priceLow}&priceHigh=${priceHigh}`);
      setServiceIds(response.data);
      setError(null);
    } catch (error) {
      console.error('Error searching for services:', error);
      setError('Error searching for services. Please try again.');
    }
  };

  const handleSortByDistance = () => {
    const sortedServices = [...serviceIds].sort((a, b) => a.distance - b.distance);
    setServiceIds(sortedServices);
  };

  const handleSortByPrice = () => {
    const sortedServices = [...serviceIds].sort((a, b) => a.price - b.price);
    setServiceIds(sortedServices);
  };

  const handleSortByRating = () => {
    const sortedServices = [...serviceIds].sort((a, b) => (b.totalRating / b.numberOfFeedbacks) - (a.totalRating / a.numberOfFeedbacks));
    setServiceIds(sortedServices);
  };

  return (
    <div className="container mx-auto p-4">
      <div className='bg-blue-950 my-4 px-4 py-2 backdrop-blur-sm drop-shadow-2xl rounded-md w-full'>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            id="search_string"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full md:w-2/3 p-2.5"
            placeholder="Search for services / products"
            required
          />
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2 bg-blue-900/55 text-white px-4 py-2 rounded-lg">
              <a data-tooltip-id='my-tooltip' data-tooltip-content={"Sort by distance"} onClick={handleSortByDistance}>
                <FaSortAmountDown />
              </a>
              <select id="distance-select" onChange={handleDistanceChange} className="bg-blue-900/55 text-white border-none outline-none">
                <option className='bg-blue-900' value="distance">Distance</option>
                <option className='bg-blue-900' value="less-than-1km">&lt; 1km</option>
                <option className='bg-blue-900' value="1km-to-5km">&lt; 5km</option>
                <option className='bg-blue-900' value="5km-to-10km">&lt; 10km</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-blue-900/55 text-white px-4 py-2 rounded-lg">
              <a data-tooltip-id='my-tooltip' data-tooltip-content={"Sort by price"} onClick={handleSortByPrice}>
                <FaDollarSign />
              </a>
              <select id="price" onChange={handlePriceChange} className="bg-blue-900/55 text-white border-none outline-none">
                <option className='bg-blue-900' value="price">Price</option>
                <option className='bg-blue-900' value="less-than-500">Less than 500</option>
                <option className='bg-blue-900' value="500-to-1000">500 to 1000</option>
                <option className='bg-blue-900' value="1000-to-10000">1000 to 10000</option>
                <option className='bg-blue-900' value="greater-than-10000">Greater than 10000</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-blue-900/55 text-white px-4 py-2 rounded-lg">
              <a data-tooltip-id="my-tooltip" data-tooltip-content="Sort by rating" onClick={handleSortByRating}>
                <FaStar />
              </a>
            </div>
            <button onClick={handleSearch} className="bg-blue-900/55 text-white px-4 py-2 rounded-lg">
              <a data-tooltip-id="my-tooltip" data-tooltip-content="Click to search">
                Search
              </a>
            </button>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid justify-center bg-blue-950/20 rounded-md backdrop-blur-sm drop-shadow-2xl grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-4 px-8 gap-6">
        {serviceIds.length > 0 ? (
          serviceIds.map(serviceId => <ServiceCard key={serviceId._id} id={serviceId._id} coordinates={serviceId.coordinates} />)
        ) : (
          <p className="text-white text-center col-span-full">Nothing to show here.</p>
        )}
      </div>
    </div>
  );
};

export default SearchService;
