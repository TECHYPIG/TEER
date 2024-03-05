
import Image from "next/image";
import Piggy from "./piggy.jpg";
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.homecontainer}>
      <div className={styles.navbar}>
        <p className={styles.navtxt}>
          <a href="#homepage">TEER</a>
        </p>
        <p className={styles.Search}>
        Search:
        </p>
      </div>
      <div className={styles.sideprofile}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1>Amy Solar</h1>
            <h2>@amysolar</h2>
          </div>
        </div>

          <p className="User-details">
          
          </p>
          <p className="socials">
            <a href="#instagram">@instagram</a>
            <a href="#X">@X</a>
            <a href="#LinkedIn">@LinkedIn</a>
          </p>
      </div>
    </main>
  );
}

