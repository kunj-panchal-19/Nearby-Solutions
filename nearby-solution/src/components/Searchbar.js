// src/components/SearchBar.js
import axios from "axios";
import React, { useState } from 'react';

const SearchBar = ({ onSearch,latitude,longitude,setLatitude,setLongitude,load,setLoad}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const options = {
    method: 'GET',
    url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
    params: {address: searchTerm},
    headers: {
      'X-RapidAPI-Key': 'c530f561a6mshb93872b7d4ee5cdp138f66jsn385768ab12b0',
      'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
    }
  };
  const gettingLocationofSearch = async ()=>{
    setLoad(false);
    const response = await axios.request(options);
    const newlatitude=response.data.Results[0].latitude
    const newlongitude=response.data.Results[0].longitude
    setLatitude(newlatitude);
    setLongitude(newlongitude);
    setLoad(true);
  }
  const handleSearch = () => {
    // Pass the search term to the parent component for handling
    gettingLocationofSearch();
    // if(searchCoardinates){
    //     setMarkers((prevmarkers)=>[...prevmarkers,searchCoardinates]);
    // }
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="bg-blue-950 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-950 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
