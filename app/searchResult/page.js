"use client"
/**
 * Profile page
 * 
 * This is the profile page for the application
 * 
 * @author Ines Rita
 */

 import Cookies from 'js-cookie';
 import { useState, useEffect } from 'react';
import styles from '../homepage/Navbar.module.css';
import Navbar from '../homepage/Navbar';
import { useRouter } from 'next/navigation';

function UserList(props) {
    // Destructure user from props
    const { user } = props;
    
    return (
      <>


        {/* <ul class="bg-white border border-gray-100 w-full mt-2 ">
            <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
            <svg class="stroke-current absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <a href="#">{user.Username}</a>
            </li>
        </ul> */}

<div className="bg-white border border-gray-100 w-full mt-2 rounded-xl shadow-xl">
      <a href={`/otherprofile?username=${user.Username}`}>
        <div className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
          <div className="mr-4">
            <svg
              className="stroke-current absolute w-4 h-4 left-2 top-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <div className="font-bold text-lg">{user.Username}</div>
            <div className="text-xs text-gray-500">
              <span className="mr-2">
                {" "}
                <b>Location:</b> {user.Location}
              </span>
              <span className="mr-2">
                {" "}
                <b>Role:</b> {user.Role}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>





      </>
    );
  }


export default function SearchResult({ users }) {


    const usersJSX = users.map((user, i) => (
        <UserList key={i} user={user} />
      ));



    return (
        <div>
            
            {usersJSX} 
        </div>
    );
}
