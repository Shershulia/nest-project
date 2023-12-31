import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const AdminNavBar = () => {
  const inactiveLink = "flex  py-4 w-full text-center justify-center";

  const activeLink = inactiveLink + " bg-white text-customPurple ";
  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push("/");
    await signOut();
  }
  return (
    <div
      className={
        "flex flex-col w-1/4 text-center items-center justify-between gap-4 h-screen text-white"
      }
    >
      <div className={"flex items-center py-2 "}>
        <i className="bi bi-chat-square-dots text-xl"></i>
        <span className={"ml-2"}>Admin Panel</span>
      </div>
      <div className={"w-full"}>
        <Link
          href={"/admin/events"}
          className={pathname === "/admin/events" ? activeLink : inactiveLink}
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
            <i className="bi bi-calendar4-week text-xl"></i>
            <span>Events</span>
          </div>
        </Link>
        <Link
          href={"/admin/admins"}
          className={pathname === "/admin/admins" ? activeLink : inactiveLink}
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
            <i className="bi bi-mortarboard text-xl"></i>
            <span>Admin</span>
          </div>
        </Link>
        <Link
          href={"/admin/settings"}
          className={pathname === "/admin/settings" ? activeLink : inactiveLink}
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
            <i className="bi bi-gear text-xl"></i>
            <span>Settings</span>
          </div>
        </Link>
        <Link
          href={"/admin/documents"}
          className={
            pathname === "/admin/documents" ? activeLink : inactiveLink
          }
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
            <i className="bi bi-file-earmark-bar-graph text-xl"></i>
            <span>Documents</span>
          </div>
        </Link>
        <Link
            href={"/admin/confirmations"}
            className={pathname === "/admin/confirmations" ? activeLink : inactiveLink}
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
            <i className="bi bi-people text-xl"></i>
            <span>Users</span>
          </div>
        </Link>
        <Link
          href={"/admin/finance"}
          className={pathname === "/admin/finance" ? activeLink : inactiveLink}
        >
          <div className={"flex w-1/3 justify-start gap-4"}>
						<i className="bi bi-coin text-xl"></i>
            <span>Finances</span>
          </div>
        </Link>
      </div>
      <div className="flex gap-14 mb-2 justify-between">
        <button className={`${inactiveLink} flex items-center gap-2`} onClick={logout}>
          <i className="bi bi-box-arrow-left text-2xl"></i>
          <span>Log Out</span>
        </button>
        <Link href="/" className="flex items-center gap-2">
          <i class="bi bi-house text-2xl"></i>
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavBar;
