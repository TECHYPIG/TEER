"use client"
/**
 * Profile page
 * 
 * This is the profile page for the application
 * 
 * @author Ines Rita
 */


 import { useState, useEffect } from 'react';
import Navbar from '../homepage/Navbar';
import Cookies from 'js-cookie';

 function Post(props) {
 
   // posts listing and results
    return (
        <>
        
        {/* <!-- Posts --> */}
        <div className="bg-white p-3 shadow-sm rounded-sm">

        {/* <!-- component --> */}
        <div className="bg-gray-50 dark:bg-black p-10 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
            <div className="flex justify-between">
            <div className="flex items-center">
                {/* <img class="h-11 w-11 rounded-full" src=""/> */}
                <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black dark:text-white font-bold block ">{props.post.title}</span>
                </div>
            </div>
            </div>
            <p className="text-black dark:text-white block text-xl leading-snug mt-3">{props.post.content}</p>
            {/* <img class="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/> */}
            <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{props.post.createdAt}</p>
            <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
            <div className="text-gray-500 dark:text-gray-400 flex mt-3">
            <div className="flex items-center mr-6">
            <button className="py-1.5 px-3 hover:text-green-teer hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
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
    const [userDetails, setUserDetails] = useState({
        Firstname: '',
        Surname: '',
        Username: '',
        Email: '',
        Role: '',
        Location: '',
        Gender: '',
        Birthday: '',
        Bio: '',
        CreateAt: ''
    });

    useEffect(() => {
        // Fetch post details when the component mounts
       // fetchPosts();

    }, []);

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

            console.log(userDetails)
          } catch (error) {
            console.error('Error fetching user details:', error);
            // Handle error
          }
        }
      
        // Call fetchUserDetails
        fetchUserDetails();
      }, []); // Empty dependency array ensures useEffect runs only once after initial render
      

      
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
            // Handle error
        }
    }


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
            console.log('User followed successfully:', updatedUser);
        } catch (error) {
            console.error('Error following user:', error);
            // Handle error
        }
    }


    //   useEffect(() => {
    //     // Check if userDetails.CreatedAt is defined before splitting
    //     const createdAtDate = userDetails.CreatedAt ? userDetails.CreatedAt.split('T')[0] : '';
       
    //     // Update userDetails with the modified createdAt
    //     setUserDetails({ ...userDetails, CreatedAt: createdAtDate });
       
    //   }, [userDetails]); // Execute the effect whenever userDetails changes



    // const fetchPosts = async () => {
    //     try {
    //         const token = Cookies.get('accessToken'); // Retrieve access token from cookies
    //         if (!token) {
    //             throw new Error('No access token found');
    //         }
    
    //         const response = await fetch('/api/post', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
    //             },
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch post details');
    //         }
    //         const postsData = await response.json();
    //         setPosts(postsData);
    
    //     } catch (error) {
    //         console.error('Error fetching post details:', error);
    //     }
    // };


    // const postJSX = posts.map( 
    //     (post, i) => <Post key={i + post} count={i} post={post} /> 
    // ) 




    return (
        <>


         <Navbar/>



<div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">

            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">

      <div class="h-screen bg-green-teer py-5 px-3">
    
    <div class="max-w-md mx-auto md:max-w-lg">
        <div class="w-full">
            <div class="bg-white p-3 rounded text-center py-5">
                <div class="flex justify-center">
                    <img class="rounded-full" src="https://i.imgur.com/TcyQLXx.jpg" width="100"/>
                </div>
                
                <div class="text-center">
                    <h1 class="text-2xl mt-2">{userDetails.Username} </h1>
                    <div class="px-5 text-sm">
                        {/* <p class="text-justify">{userDetails.Bio}</p> */}
                    </div>
                    <div class="flex justify-between mt-3 px-4">
                        <div  class="flex flex-col">
                            <span class="font-bold text-2xl">97</span>
                            <span class="text-sm text-red-600">Followers</span>
                        </div>
                        
                        <div  class="flex flex-col">
                            <span class="font-bold text-2xl">47</span>
                            <span class="text-sm text-red-600">Followings</span>
                        </div>
                    </div>
                    
                    <div class="flex flex-row px-4 mt-4">
                        <button class="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700"onClick={followUsername}>Follow</button>
                        <button class="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700 ml-2" onClick={blockUsername}>Block</button>
                    </div>
                    
                    
                </div>
            </div>
        </div>


        {/* <!-- Profile Card --> */}
        <div className="bg-white p-3 border-t-4 border-green-teer">
                    {/* <img class="h-16 w-16 rounded-full mx-auto"
                                src={profilePic}
                                alt=""/> */}
                    {/* <h1 className="text-gray-900 font-bold text-xl leading-8 my-1" id="username" > {userDetails.Username}</h1> */}
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


       
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        {/* <!-- about icon --> */}
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
                        
                {/* <!-- Edit profile link -->   */}

               <div className="my-4"></div>





               {/* {postJSX} */}



                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>




       </>
    )
}

export default Profile