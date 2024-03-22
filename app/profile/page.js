"use client";
/**
 * Profile page
 *
 * This is the profile page for the application where the logged in users information and posts
 *
 * @author Ines Rita
 */

import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Post from "@/app/posts/Post";
import Navbar from "@/app/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

function UserList(props) {
  const { user } = props;

  //function to unblock username
  async function unblockUsername(username) {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(`/api/block?unblockedUsername=${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to unblock user");
      }

      const updatedUser = await response.json();
      console.log("User unblocked successfully:", updatedUser);
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  }

  return (
    <>
      <div
        role="button"
        class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
      >
        {user.Username}
        <div class="grid ml-auto place-items-center justify-self-end">
          <button
            className="h-10 w-full px-10 text-white text-md rounded bg-green-teer hover:bg-green-700"
            type="button"
            onClick={() => unblockUsername(user.Username)}
          >
            Unblock
          </button>
        </div>
      </div>
    </>
  );
}

function Profile(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [blockedUsers, setBlockedUsers] = useState([]);

  const [posts, setPosts] = useState([]);

  const [followingCount, setFollowingCount] = useState(null);

  const [userDetails, setUserDetails] = useState({
    Firstname: "",
    Surname: "",
    Username: "",
    Email: "",
    profile_url: "",
    Role: "",
    Location: "",
    Gender: "",
    Birthday: "",
    Bio: "",
    CreateAt: "",
  });

  //function to fetch logged in user details
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userDetails = await response.json();
        // Check if userDetails.CreateAt is defined before splitting
        const createAtDate = userDetails.CreateAt
          ? userDetails.CreateAt.split("T")[0]
          : "";

        // Update the userDetails object with the modified createAt
        setUserDetails({ ...userDetails, CreateAt: createAtDate });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, []);

  //function to fetch number of users they follow
  useEffect(() => {
    async function fetchFollowingCount() {
      try {
        const response = await fetch(
          `/api/getFollowers?username=${userDetails.Username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch following count");
        }
        const data = await response.json();
        setFollowingCount(data.followingCount);
      } catch (error) {
        console.error("Error fetching following count:", error);
      }
    }

    if (userDetails.Username) {
      fetchFollowingCount();
    }
  }, [userDetails.Username]);

  //function to fetch user posts
  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          throw new Error("No access token found");
        }

        const response = await fetch("/api/post/getUserPosts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const postDetails = await response.json();
        setPosts(postDetails);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    fetchPostDetails();
  }, []);

  //function to fetch blocked users
  async function fetchBlockedUsers() {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch("/api/block", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const blockedUsers = await response.json();
      return blockedUsers;
    } catch (error) {
      console.error("Error fetching blocked details:", error);
    }
  }

  useEffect(() => {
    fetchBlockedUsers()
      .then((blockedUsers) => setBlockedUsers(blockedUsers))
      .catch((error) => console.error("Error setting blocked users:", error));
  }, []);

  const postJSX = posts.map((post, i) => (
    <Post
      key={i}
      post={post}
      userDetails={userDetails}
      setPosts={setPosts}
      posts={posts}
    />
  ));

  const blockedUsersJSX = blockedUsers.map((username, i) => (
    <UserList key={i} user={{ Username: username }} />
  ));

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="h-screen bg-green-teer py-5 px-3">
              <div className="max-w-md mx-auto md:max-w-lg">
                <div className="w-full">
                  <div className="bg-white p-3 rounded text-center py-5">
                    <div className="flex justify-center">
                      <Image
                        className="rounded-full"
                        src={userDetails.profile_url}
                        width={100}
                        height={100}
                        alt="profile_image"
                      />
                    </div>

                    <div className="text-center">
                      <h1 className="text-2xl mt-2">{userDetails.Username} </h1>
                      <div className="px-5 text-sm"></div>
                      <div className="flex justify-center mt-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-2xl">
                            {followingCount}
                          </span>
                          <span className="text-sm text-red-600">
                            Following
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row px-4 mt-4">
                        <Link
                          href="/profile/edit"
                          className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700"
                        >
                          {" "}
                          <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700">
                            Edit Profile
                          </button>{" "}
                        </Link>
                      </div>

                      <div className="flex flex-row px-4 mt-4">
                        <button
                          className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700"
                          onClick={handleOpen}
                        >
                          Blocked Users
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Blocked Users
                            </Typography>

                            <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                              <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                                {blockedUsersJSX}
                              </nav>
                            </div>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 border-t-4 border-green-teer">
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">
                    {userDetails.Role}
                  </h3>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {" "}
                    {userDetails.Bio}
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Location</span>
                      <span className="ml-auto">
                        <span className="bg-green-teer py-1 px-2 rounded text-white text-sm">
                          {userDetails.Location}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">{userDetails.CreateAt}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-4"></div>
          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-teer">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{userDetails.Firstname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Surname</div>
                    <div className="px-4 py-2">{userDetails.Surname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Username</div>
                    <div className="px-4 py-2">{userDetails.Username}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{userDetails.Gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">{userDetails.Birthday}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4"></div>

            {postJSX}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
