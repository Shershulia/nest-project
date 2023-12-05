import React from "react";
import { useSession } from "next-auth/react";
import { getAdminServerSideProps } from "@/utils/adminUtils";
import Link from "next/link";

const SideNav = ({ currentPage, isAdmin }) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen p-4 w-max items-center">
        {console.log(currentPage)}
      <Link
        href="/"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
          currentPage === "Home" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-house text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Home</label>
      </Link>
      {isAdmin ? (
        <Link
          href="/account"
          className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
            currentPage === "Account" ? "text-customPurple" : "text-white"
          }`}
        >
          <i class="bi bi-person text-3xl"></i>
          <label className="opacity-0 group-hover:opacity-100">Account</label>
        </Link>
      ) : (
        <Link
          href="/admin"
          className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
            currentPage === "Admin" ? "text-customPurple" : "text-white"
          }`}
        >
          <i class="bi bi-person text-3xl"></i>
          <label className="opacity-0 group-hover:opacity-100">Admin</label>
        </Link>
      )}

      <Link
        href="/calendar"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
          currentPage === "Calendar" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-calendar4-week text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Calendar</label>
      </Link>
      <Link
        href="/events"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
          currentPage === "Events" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-balloon text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Events</label>
      </Link>
      <Link
        href="/documents"
        className={`group px-1 py-2 hover:bg-gray-800 flex flex-col items-center w-full rounded-lg ${
          currentPage === "Documents" ? "text-customPurple" : "text-white"
        }`}
      >
        <i class="bi bi-file-earmark-pdf text-3xl"></i>
        <label className="opacity-0 group-hover:opacity-100">Docs</label>
      </Link>

    </div>
  );
};

export default SideNav;

export async function getServerSideProps(ctx) {
  return await getAdminServerSideProps(ctx);
}
