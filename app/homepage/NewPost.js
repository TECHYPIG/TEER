"use client";
import styles from "./NewPost.module.css";
import Image from "next/image";
import Piggy from "./piggy.jpg";

const Newpostcontent = ({user, onHandleOpen}) => {
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

  // Define your function
  const handleClick = () => {
    console.log("Button clicked!");
    // Add your code here
  };

  return (
    <div className={styles.newpost}>
      <div className={styles.align}>
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
              <h1 className={styles.name} style={h1Style}>{user.Firstname + " " + user.Surname}</h1>
              <h2 style={h2Style}>{"@"+user.Username}</h2>
            </div>
          </div>
        </div>
        <button onClick={onHandleOpen} className={styles.postbutton}>
          <h3>Share your thoughts...</h3>
        </button>
        {/* <div className={styles.postbutton}>
          <h3>Share your thoughts...</h3>
        </div> */}
      </div>
    </div>
  );
};
export default Newpostcontent;
