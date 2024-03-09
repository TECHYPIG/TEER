import styles from './Userprofile.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";

const Userprofile = () => {
    const h1Style = {
      fontSize: '1.2rem', 
      fontWeight:'bold',
    };
    const h2Style = {
      fontSize: '0.6rem', 
    };
    const h3Style = {
      fontSize: '0.9rem', 
      fontWeight:'bold',
    };
    return ( 
        <div className={styles.sideprofile}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> Amy Solar</h1> 
            <h2 style= {h2Style}>@amysolar</h2>
          </div>
        </div>
          <p className={styles.userdetails}>
            <a>Location: </a>
            <a>Occupation: </a>
          </p>
          <div className={styles.socials}>
            <a style= {h3Style}> Social Media</a>
            <ul>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#X">X</a></li>
            <li><a href="#LinkedIn">LinkedIn</a></li>
            <li><a href="#Indeed">Indeed</a></li>
            </ul>
          </div>
      </div>
     );
}
export default Userprofile;