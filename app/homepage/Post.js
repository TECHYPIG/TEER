import styles from "./Post.module.css";
import Image from "next/image";
import Piggy from "./piggy.jpg";
import Vibe from "./vibe.jpeg";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineLike } from "react-icons/ai";

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

const Postcontent = ({ post }) => {
  const content = post.content;

  return (
    <div className={styles.post}>
      <UserInfo user={post.user} />
      <div className={styles.postinfo}>
        <PostContent post={post} />
        <Comments comments={post.comments} />
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
          src={Piggy}
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

const PostContent = ({ post }) => {
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
          <button className="py-1.5 px-3 mr-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <AiOutlineLike />
            <span>342</span>
          </button>
          <button className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <TfiCommentAlt />
            <span>comments no.</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Comments = ({ comments }) => {
  return (
    <div className={styles.comments}>
      <p>-Comment section-</p>
    </div>
  );
};
