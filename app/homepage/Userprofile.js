"use client"
import styles from './Userprofile.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import { SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseLight } from "react-icons/pi"; 
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';



const Userprofile = () => {


  const [followingCount, setFollowingCount] = useState(null);

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



    const h1Style = {
      fontSize: '1rem', 
      fontWeight:'bold',
    };
    const h2Style = {
      fontSize: '0.8rem', 
    };
    const h3Style = {
      fontSize: '0.9rem', 
      fontWeight:'bold',
      marginLeft: '70px',
    };
    return ( 
        <div className={styles.sideprofile}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> {userDetails.Firstname}</h1> 
            <h2 style= {h2Style}>@{userDetails.Username}</h2>
          </div>
        </div>
          <div className={styles.userdetails}>
            <ul>
            <li className={styles.picons}><CiLocationOn size={24}/>{userDetails.Location}</li>
            <li  className={styles.picons}> <PiBriefcaseLight size={24}/>{userDetails.Role}</li>
            </ul>
          </div>
          <div className={styles.line}></div>
          <a style= {h3Style}></a>
          <div className={styles.socials}>
            <ul>
            <li><a href="https://www.instagram.com/"><SlSocialInstagram className={styles.picons} size={22}/>Instagram</a></li>
            <li><a href="https://twitter.com/"><SlSocialTwitter className={styles.picons} size={22}/>Twitter</a></li>
            <li><a href="https://www.linkedin.com/"><SlSocialLinkedin className={styles.picons} size={22}/>LinkedIn</a></li>
            </ul>
          </div>
      </div>
     );
}
export default Userprofile;