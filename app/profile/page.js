"use client"
/**
 * Profile page
 * 
 * This is the profile page for the application
 * 
 * @author Ines Rita
 */

 import profilePic from './koreanwoman.png';
 import Cookies from 'js-cookie';
 import { useState, useEffect } from 'react';
import Navbar from '../homepage/Navbar';

 function Post(props) {
 
   // posts listing and results
    return (
        <>
        
        {/* <!-- Posts --> */}
        <div class="bg-white p-3 shadow-sm rounded-sm">

        {/* <!-- component --> */}
        <div class="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
        <div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
            <div class="flex justify-between">
            <div class="flex items-center">
                {/* <img class="h-11 w-11 rounded-full" src=""/> */}
                <div class="ml-1.5 text-sm leading-tight">
                <span class="text-black dark:text-white font-bold block ">{props.post.title}</span>
                </div>
            </div>
            </div>
            <p class="text-black dark:text-white block text-xl leading-snug mt-3">{props.post.content}</p>
            {/* <img class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/> */}
            <p class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{props.post.createdAt}</p>
            <div class="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
            <div class="text-gray-500 dark:text-gray-400 flex mt-3">
            <div class="flex items-center mr-6">
            <button class="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
            </svg>
            <span>342</span>
        </button>
            </div>
            </div>
        </div>
        </div>


            {/* <!-- End of psts--> */}
        </div>

        </>
       
    )
}
 


function Profile(props) {


    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch post details when the component mounts
        fetchPosts();
        fetchUserDetails();

    }, []);

    const fetchUserDetails = async () => {
        try {
            const token = Cookies.get('accessToken'); // Retrieve access token from cookies
            if (!token) {
                throw new Error('No access token found');
            }
    
            const response = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const userData = await response.json();
            setUsers([userData]); // Assuming the response is an object containing user details
    
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const token = Cookies.get('accessToken'); // Retrieve access token from cookies
            if (!token) {
                throw new Error('No access token found');
            }
    
            const response = await fetch('/api/post', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch post details');
            }
            const postsData = await response.json();
            setPosts(postsData);
    
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };


    const postJSX = posts.map( 
        (post, i) => <Post key={i + post} count={i} post={post} /> 
    ) 




    return (
        <>


         <Navbar/>



<div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">

            {/* <!-- Left Side --> */}
            <div class="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div class="bg-white p-3 border-t-4 border-green-400">
                    {/* <img class="h-16 w-16 rounded-full mx-auto"
                                src={profilePic}
                                alt=""/> */}
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1" id="username" >John Doe</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                        consectetur adipisicing elit.
                        Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Location</span>
                            <span class="ml-auto"><span
                                    class="bg-green-600 py-1 px-2 rounded text-white text-sm">Newcastle, UK</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div class="my-4"></div>
            </div>
            {/* <!-- Right Side --> */}
            <div class="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        {/* <!-- about icon --> */}
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">First Name</div>
                                <div class="px-4 py-2">John Doe</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Surname</div>
                                <div class="px-4 py-2">John Doe</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Username</div>
                                <div class="px-4 py-2">JohnDoe</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Gender</div>
                                <div class="px-4 py-2">Male</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Birthday</div>
                                <div class="px-4 py-2">Feb 06, 1998</div>
                            </div>
                        </div>
                    </div>
                </div>
                        
                {/* <!-- Edit profile link -->   */}
                <a href="/editprofileinfo" class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit profile</a>

            
               <div class="my-4"></div>




               {postJSX}



                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>




       </>
    )
}

export default Profile