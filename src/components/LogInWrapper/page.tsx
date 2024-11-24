'use client'

import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import LogIn from "../LogIn";
import NavMenu from "../NavMenu";

const LogInWrapper = ({children}: {children:React.ReactNode}) => {
    const { user } = useUserContext() as UserContextType 

     return (
        <div className="flex flex-col flex-1">
            {!user ? (
                <LogIn /> 
            ) : (
                <>
                    <NavMenu />
                    {children}
                </>
            )}
        </div>
    );
}

export default LogInWrapper;