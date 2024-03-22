"use client";
import styles from "./Post.module.css";
import Image from "next/image";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

const Post = ({
  post,
  userDetails,
  setPosts,
  posts,
  CommentSuccess,
  CommentError,
  CommentLoading,
}) => {
  const [commentsShow, setCommentsShow] = useState(false);

  const handleCommentsShow = () => {
    setCommentsShow(!commentsShow);
  };
  return (

    <div className={styles.post}>
      <UserInfo user={post.user} />
      <div className={styles.postinfo}>
        <PostContent
          post={post}
          user={userDetails}
          onCommentsShow={handleCommentsShow}
          setPosts={setPosts}
          posts={posts}
        />
        {commentsShow && (
          <Comments
            commentsDB={post.Comments}
            post={post.id}
            user={userDetails}
            CommentSuccess={CommentSuccess}
            CommentError={CommentError}
            CommentLoading={CommentLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Post;

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

const PostContent = ({ post, user, onCommentsShow, setPosts, posts }) => {
  const token = Cookies.get("accessToken");
  const [liked, setLiked] = useState(
    post && post.likes
      ? post.likes.some((like) => like.Username === user.Username)
      : false
  );
  const [likes, setLikes] = useState(post.likes.length);
  const likeButtonHandle = () => {
    setLiked(!liked);

    if (liked) {
      setLikes(likes - 1);
      fetch("/api/like/deleteLike", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: post.id }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      return;
    }
    if (!liked) {
      setLikes(likes + 1);
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
    }
  };

  const deletePost = (postId) => {
    fetch("/api/post/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        postId: post.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Post deleted successfully") {
          setPosts(posts.filter((post) => post.id !== postId));
          alert("Post deleted successfully");
        }
        if (data.error === "Post not found") {
          alert(data.error);
        }
      });
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
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            <span>{likes}</span>
          </button>
          <button
            onClick={onCommentsShow}
            className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2"
          >
            <TfiCommentAlt />
            <span>{post.Comments.length + " Comments"} </span>
          </button>

          {post.user.Username === user.Username && (
            <IconButton aria-label="delete" onClick={() => deletePost(post.id)}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

const Comments = ({
  commentsDB,
  post,
  user,
  CommentSuccess,
  CommentError,
  CommentLoading,
}) => {
  const [comments, setComments] = useState(commentsDB);
  const [inputComment, setInputComment] = useState("");

  const commentButtonHandle = () => {
    CommentLoading("Creating comment...");
    fetch("/api/comment/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        postId: post,
        content: inputComment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInputComment("");
        CommentSuccess("Comment created successfully");
        setComments([...comments, data]);

      })
      .catch((error) => {
        CommentError("Error creating comment");
      });
  };

  const deleteaComment = (commentId) => {
    fetch("/api/comment/deleteComment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({
        commentId: commentId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(comments.filter((comment) => comment.id !== commentId));
      });
  };

  return (
    <div className={styles.commentsection}>
      <h2 className={styles.commentsection}>Comments</h2>
      <ul className={styles.commentlist}>
        {comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.commentuser}>
              <div className={styles.profilepicspace}>
                <Image
                  src={comment.user.profile_url}
                  className={styles.profilepic}
                  width={30}
                  height={30}
                  alt="Piggy"
                />
              </div>
              <div className={styles.comments}>
                <div className={styles.commentuserinfo}>
                  <h3>{comment.user.Firstname + " " + comment.user.Surname}</h3>
                </div>
                <p className={styles.commentcontent}>{comment.content}</p>
              </div>
            </div>
            {comment.user.Username === user.Username && (
              <IconButton
                aria-label="delete"
                onClick={() => deleteaComment(comment.id)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}
      </ul>
      <div className={styles.commentinput}>
        <input
          type="text"
          placeholder="Add a comment..."
          className={styles.commentinputfield}
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
        <button onClick={commentButtonHandle} className={styles.commentbutton}>
          Post
        </button>
      </div>
    </div>
  );
};
