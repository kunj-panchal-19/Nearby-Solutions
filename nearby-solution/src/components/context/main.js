import React, { createContext, useState } from "react";

const ScholarshipContext = createContext();

const ScholarshipProvider = ({ children }) => {
  const [globalPost,setGolbalPost] = useState(null);
  const [update,setUpdate]= useState(false);
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "" ,photo:"" });
  const [scholarships, setScholarships] = useState(null);
  const [index, setIndex] = useState(0);
  const [sName, setSName] = useState(null);
  const handleScholarships = (newScholarships) => {
    setScholarships(newScholarships);
    console.log("print", newScholarships[0]["fields"]["slug"]);
    setSName(newScholarships[0]["fields"]["slug"]);
  };

  const handlePost = (data) => {
    setPost(data);
  };
  const nextPage = () => {
    setIndex((prevIndex) => prevIndex + 10);
    console.log(index);
  };
  const prePage = () => {   
    setIndex((prevIndex) => prevIndex - 10);
    console.log(index);
  };

  const context = {
    scholarships,
    handleScholarships,
    index,
    nextPage,
    prePage,
    sName,
    setSName,
    post,
    handlePost,
    userData,
    setUserData,
    update,
    setUpdate,
    globalPost,
    setGolbalPost
  };

  return (
    <ScholarshipContext.Provider value={context}>
      {children}
    </ScholarshipContext.Provider>
  );
};

export { ScholarshipContext, ScholarshipProvider as default};
