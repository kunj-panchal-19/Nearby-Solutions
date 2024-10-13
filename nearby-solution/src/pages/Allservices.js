import { useEffect, useState } from 'react';
import connectionString from '../components/connectionString';
import ServiceCardForFeedback from '../components/customer/servicecardforfeedback';
import axios from 'axios';

const Allservices = () => {
  const [serviceIds, setServiceIds] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${connectionString}getallservices?userid=${sessionStorage.getItem('u_id')}`);
        setServiceIds(response.data);
        setFlag(true);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <h1 className="text-3xl shadow-xl font-bold text-center">My services</h1>
      <div
        className="grid justify-center rounded-md backdrop-blur-sm drop-shadow-2xl lg:grid-cols-3 grid-cols-1 md:grid-cols-2 py-4 px-8 gap-6"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
      >
        {flag ? (
          serviceIds.map((service) => (
            <ServiceCardForFeedback key={service._id} id={service._id} coordinates={service.coordinates} />
          ))
        ) : (
          <p className="text-white text-center col-span-full">Nothing to show here.</p>
        )}
      </div>
    </>
  );
};

export default Allservices;
