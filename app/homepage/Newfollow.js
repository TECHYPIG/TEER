import styles from './Newfollow.module.css';
import {followers} from './Followsug.js';

const Newfollow = async () => {
  const x = followers();
    return ( 
        <div className={styles.nfollow}>
          console.log("running");
          </div>
     );
}
export default Newfollow;

