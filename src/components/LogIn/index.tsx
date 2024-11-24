'use client'

import { useUserContext } from "@/utils/contexts";
import { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";

const LogIn = () => {
    const [ userInput, setUserInput ] = useState<string | null>(null);
    const { login, error} = useUserContext()!;
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
      };
    
      useEffect(() => {
        if (window.location.pathname !== "/") {
              window.location.href = "/";
        }
      }, []);
      
      return (
        <div className="flex flex-grow justify-center flex-col items-center p-10 bg-slate-200">
            <p className="text-xl font-bold p-3">Log In</p>
            <input 
              id="user-input" 
              onChange={handleChange} 
              className="bg-slate-100 p-2 w-52 italic text-center border border-solid border-gray-400 rounded-lg" 
              placeholder="Enter your name"
            />
            <button
              onClick={() => login(userInput)} 
              className="mt-8 bg-sky-800 text-white p-2 rounded-lg inline-flex items-center"
            >
              <FaKey className="mr-2"/> Enter
            </button>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </div>
    );
}

export default LogIn;
