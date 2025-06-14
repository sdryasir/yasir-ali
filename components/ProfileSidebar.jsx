"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function ProfileSidebar({ currentPath }) {
  const { data: session } = useSession();
  return (
    <div className="card shadow-sm">
      <div className="card-body p-0 pt-3 text-center">
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-circle me-2"
          />
        ) : (
          <div className="mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fs-1"
            style={{ width: 100, height: 100 }}
          >
            <div>
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        )}
        <h5 className="mb-3">{session?.user?.name}</h5>
        <hr className="mb-0" />
        <ul className="nav user-profile-nav flex-column">
          <li className="nav-item">
            <Link
              href="/user-profile/personal"
              className={`nav-link ${
                currentPath.includes("/personal") ? "active" : ""
              }`}
            >
              Personal Info
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/user-profile/enrolled-courses"
              className={`nav-link ${
                currentPath.includes("/enrolled-courses") ? "active" : ""
              }`}
            >
              My Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/user-profile/password"
              className={`nav-link ${
                currentPath.includes("/password") ? "active" : ""
              }`}
            >
              Update Password
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/user-profile/account"
              className={`nav-link ${
                currentPath.includes("/account") ? "active" : ""
              }`}
            >
              Account Details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
