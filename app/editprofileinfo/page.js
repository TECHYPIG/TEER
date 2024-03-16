"use client"
/**
 * Edit Profile page
 * 
 * This is the edit profile page for the application
 * 
 * @author Ines Rita
 */
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function editprofile() {
    const [userDetails, setUserDetails] = useState({
        Firstname: '',
        Surname: '',
        Username: '',
        Email: '',
        Role: '',
        Location: '',
        Gender: '',
        Birthday: '',
        Bio: ''
    });

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
                const userData = await response.json();
                setUserDetails(userData);
                console.log(userData)
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle error
            }
        }

        fetchUserDetails();
    }, []);

    // Handler functions for input changes
    const handleFirstname = (event) => setUserDetails({ ...userDetails, firstname: event.target.value });
    const handleSurname = (event) => setUserDetails({ ...userDetails, surname: event.target.value });
    const handleUsername = (event) => setUserDetails({ ...userDetails, username: event.target.value });
    const handleEmail = (event) => setUserDetails({ ...userDetails, email: event.target.value });
    const handleRole = (event) => setUserDetails({ ...userDetails, role: event.target.value });
    const handleLocation = (event) => setUserDetails({ ...userDetails, location: event.target.value });
    const handleGender = (event) => setUserDetails({ ...userDetails, gender: event.target.value });
    const handleBirthday = (event) => setUserDetails({ ...userDetails, birthday: event.target.value });
    const handleBio = (event) => setUserDetails({ ...userDetails, bio: event.target.value });

    // Function to update user details
    async function updateUserDetails() {
        try {
            const token = Cookies.get('accessToken');
            if (!token) {
                throw new Error('No access token found');
            }
            
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to update user details');
            }
            // Optionally, set the updated access token in cookies
            const updatedUser = await response.json();
            Cookies.set('accessToken', updatedUser.accessToken);
        } catch (error) {
            console.error('Error updating user details:', error);
            // Handle error
        }
    }

    return (
        <>
            <div class="flex justify-center mt-20 px-8">
                <form class="max-w-2xl">
                    <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                        <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>
                        <div class="flex flex-col gap-2 w-full border-gray-400">
                            <div>
                                <label class="text-gray-600 dark:text-gray-400">First Name</label>
                                <input
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text"
                                    value={userDetails.Firstname}
                                    onChange={handleFirstname}
                                />
                            </div>
                            <div>
                    <label class="text-gray-600 dark:text-gray-400">
                        Surname
                    </label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={userDetails.Surname}
                onChange={handleSurname}
                        />
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-400">
                        Username
                    </label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={userDetails.Username}
                onChange={handleUsername}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">
                        Email
                    </label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={userDetails.Email}
                onChange={handleEmail}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">
                        Role
                    </label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={userDetails.Role}
                onChange={handleRole}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">Gender</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={userDetails.Gender}
                onChange={handleGender}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">Birthday</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={userDetails.Birthday}
                onChange={handleBirthday} 
                        />
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-400">Location</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={userDetails.Location}
                onChange={handleLocation} 
                        />
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-400">Bio</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={userDetails.Bio}
                          onChange={handleBio} 
                        />
                </div>

                            <div class="flex justify-end">
                                <button
                                    class="py-1.5 px-3 m-1 text-center bg-green-500 border rounded-md text-white hover:bg-green-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                    type="button" onClick={updateUserDetails}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default editprofile;