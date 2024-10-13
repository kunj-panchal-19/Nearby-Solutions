import React, { useContext, useEffect, useState } from "react";
import CommunityPage from "./community";
import { ScholarshipContext } from "./../context/main";
import {toast} from 'react-toastify';
import axios from "axios";
import Tags from "./tags";
import connectionString from "../connectionString";

export default function Index() {
  const {
    post,
    globalPost,
    handlePost,
    setGolbalPost,
    update,
    setUpdate,
    userData,
  } = useContext(ScholarshipContext);
  const [val, setVal] = useState("");
  const [valQ,setValQ] = useState("")
  const [toogle ,setToogle] = useState(false);
  // Fetches data only on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${connectionString}community/getAllCommunity`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res) {
          throw new Error("Failed to fetch data");
        }
        const result = res.data;
        handlePost(result);
        setGolbalPost(result);
        console.log("Global data:", globalPost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [update]);

  // logic to add question
  const handleAddQuestion = async (e) => {
    const arr = valQ.split(", ");
    console.log(sessionStorage.getItem('id'));
    const packet = {
      id: sessionStorage.getItem('id'),
      question: val,
      tags: arr,
    };
    try {
      const res = await axios.post(
        `${connectionString}community/addQuestion`,
        packet,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setVal("");
      setValQ("");
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
    // Your logic for adding a question goes here
  };

  return sessionStorage.getItem('id')?(
    <div className="flex flex-col space-y-16">
      {/* <Tags /> */}
      {post ? (
        <CommunityPage
          data={post}
          value={val}
          setValue={setVal}
          handleAddQuestions={handleAddQuestion}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <p className="text-lg text-gray-600 mt-4">No Post Found</p>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-4 left-4 flex items-center">
        <input
          type="text"
          value={!toogle?val:valQ}
          className="flex-1 py-2 px-3 mr-2 border border-gray-300 rounded-lg placeholder-blue-950 focus:outline-none"
          placeholder={!toogle?"Ask a question":"Add Tags"}
          onChange={(e) => {
            if(!toogle)
            setVal(e.target.value);
            else
            setValQ(e.target.value);
          }}
        />
        <button
          className="w-24 bg-blue-950 text-white py-2 px-4 rounded-lg"
          onClick={(e) =>{ 
            e.preventDefault();
            // for question
            if(!toogle){
                setToogle(!toogle)
            }
            // for answer
            else{
                setToogle(!toogle)
                handleAddQuestion()
            }
        }}
        >
          Send
        </button>
      </div>
    </div>
  ):toast.error("You are not logged in.");
}
