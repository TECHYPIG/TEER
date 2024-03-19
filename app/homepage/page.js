import styles from './Page.module.css';
import Navbar from './Navbar';
import Userprofile from './Userprofile';
import Newpostcontent from './Newpost';
import Postcontent from './Post';
import Voluneer from "./Volunteer/Volunteer"
import Newfollow from './Newfollow';

export default function Home() {
  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <div className= {styles.innerdiv}>
      <Userprofile></Userprofile>
      <div className= {styles.row2}>
      <Newpostcontent></Newpostcontent>
      <Postcontent></Postcontent>
      </div>
      <div className= {styles.row3}>
      <Voluneer></Voluneer>
      <Newfollow></Newfollow>
      </div>
    </div>
    </div>
  );
}

