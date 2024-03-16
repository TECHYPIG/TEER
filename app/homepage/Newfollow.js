import styles from './Newfollow.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";

const Newfollow = () => {
    const h1Style = {
        fontSize: '1rem', 
        fontWeight:'bold',
      };
      const h2Style = {
        fontSize: '0.8rem', 
      };

    return ( 
        <div className={styles.nfollow}>
            <h3>You may like...</h3>
        <div className={styles.accounts}>
        <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy' />
        <div className={styles.usernames}>

          </div>
        </div>
        </div>
     );
}
 
export default Newfollow;