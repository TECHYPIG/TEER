"use client";
/**
 * Navbar component
 *
 * This is the component that generated the navbar at the top of the page 
 * handles the search bar where a username can be searched for
 * @author Ines Rita
 * @author Firdaws Yasmin
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

  //function to search for a username
  async function searchUsersByUsername() {
    const token = Cookies.get("accessToken");
    if (!token) {
      throw new Error("No access token found");
    }
    try {
      const response = await fetch(`/api/search?username=${username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }

  // Function to handle changes in the input field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  //function to handle when search button is clicked
  const handleSearch = () => {
    searchUsersByUsername(username);
  };

  return (
    <>
      <div className={styles.navbar}>
        <p className={styles.navtxt}>
          <a href="/homepage">TEER</a>
        </p>
        <div className={styles.search}>
          <div className="">
            <div className="inline-flex flex-col justify-center relative z-0 text-gray-500">
              <div className="relative">
                <input
                  type="text"
                  className="p-2 pl-8 rounded-lg border-gray-200  focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="search..."
                  style={{ width: "400px" }}
                  value={username}
                  onInput={handleUsernameChange}
                />
                <button
                  className="p-2 ml-2 rounded-lg bg-white text-green hover:bg-yellow-600 focus:outline-none focus:bg-green-teer"
                  onClick={handleSearch}
                >
                  Search
                </button>
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
              {username.trim() !== "" && <SearchResult users={users || []} />}
            </div>
          </div>
        </div>
        <Link href="/login">
          <h3
            className={styles.navlogout}
            onClick={() => Cookies.set("accessToken", undefined)}
          >
            Logout
          </h3>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
