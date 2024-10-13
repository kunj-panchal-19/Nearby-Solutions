import React, { createContext, useState } from 'react';

export const authContext = createContext(null);

const ContextAuth=(props) =>{
  const [currentUser, setCurrentUser] = useState(null);
  const handleCurrentUser = (data)=>{
    setCurrentUser(data);
  }
  const context = {
    currentUser,
    handleCurrentUser
  };
  return (
    <div>
      <authContext.Provider value={context}>
        {props.children}
      </authContext.Provider>
    </div>
  );
}

export default ContextAuth;