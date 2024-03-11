import styles from './Post.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import Vibe from "./vibe.jpeg"; 

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
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> Amy Solar</h1> 
            <h2 style= {h2Style}>@amysolar</h2>
          </div>
        </div>
        <Image src={Vibe} className={styles.postimage} alt='Vibe' />
        </div>
     );
}
 
export default PostContent;