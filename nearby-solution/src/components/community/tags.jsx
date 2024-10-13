import React, { useContext, useState } from "react";
import { ScholarshipContext } from "./../context/main";

export default function Tags() {
  const { handlePost, globalPost } = useContext(ScholarshipContext);
  const tags = [
    "MYSY",
    "Digital Gujarat",
    "Girls",
    "Mukhyamantri Yojna",
    "Gujarat",
    "Maharastra"
  ];
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    console.log(selectedTags);
  };

  const applyFilter = () => {
    console.log(globalPost);
    if (selectedTags.length === 0) {
      alert("Please Select Tags first");
      handlePost(globalPost);
      return;
    }

    const filteredPost = globalPost?.filter((obj) => {
      return selectedTags.some((ele) => obj.tags.includes(ele));
    });

    handlePost(filteredPost);
    console.log("Applied Filter:", filteredPost);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-72 p-4 bg-white shadow-lg mt-40">
        <h3 className="text-lg font-semibold mb-4">Recently Asked</h3>
        <div className="mb-4">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagSelection(tag)}
              className={`inline-block py-2 px-4 m-1 rounded-md ${
                selectedTags.includes(tag)
                  ? "bg-indigo-300 text-white"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          onClick={applyFilter}
          className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-800"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}
