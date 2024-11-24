'use client'

import { useUserContext } from "@/utils/contexts";
import { UserContextType } from "@/utils/types";
import { SlLogout } from "react-icons/sl";
import Link from "next/link";

const NavMenu = () => {
    const {logout} = useUserContext() as UserContextType;

     return (
        <nav className="flex justify-evenly bg-cyan-950 text-white p-4">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/category">Category</Link>
            <button onClick={logout}>
                <SlLogout />
            </button>
        </nav>
    );
}

export default NavMenu;