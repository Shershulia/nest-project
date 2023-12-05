import React from 'react';
import Link from "next/link";

const SideNav = ({currentPage}) => {
    return (
        <div className='flex flex-col h-screen p-4 w-max items-center'>
            <Link href="/" className={`group text-white px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${currentPage === "Home" ? "text-customPurple" : ""}`}>
                <i class="bi bi-house text-3xl"></i>
                <label className='opacity-0 group-hover:opacity-100'>Home</label>
            </Link>
             <Link href="/" className={`group text-white px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${currentPage === "Account" ? "text-customPurple" : ""}`}>
                <i class="bi bi-person text-3xl"></i>
                <label className='opacity-0 group-hover:opacity-100'>Account</label>    
            </Link>
             <Link href="/calendar" className={`group text-white px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${currentPage === "Calendar" ? "text-customPurple" : ""}`}>
                <i class="bi bi-calendar4-week text-3xl"></i>
                <label className='opacity-0 group-hover:opacity-100'>Calendar</label>
            </Link>
        </div>
    );
};

export default SideNav;
