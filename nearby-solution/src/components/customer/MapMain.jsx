import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import connectionString from '../connectionString';
import axios from 'axios';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the ClipLoader spinner

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const StarRating = ({ label, rating, setRating }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <svg
            key={value}
            onClick={() => setRating(value)}
            className={`w-6 h-6 cursor-pointer ${value <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927C9.36 2.021 10.64 2.021 10.951 2.927l1.1 3.392a1 1 0 00.95.691h3.515c.969 0 1.371 1.24.588 1.81l-2.848 2.074a1 1 0 00-.364 1.118l1.1 3.392c.309.957-.755 1.742-1.54 1.19L10 13.981l-2.951 2.136c-.784.552-1.848-.233-1.54-1.19l1.1-3.392a1 1 0 00-.364-1.118L3.397 8.82c-.783-.57-.38-1.81.588-1.81h3.515a1 1 0 00.95-.691l1.1-3.392z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

const MapMain = () => {
  const [rating, setRating] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation();
  const props = location.state;

  const storeFeedBack = async () => {
    try {
      const response = await axios.post(`${connectionString}storeFeedback`, {
        id: props.id,
        rating: rating,
      });
      console.log(response.data);
      toast.success('Feedback stored successfully!');
    } catch (error) {
      console.error('Error storing feedback:', error);
      toast.error('Failed to store feedback. Please try again.');
    }
  };

  const Caliber = () => {
    return new Promise((resolve, reject) => {
      const successCallback = (position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log('New coordinates:', long, lat);
        resolve({ long, lat });
      };

      const errorCallback = (error) => {
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Start loading

        const { long, lat } = await Caliber();
        console.log('Current coordinates:', lat, long);

        const url = `https://trueway-directions2.p.rapidapi.com/FindDrivingPath?origin=${lat}%2C${long}&destination=${props.props[0]}%2C${props.props[1]}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'c530f561a6mshb93872b7d4ee5cdp138f66jsn385768ab12b0',
            'X-RapidAPI-Host': 'trueway-directions2.p.rapidapi.com',
          },
        };

        const response = await fetch(url, options);
        const result = await response.text();
        const myData = JSON.parse(result);
        console.log('Route data:', myData);
        setRouteCoordinates(myData.route.geometry.coordinates);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false); // Finish loading, whether successful or error
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color={'#123abc'} loading={loading} css={override} size={150} />
        </div>
      ) : (
        <>
          {routeCoordinates.length > 0 && (
            <>
              <MapContainer className="h-1/3 w-2/3" center={routeCoordinates[parseInt(routeCoordinates.length / 2)]} zoom={15} style={{ height: '500px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={routeCoordinates} color="blue" weight={5} />
              </MapContainer>

              <StarRating className="my-5" label={'Provide Feedback'} rating={rating} setRating={setRating} />

              <button
                className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={storeFeedBack}
              >
                Submit
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MapMain;
