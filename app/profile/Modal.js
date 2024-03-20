import {useState} from "react";
import Cookies from 'js-cookie';
import { useEffect } from 'react';



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



                <li class="flex  items-center">
                    <div class="flex items-center">
                        <img class="" alt=""/>
                        <span class="ml-3 font-medium">{user.Username}</span>
                    </div>
                    <div>
                    <button className="h-10 w-full text-white text-md rounded bg-green-teer hover:bg-green-700" onClick={() => unblockUsername(user.Username)}>Unblock</button>

                    </div>
                </li>
     
      </>
    );
  }

 

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

export default function Modal({open,close})
{
    const [blockedUsers, setBlockedUsers] = useState([]);

    useEffect(() => {
        fetchBlockedUsers()
            .then((blockedUsers) => setBlockedUsers(blockedUsers))
            .catch((error) => console.error('Error setting blocked users:', error));
    }, []);

    const blockedUsersJSX = blockedUsers.map((username, i) => (
        <UserList key={i} user={{ Username: username }} />
    ));

    
    

    if (open === false) {
        return null
    }
        return (
            <>

        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <ul class="divide-y divide-gray-200">

            {blockedUsersJSX}
            </ul>
        </div>


            </>
        );
    }
function onChangeFunction(event, inputState){
    inputState(event.target.value)
}