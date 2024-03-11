import styles from './Home.module.css';
import Navbar from './Navbar';
import Userprofile from './Userprofile';
import NewPostContent from './NewPost';
import PostContent from './Post';
import Jobpost from './Jobposting';
import Suggestedfollowers from './Suggestedfollowers';

export default function Home() {
  return (
    <div className={styles.homecontainer}>
      <Navbar></Navbar>
      <div className= {styles.innerdiv}>
      <Userprofile></Userprofile>
      <div className= {styles.row2}>
      <NewPostContent></NewPostContent>
      <PostContent></PostContent>
      </div>
      <div className= {styles.row3}>
      <Jobpost></Jobpost>
      <Suggestedfollowers></Suggestedfollowers>
      </div>
    </div>
    </div>
  );
}

