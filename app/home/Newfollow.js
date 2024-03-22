import styles from "./Newfollow.module.css";
import Image from "next/image";
import { IoIosAdd } from "react-icons/io";
import Cookies from "js-cookie";

export default function NewFollow({
  followers,
  setFollowers,
  FollowSuccess,
  FollowError,
  FollowLoading,
}) {
  const handleFollow = (username) => {
    return () => {
      FollowLoading("Following user");
      const token = Cookies.get("accessToken");
      fetch(`/api/following`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ followedUsername: username }),
      })
        .then((response) => {
          if (!response.ok) {
            alert("Error following user");
          }
          setFollowers(
            followers.filter((follower) => follower.Username !== username)
          );
          FollowSuccess("User followed successfully");
        })
        .catch((error) => {
          FollowError("User could not be followed");
        });
    };
  };

  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <h1>Follow Suggestions</h1>
      </div>
      <div className={styles.content}>
        {followers.map((value, index) => (
          <div key={index} className={styles.followsug}>
            <div className={styles.rows}>
              <div className={styles.profilepiccontainer}>
                <Image
                  src={value.profile_url}
                  className={styles.profilepic}
                  width={40}
                  height={40}
                  alt="Piggy"
                />
              </div>
              <h3 className={styles.followUserName}>{value.Username}</h3>
            </div>
            <button
              className={styles.followButton}
              onClick={handleFollow(value.Username)}
            >
              <IoIosAdd size={20} />
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
