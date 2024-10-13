import React,{useState, createContext } from "react";

const themeContext=createContext();
const themeProvider=({children})=>{
    const [theme, setTheme]=useState(0);
    return (
        <themeContext.Provider value={theme}>
            {children}
        </themeContext.Provider>
    )
}
export default themeProvider