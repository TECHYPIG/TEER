'use client';
import styles from "./Post.module.css";
import Image from "next/image";
import Piggy from "./piggy.jpg";
import Cookies from "js-cookie";
import Vibe from "./vibe.jpeg";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const h1Style = {
  fontSize: "1rem",
  fontWeight: "bold",
};
const h2Style = {
  fontSize: "0.8rem",
};
const h3Style = {
  fontSize: "0.9rem",
  fontWeight: "bold",
  marginLeft: "70px",
};

const Postcontent = ({ post, userDetails }) => {
  const content = post.content;

  return (
    <div className={styles.post}>
      <UserInfo user={post.user} />
      <div className={styles.postinfo}>
        <PostContent post={post} user={userDetails} />
        <Comments comments={post.comments} user={userDetails} />
      </div>
    </div>
  );
};

export default Postcontent;

const UserInfo = ({ user }) => {
  return (
    <div className={styles.userinfo}>
      <div className={styles.align}>
        <Image
          src={user.profile_url}
          className={styles.profilepic}
          width={30}
          height={30}
          alt="Piggy"
        />
        <div className={styles.usernames}>
          <h1 style={h1Style}>{user.Firstname + " " + user.Surname}</h1>
          <h2 style={h2Style}>{"@" + user.Username}</h2>
        </div>
      </div>
    </div>
  );
};

const PostContent = ({ post, user }) => {
  const token = Cookies.get("accessToken");
  console.log(user);
  const likeButtonHandle = () => {
    fetch("/api/like/createLike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId: post.id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <p className="text-black dark:text-white text-[16px] py-1 my-0.5">
        {post.content}
      </p>
      <Image
        src={post.picture_url}
        width={100}
        height={100}
        className={styles.postimage}
        alt="Vibe"
        priority
        unoptimized={true}
      />
      <p className="text-gray-500 dark:text-gray-400 text-[9px] py-1 my-0.5">
        {new Date(post.createdAt).toLocaleDateString() +
          " " +
          new Date(post.createdAt).toLocaleTimeString()}
      </p>
      <div className="text-gray-500 dark:text-gray-400 flex mt-3">
        <div className="flex items-center mr-6">
          <button
            onClick={likeButtonHandle}
            className="py-1.5 px-3 mr-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
          >
            {/* {post.likes.includes(user.Username) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            
            )} */}
            <span>{post.likes.length}</span>
          </button>
          <button className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <TfiCommentAlt />
            <span>{post.Comments.length + " Comments"} </span>
          </button>
        </div>
      </div>
    </>
  );
};

const Comments = ({ comments, user }) => {
  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
        ></textarea>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </div>
      <ul className="comment-list">
        {/* {comments.map((comment, index) => (
    <li>{comment.content}</li>
   ))} */}
      </ul>
    </div>
  );
};
