import React from 'react';

const Answer = ({data}) => {
    return (
        <div className="answer bg-white text-black p-4 mb-4 rounded-lg shadow-md relative">
            <div className="flex items-center mb-2">
                {/* Answerer profile image */}
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img className="w-full h-full object-cover" src={"images/rag.jpg"} alt="Profile" />
                    {/* src={data?.user?.photo} */}
                </div>
                {/* Answerer name */}
                <p className="text-sm text-gray-600">{data?.user?.name}</p>
            </div>
            {/* Answer text */}
            <p className="text-black">{data.answer}</p>
        </div>
    );
};

export default Answer;
