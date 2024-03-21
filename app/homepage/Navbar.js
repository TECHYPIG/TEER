"use client";
/**
 * Profile page
 *
 * This is the profile page for the application
 *
 * @author Ines Rita
 */

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import styles from "../homepage/Navbar.module.css";
import SearchResult from "../searchResult/page";
import Link from "next/link";

function Navbar(props) {
  // State for holding the input username
  const [username, setUsername] = useState("");
  // State for holding the list of users
  const [users, setUsers] = useState([]);

  async function searchUsersByUsername() {
    const token = Cookies.get("accessToken");
    //console.log(Cookies.get())
    if (!token) {
        throw new Error('No access token found');
    }
    try {
      const response = await fetch(`/api/search?username=${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }

  // Function to handle changes in the input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  function testFunction() {
    handleUsernameChange();
    searchUsersByUsername();
  }

  return (
    <>
      <div className={styles.navbar}>
        <p className={styles.navtxt}>
          <a href="/homepage">TEER</a>
        </p>
        <div className={styles.search}>
          <div className="">
            <div className="inline-flex flex-col justify-center relative text-gray-500">
              <div className="relative">
                <input
                  type="text"
                  className="p-2 pl-8 rounded-lg border-gray-200  focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="search..."
                  style={{ width: "400px" }}
                  value={username}
                  onInput={handleUsernameChange}
                  onChange={searchUsersByUsername}
                />
                <svg
                  className="w-4 h-4 absolute left-2.5 top-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeLinecap="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {username.trim() !== "" && <SearchResult users={users} />}
            </div>
          </div>
        </div>
        <p className={styles.navtxtinv}>
          <a href="/homepage">TEER</a>
        </p>
        <Link href="/login">
        <h3 onClick={() => Cookies.set("accessToken", undefined)}>Logout</h3>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
