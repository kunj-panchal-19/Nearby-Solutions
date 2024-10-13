import React, { useContext, useState } from "react";
import Card from "./card";

const CommunityPage = ({ data }) => {
  return (
    <div className="community-page bg-purple-500 p-3 mt-0 " >
      <div className="mx-auto max-w-xl">

        {(data) && data.map((post) => (
          <Card
            key={post._id}
            id={post._id}
            user={post.user}
            question={post.question}
            answer={post.answers}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
