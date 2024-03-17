import styles from './Userprofile.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import { SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseLight } from "react-icons/pi";


const Userprofile = () => {
    const h1Style = {
      fontSize: '1rem', 
      fontWeight:'bold',
    };
    const h2Style = {
      fontSize: '0.8rem', 
    };
    const h3Style = {
      fontSize: '0.9rem', 
      fontWeight:'bold',
      marginLeft: '70px',
    };
    return ( 
        <div className={styles.sideprofile}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> Username</h1> 
            <h2 style= {h2Style}>@Usertag</h2>
          </div>
        </div>
          <div className={styles.userdetails}>
            <ul>
            <li className={styles.picons}><CiLocationOn size={24}/></li>
            <li  className={styles.picons}> <PiBriefcaseLight size={24}/></li>
            </ul>
          </div>
          <div className={styles.line}></div>
          <a style= {h3Style}></a>
          <div className={styles.socials}>
            <ul>
            <li><a href="https://www.instagram.com/"><SlSocialInstagram className={styles.picons} size={22}/>Instagram</a></li>
            <li><a href="https://twitter.com/"><SlSocialTwitter className={styles.picons} size={22}/>Twitter</a></li>
            <li><a href="https://www.linkedin.com/"><SlSocialLinkedin className={styles.picons} size={22}/>LinkedIn</a></li>
            </ul>
          </div>
      </div>
     );
}
export default Userprofile;