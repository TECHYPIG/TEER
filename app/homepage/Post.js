import styles from './Post.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import Vibe from "./vibe.jpeg"; 
import { FaRegHeart } from "react-icons/fa";
import { CgUserAdd } from "react-icons/cg";
import { MdOutlineBlock } from "react-icons/md";

const PostContent = () => {
  const h1Style = {
    fontSize: '0.8rem', 
    fontWeight:'bold',
  };
  const h2Style = {
    fontSize: '0.5rem', 
  };
    return ( 
        <div className= {styles.post}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy'/>
            <div className={styles.usernames}>
            <h1 style= {h1Style}>Username</h1> 
            <h2 style= {h2Style}>@Usertag</h2>
          </div>
          <MdOutlineBlock className={styles.picon} size={30} color='black' style={{ marginLeft: '15.5rem' }}/>
          <CgUserAdd className={styles.picon} size={30} color='black' style={{ marginLeft: '0.5rem' }}/>
 
        </div>
        <div className={styles.postinfo}>
        <Image src={Vibe} className={styles.postimage} alt='Vibe'/>
        <FaRegHeart className={styles.picon} size={30} color='black' style={{ marginLeft: '3rem', marginTop: '0.5rem' }}/>

        </div>
        </div>
     );
}
 
export default PostContent;