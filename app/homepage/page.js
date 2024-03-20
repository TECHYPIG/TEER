"use client";
import styles from "./Page.module.css";
import Navbar from "./Navbar";
import Userprofile from "./Userprofile";
import Newpostcontent from "./NewPost";
import Postcontent from "./Post";
import Voluneer from "./Volunteer/Volunteer";
import Newfollow from "./Newfollow";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const token = Cookies.get("accessToken");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/post/fetchPostsByFollowedUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <div className={styles.innerdiv}>
        <Userprofile></Userprofile>
        <div className={styles.row2}>
          <Newpostcontent></Newpostcontent>
          {posts.map((post, index) => (
            <Postcontent key={index} post={post}/>
          ))}
        </div>
        <div className={styles.row3}>
          <Voluneer></Voluneer>
          <Newfollow></Newfollow>
        </div>
      </div>
    </div>
  );
}
