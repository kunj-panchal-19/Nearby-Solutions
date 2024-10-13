import React, { useEffect, useState } from 'react';
import connectionString from '../components/connectionString';
import axios from 'axios';

const ShowFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${connectionString}getfeedback?service_id=${sessionStorage.getItem('id')}&&name=${sessionStorage.getItem('s_name')}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Feedback Details</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <strong>Feedback id:</strong> {feedback._id}
          </div>
          <div className="mb-4">
            <strong>Overall Satisfaction:</strong> {feedback.Overall_Satisfaction}
          </div>
          <div className="mb-4">
            <strong>Quality of Service:</strong> {feedback.Quality_Service}
          </div>
          <div className="mb-4">
            <strong>Timeliness:</strong> {feedback.Timeliness}
          </div>
          <div className="mb-4">
            <strong>Communication:</strong> {feedback.Communication}
          </div>
          <div className="mb-4">
            <strong>Professionalism:</strong> {feedback.Professionalism}
          </div>
          
          <div className="mb-4">
            <strong>Improvement:</strong> {feedback.Improve}
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default ShowFeedback;
