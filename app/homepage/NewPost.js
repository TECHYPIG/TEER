"use client";
import styles from "./NewPost.module.css";
import Image from "next/image";
import Piggy from "./piggy.jpg";

const Newpostcontent = () => {
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
              src={Piggy}
              className={styles.profilepic}
              width={30}
              height={30}
              alt="Piggy"
            />
            <div className={styles.usernames}>
              <h1 style={h1Style}>Username</h1>
              <h2 style={h2Style}>@Usertag</h2>
            </div>
          </div>
        </div>
        <button onClick={handleClick} className={styles.postbutton}>
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
