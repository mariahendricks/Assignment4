'use client'

import { createContext, useContext, useState } from "react";
import { UserContextType, UserType } from "@/utils/types";
import { registeredUsers } from "@/utils/users";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = (userInput: string | null) => {
        if (!userInput) {
            setError("Username cannot be empty");
            return;
        }

        const loggedInUser = registeredUsers.filter(
            (registeredUsers: UserType) => registeredUsers.name === userInput
        );

        if (loggedInUser.length > 0) {
            setUser(loggedInUser[0]);
            setError(null);
        } else {
            setError("Invalid username. Please try again.");
        }
    };
    
    const logout = () => {
        setUser(null);
        window.location.href = "/";
    }

    return(
        <UserContext.Provider value={{user, setUser, logout, login, error}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext)
}