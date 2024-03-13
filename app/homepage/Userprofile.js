import styles from './Userprofile.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import { IoAccessibilityOutline, IoLocationOutline, IoIdCardOutline } from "react-icons/io5";
import { SlSocialTwitter, SlSocialInstagram, SlSocialLinkedin } from "react-icons/sl";


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
    };
    return ( 
        <div className={styles.sideprofile}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> Username</h1> 
            <h2 style= {h2Style}>@Usertag</h2>
            {/* <a href="#ProfilePage"><IoAccessibilityOutline className={styles.picons} size={20}/></a> */}
          </div>
        </div>
          <div className={styles.userdetails}>
            <ul>
            <li><a><IoLocationOutline className={styles.picons} size={30}/>Location: </a></li>
            <li> <a><IoIdCardOutline className={styles.picons} size={30}/>Occupation: </a></li>
            </ul>
          </div>
          <div className={styles.line}></div>
          <div className={styles.socials}>
            <a style= {h3Style}> Social Media</a>
            <ul>
            <li><a href="https://www.instagram.com/"><SlSocialInstagram className={styles.picons} size={30}/>Instagram</a></li>
            <li><a href="https://twitter.com/"><SlSocialTwitter className={styles.picons} size={30}/>Twitter</a></li>
            <li><a href="https://www.linkedin.com/"><SlSocialLinkedin className={styles.picons} size={30}/>LinkedIn</a></li>
            </ul>
          </div>
      </div>
     );
}
export default Userprofile;