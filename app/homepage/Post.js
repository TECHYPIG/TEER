import styles from './NewPost.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";

 const NewPostContent = () => {
  const h1Style = {
    fontSize: '1rem', 
    fontWeight:'bold',
  };
  const h2Style = {
    fontSize: '0.5rem', 
  };
    return (  
        <div className= {styles.newpost}>
        <div className={styles.userinfo}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
            <div className={styles.usernames}>
            <h1 style= {h1Style}> Amy Solar2</h1> 
            <h2 style= {h2Style}>@amysolar</h2>
          </div>
        </div>
        </div>
    );
}
export default NewPostContent