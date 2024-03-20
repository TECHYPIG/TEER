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
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

 function Post(props) {
 
    const { post } = props;
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
                {/* <img className="h-11 w-11 rounded-full" src=""/> */}
                <div className="ml-1.5 text-sm leading-tight">
                <span className="text-black dark:text-white font-bold block ">{props.post.title}</span>
                </div>
            </div>
            </div>
            <p className="text-black dark:text-white block text-xl leading-snug mt-3">{props.post.content}</p>
            {/* <img className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700" src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"/> */}
            <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{props.post.createdAt}</p>
            <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
            <div className="text-gray-500 dark:text-gray-400 flex mt-3">
            <div className="flex items-center mr-6">
            <button className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
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


function UserList(props) {
    // Destructure user from props
    const { user } = props;

    async function unblockUsername(username) {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error('No access token found');
            }
    
            const response = await fetch(`/api/block?unblockedUsername=${username}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to unblock user');
            }
    
            const updatedUser = await response.json();
            console.log('User unblocked successfully:', updatedUser);
        } catch (error) {
            console.error('Error unblocking user:', error);
            // Handle error
        }
    }
    
    
    return (
      <>



                {/* <li class="flex  items-center">
                    <div class="flex items-center">
                        <img class="" alt=""/>
                        <span class="ml-3 font-medium">{user.Username}</span>
                    </div>
                    <div>
                    <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700" onClick={() => unblockUsername(user.Username)}>Unblock</button>

                    </div>
                </li> */}

                <div role="button"
                                class="flex items-center w-full p-3 py-1 pl-4 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                                {user.Username}
                                <div class="grid ml-auto place-items-center justify-self-end">
                                    <button
                                    className="h-10 w-full px-10 text-white text-md rounded bg-green-teer hover:bg-green-700"
                                    type="button" onClick={() => unblockUsername(user.Username)} >
                                   Unblock
                                    </button>
                                </div>
                                </div>
     
      </>
    );
  }
 


function Profile(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:450,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


   // var [ModalOpen,SetModalOpen] = useState(false)

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [blockedUsers, setBlockedUsers] = useState([]);

    const [posts, setPosts] = useState([]);

    const [followingCount, setFollowingCount] = useState(null);

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
                const token = Cookies.get("accessToken");
                //console.log(Cookies.get())
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
                const userDetails = await response.json();
                 // Check if userDetails.CreateAt is defined before splitting
            const createAtDate = userDetails.CreateAt ? userDetails.CreateAt.split('T')[0] : '';
      
            // Update the userDetails object with the modified createAt
            setUserDetails({ ...userDetails, CreateAt: createAtDate });
                //console.log(userDetails) 
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle error
            }
        }

        fetchUserDetails();
    }, []);

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

    

    useEffect(() => {
      async function fetchPostDetails() {
        try {
          const token = Cookies.get("accessToken");
          if (!token) {
            throw new Error('No access token found');
          }
          
          const response = await fetch('/api/post/getUserPosts', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch post details');
          }
  
          const postDetails = await response.json();
          // Modify post details if necessary before updating state
          setPosts(postDetails);
        } catch (error) {
          console.error('Error fetching post details:', error);
          // Handle error
        }
      }
  
      fetchPostDetails();
    }, []);



    async function fetchBlockedUsers() {
   


        try {
            const token = Cookies.get("accessToken");
            //console.log(Cookies.get())
            if (!token) {
                throw new Error('No access token found');
            }
            
            const response = await fetch('/api/block', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            const blockedUsers = await response.json();
            return blockedUsers;
        } catch (error) {
            console.error('Error fetching blocked details:', error);
            // Handle users
        }
    }

    useEffect(() => {
        fetchBlockedUsers()
            .then((blockedUsers) => setBlockedUsers(blockedUsers))
            .catch((error) => console.error('Error setting blocked users:', error));
    }, []);
  

    const postJSX = posts.map((post, i) => (
        <Post key={i} post={post} />
      ));

      const blockedUsersJSX = blockedUsers.map((username, i) => (
        <UserList key={i} user={{ Username: username }} />
    ));

   



    return (
        <>


         <Navbar/>



         <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">

            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">

      <div className="h-screen bg-green-teer py-5 px-3">
    
    <div className="max-w-md mx-auto md:max-w-lg">
        <div className="w-full">
            <div className="bg-white p-3 rounded text-center py-5">
                <div className="flex justify-center">
                    <img className="rounded-full" src="https://i.imgur.com/TcyQLXx.jpg" width="100"/>
                </div>
                
                <div className="text-center">
                    <h1 className="text-2xl mt-2">{userDetails.Username} </h1>
                    <div className="px-5 text-sm">
                    
                        {/* <p className="text-justify">{userDetails.Bio}</p> */}
                    </div>
                    <div className="flex justify-center mt-3 px-4">
                        
                        <div  className="flex flex-col">
                            <span className="font-bold text-2xl">{followingCount}</span>
                            <span className="text-sm text-red-600">Following</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row px-4 mt-4">
                      <a href="/editprofileinfo" className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700" >  <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700">Edit Profile</button> </a> 
                        {/* <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700 ml-2">Block</button> */}
                    </div>

                    <div className="flex flex-row px-4 mt-4">
                       <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700" onClick={handleOpen}>Blocked Users</button> 
                       <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>



                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Blocked Users
                            </Typography>

                            <div class="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                            <nav class="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                            {blockedUsersJSX}
                            </nav>
                            </div>



                            </Box>
                        </Modal>
                    </div>
                    
                    
                </div>
            </div>
        </div>


        {/* <!-- Profile Card --> */}
        <div className="bg-white p-3 border-t-4 border-green-teer">
                    {/* <img className="h-16 w-16 rounded-full mx-auto"
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
                {/* <a href="/editprofileinfo" className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit profile</a>

             */}
               <div className="my-4"></div>





               {postJSX}



                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>




       </>
    )
}

export default Profile