import styles from './Newpost.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";

 const Newpostcontent = () => {
  const h1Style = {
    fontSize: '0.7rem', 
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
            <h1 style= {h1Style}>Username</h1> 
            <h2 style= {h2Style}>@Usertag</h2>
          </div>
        </div>
        <div className={styles.newpostcontents}>
          <input type='text' value= '' className={styles.postinfoh3}></input>
        </div>
        <div className={styles.postbutton}>
        <button type="button">Post it!</button>
        </div>
        </div>
    );
}
export default Newpostcontent