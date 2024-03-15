"use client"
/**
 * Edit Profile page
 * 
 * This is the edit profile page for the application
 * 
 * @author Ines Rita
 */
import { useState } from 'react';
import Cookies from 'js-cookie';


function editprofile() {

    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bio, setBio] = useState('');





    async function updateUserDetails(id, firstname, surname, username, email, role, location, gender, birthday, bio) {
    try {
        const token = Cookies.get('accessToken'); // Retrieve access token from cookies
        if (!token) {
            throw new Error('No access token found');
        }

        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
            },
            body: JSON.stringify({ id, firstname, surname, username, email, role, location, gender, birthday, bio }),
        });
        if (!response.ok) {
            throw new Error('Failed to update user details');
        }
        const updatedUser = await response.json();

        // Optionally, set the updated access token in cookies
        Cookies.set('accessToken', updatedUser.accessToken);

        return updatedUser;
    } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
    }
}


    const handleFirstname = (event) => setFirstname(event.target.value);
    const handleSurname = (event) => setSurname(event.target.value);
    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail = (event) => setEmail(event.target.value);
    const handleRole = (event) => setRole(event.target.value);
    const handleLocation = (event) => setLocation(event.target.value);
    const handleGender = (event) => setGender(event.target.value);
    const handleBirthday = (event) => setBirthday(event.target.value);
    const handleBio = (event) => setBio(event.target.value);


    return (
        <>
  

  <div class="flex justify-center mt-20 px-8">
    <form class="max-w-2xl">
        <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
            <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>

            <div class="flex flex-col gap-2 w-full border-gray-400">

                <div>
                    <label class="text-gray-600 dark:text-gray-400">
                        First Name
                    </label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={firstname}
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
                        value={surname}
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
                        value={username}
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
                        value={email}
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
                        value={role}
                onChange={handleRole}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">Gender</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        type="text"
                        value={gender}
                onChange={handleGender}
                        />
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-400">Birthday</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={birthday}
                onChange={handleBirthday} 
                        />
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-400">Location</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={location}
                onChange={handleLocation} 
                        />
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-400">Bio</label>
                    <input
                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                        name="bio"
                            defaultValue={bio}
                          onChange={handleBio} 
                        />
                </div>
                <div class="flex justify-end">
                    <button
                        class="py-1.5 px-3 m-1 text-center bg-green-500 border rounded-md text-white  hover:bg-green-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                        type="submit">Save changes
                        onClick={updateUserDetails}
                        </button>
                </div>
            </div>
        </div>
    </form>
</div>


</>
    )
}

export default editprofile