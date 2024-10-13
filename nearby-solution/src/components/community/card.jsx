import React, { useContext, useState } from "react";
import Answer from "./answer";
import axios from "axios";
import { ScholarshipContext } from "./../context/main";

const Card = ({ user, question, answer, tags, id }) => {
  const [newAnswer, setNewAnswer] = useState(""); // State for the new answer
    const {userData,setUpdate,update} = useContext(ScholarshipContext);
  const handleAddAnswer = async() => {
    const packet = {
        user_id:sessionStorage.getItem("id"),
        question_id:id,
        answer:newAnswer
    }
    // Logic to handle adding a new answer
    // This could involve sending the new answer to the backend or updating the state
    const res = await axios.post("http://localhost:5000/community/addAnswer",packet,{
        headers:{
            "Content-Type": "application/json"
        }
    })
    console.log(res.data);
    // Clear the input field after adding the answer
    setNewAnswer("");
    setUpdate(!update)
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md max-w-3xl hover:shadow-lg relative">
      {/* Questioner details */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <img
            className="w-full h-full object-cover"
            src={'images/mustu.jpg'}
            alt="Profile"
          />
        </div>
        <p className="text-lg font-bold">{user.name}</p>
      </div>

      {/* Question */}
      <div className="question bg-white text-black p-4 mb-4 rounded-lg shadow-md">
        <h3 className="text-purple-600 text-lg font-semibold mb-2">
          {question}
        </h3>
      </div>

      {/* Answers */}
      {answer.map((ans, ind) => {
        return <Answer key={ind} data={ans} />;
      })}

      {/* Tags */}
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-indigo-200 text-purple-800 text-sm px-2 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* End of Tags */}

      {/* Add Answer Input Field */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 py-2 px-3 border border-gray-300 rounded-lg placeholder-purple-600 focus:outline-none"
          placeholder="Add an answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-lg ml-2 hover:bg-purple-700 focus:outline-none"
          onClick={handleAddAnswer}
        >
          Add
        </button>
      </div>
      {/* End of Add Answer Input Field */}
    </div>
  );
};

export default Card;
