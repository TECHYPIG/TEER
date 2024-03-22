"use client";
import styles from "./Userprofile.module.css";
import Image from "next/image";

export default function Userprofile({ user }) {
  return (
    <div className={styles.sideprofile}>
      <UserBadge profile_url={user.profile_url} Firstname={user.Firstname} Surname={user.Surname} Username={user.Username} />
      {user.Bio && <UserBio Bio={user.Bio} />}
      <UserInfo location={user.Location} role={user.Role} />
    </div>
  );
}

function UserBadge(data) {
  return (
    <div className={styles.userinfo}>
      <Image
        src={data.profile_url}
        className={styles.profilepic}
        width={30}
        height={30}
        alt="Piggy"
      />
      <div className={styles.usernames}>
        <a href="/profile">
          <h1 className={styles.h1Style}>
            {" "}
            {data.Firstname + " " + data.Surname}
          </h1>
          <h2 className={styles.h2Style}>@{data.Username}</h2>
        </a>
      </div>
    </div>
  );
}

function UserBio({ Bio }) {
  return (
    <div className={styles.biocontainer}>
      <p className={styles.bio}>{Bio}</p>
    </div>
  );
}

function UserInfo({ location, role }) {
  return (
    <div className={styles.userdetails}>
      <div className={styles.row}>
        <p>{role}</p>
      </div>
      <div className={styles.row}>
        <p>{location}</p>
      </div>
      
    </div>
  );
}