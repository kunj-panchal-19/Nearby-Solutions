import React, { useEffect, useState } from 'react';
import connectionString from "../components/connectionString";
import { useNavigate } from "react-router-dom";

const StarRating = ({ label, rating, setRating}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <svg
            name={label}
            onClick={() => {setRating(value)}}
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

const Feedback = () => {
  const [overallSatisfaction, setOverallSatisfaction] = useState(0);
  const [qualityOfService, setQualityOfService] = useState(0);
  const [timeliness, setTimeliness] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [professionalism, setProfessionalism] = useState(0);
  const navigate = useNavigate();
  const service_id=sessionStorage.getItem('id');
  const [error,setError]=useState(false);
  const [feedback, setFeedback] = useState({
    likedMost: '',
    improvement: '',
    recommendation: '',
    additionalComments: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sending_data = {
       "Overall_Satisfaction": overallSatisfaction,
       "Quality_Service":qualityOfService,
      "Timeliness":timeliness,
      "Communication":communication,
      "Professionalism":professionalism,
      "Improve":feedback.improvement,
      "service_id":service_id
    };
    const result = await fetch(`${connectionString}registerfeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sending_data),
    });
    const data = await result.json();
    setError(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      alert('Feedback submitted successfully!');
      navigate("/search");
    
  };

  return (
    <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Service Provider Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <StarRating label="Overall_Satisfaction" rating={overallSatisfaction} setRating={setOverallSatisfaction}  />
        <StarRating label="Quality_Service" rating={qualityOfService} setRating={setQualityOfService}  />
        <StarRating label="Timeliness" rating={timeliness} setRating={setTimeliness}  />
        <StarRating label="Communication" rating={communication} setRating={setCommunication}  />
        <StarRating label="Professionalism" rating={professionalism} setRating={setProfessionalism}  />
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="likedMost">What did you like most about the service provided?</label>
          <textarea
            id="likedMost"
            name="likedMost"
            value={feedback.likedMost}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="improvement">What could be improved?</label>
          <textarea
            id="improvement"
            name="improvement"
            value={feedback.improvement}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommendation">Would you recommend this service provider to others? Why or why not?</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={feedback.recommendation}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalComments">Any additional comments or suggestions:</label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={feedback.additionalComments}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
