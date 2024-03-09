import styles from './Home.module.css';
import Navbar from './Navbar';
import Userprofile from './Userprofile';
import NewPostContent from './NewPost';

export default function Home() {
  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <Userprofile></Userprofile>
      <NewPostContent></NewPostContent>
    </div>
  );
}

