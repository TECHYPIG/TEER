"use client"
/**
 * Profile page of other users
 * 
 * This is the profile page for the application where other users information and posts are displayed
 * 
 * @author Ines Rita
 */


import { useState, useEffect } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Cookies from 'js-cookie';
import Post from "@/app/posts/Post";
import Image from 'next/image';



function Profile(props) {

    const [isFollowed, setIsFollowed] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);
    const [posts, setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState({
        Firstname: '',
        Surname: '',
        Username: '',
        Email: '',
        profile_url: '',
        Role: '',
        Location: '',
        Gender: '',
        Birthday: '',
        Bio: '',
        CreateAt: ''
    });


    //function to fetch current page user's details
    useEffect(() => {
        async function fetchUserDetails() {
            try {
                // Extract the 'username' query parameter from the URL
                const params = new URLSearchParams(window.location.search);
                const username = params.get('username');

                // Fetch user details using the provided username
                const response = await fetch(`/api/otherprofile?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                // Parse the response JSON
                const userDetails = await response.json();
                // Check if userDetails.CreateAt is defined before splitting
                const createAtDate = userDetails.CreateAt ? userDetails.CreateAt.split('T')[0] : '';

                // Update the userDetails object with the modified createAt
                setUserDetails({ ...userDetails, CreateAt: createAtDate });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        // Call fetchUserDetails
        fetchUserDetails();
    }, []); // Empty dependency array ensures useEffect runs only once after initial render


    //function to block user
    async function blockUsername() {
        try {
            // Check if userDetails is defined and contains the username
            if (!userDetails || !userDetails.Username) {
                console.error('User details not found');
                return;
            }

            const usernameToBlock = userDetails.Username; // Get the username from userDetails
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch(`/api/block?blockedUsername=${usernameToBlock}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to block user');
            }

            const updatedUser = await response.json();
            console.log('User blocked successfully:', updatedUser);
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    }

    //function to follow user
    async function followUsername() {
        try {
            // Check if userDetails is defined and contains the username
            if (!userDetails || !userDetails.Username) {
                console.error('User details not found');
                return;
            }

            const usernameToFollow = userDetails.Username; // Get the username from userDetails
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch(`/api/following?followedUsername=${usernameToFollow}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to block user');
            }

            const updatedUser = await response.json();
            setIsFollowed(true);
            console.log('User followed successfully:', updatedUser);
        } catch (error) {
            console.error('Error following user:', error);
        }
        setIsFollowed(true);
    }

    //function to unfollow user
    async function unfollowUsername() {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error('No access token found');
            }

            const response = await fetch(`/api/following?unfollowedUsername=${userDetails.Username}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to unfollow user');
            }

            const updatedUser = await response.json();
            console.log('User unfollowed successfully:', updatedUser);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
        setIsFollowed(false);
    }

    //function to get number of people user follows
    useEffect(() => {
        async function fetchFollowingCount() {
            try {
                const response = await fetch(`/api/getFollowers?username=${userDetails.Username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch following count');
                }
                const data = await response.json();
                setFollowingCount(data.followingCount);
            } catch (error) {
                console.error('Error fetching following count:', error);
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



                const response = await fetch(`/api/post/getOtherProfilePosts?username=${userDetails.Username}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch post details');
                }

                const postDetails = await response.json();
                setPosts(postDetails);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        }

        fetchPostDetails();
    }, [userDetails.Username]);



    //function to fetch logged in user and check whether they follow the current user therefore toggling follow or unfollow button
    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const token = Cookies.get("accessToken");
                if (!token) {
                    throw new Error('No access token found');
                }

                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const loggedUserDetails = await response.json();
                setLoggedInUser(loggedUserDetails);
            } catch (error) {
                console.error('Error fetching logged-in user details:', error);
            }
        }

        fetchLoggedInUser();
    }, []);

    useEffect(() => {
        if (loggedInUser && loggedInUser.Following) {
            setIsFollowed(loggedInUser.Following.includes(userDetails.Username));
        }
    }, [loggedInUser, userDetails.Username]);






    const postJSX = posts.map((post, i) => (
        <Post key={i} post={post} userDetails={loggedInUser} setPosts={setPosts} posts={posts}/>
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
                                            <Image className="rounded-full" src={userDetails.profile_url} width={100} height={100} alt='profile_image' />
                                        </div>

                                        <div className="text-center">
                                            <h1 className="text-2xl mt-2">{userDetails.Username} </h1>
                                            <div className="px-5 text-sm">
                                            </div>
                                            <div className="flex justify-center mt-3 px-4">

                                                <div className="flex flex-col">
                                                    <span className="font-bold text-2xl">{followingCount}</span>
                                                    <span className="text-sm text-red-600">Following</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-row px-4 mt-4">
                                                <button
                                                    className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700"
                                                    onClick={isFollowed ? unfollowUsername : followUsername}
                                                >
                                                    {isFollowed ? 'Unfollow' : 'Follow'}
                                                </button>
                                                <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700 ml-2" onClick={blockUsername}>Block</button>
                                            </div>


                                        </div>
                                    </div>
                                </div>



                                <div className="bg-white p-3 border-t-4 border-green-teer">
                                    <h3 className="text-gray-600 font-lg text-semibold leading-6">{userDetails.Role}</h3>
                                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6"> {userDetails.Bio}</p>
                                    <ul
                                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                            <span>Location</span>
                                            <span className="ml-auto"><span
                                                className="bg-green-teer py-1 px-2 rounded text-white text-sm">{userDetails.Location}</span></span>
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
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
    )
}

export default Profile