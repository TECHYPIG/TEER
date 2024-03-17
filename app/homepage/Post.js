import styles from './Post.module.css';
import Image from "next/image";
import Piggy from "./piggy.jpg";
import Vibe from "./vibe.jpeg";
import { TfiCommentAlt } from "react-icons/tfi";

const Postcontent = () => {
  const h1Style = {
    fontSize: '0.8rem', 
    fontWeight:'bold',
  };
  const h2Style = {
    fontSize: '0.5rem', 
  };
  const h3Style = {
    fontSize: '0.8rem', 
  };

    return ( 
        <div className= {styles.post}>
        <div className={styles.userinfo}>
          <div className={styles.align}>
          <Image src={Piggy} className={styles.profilepic} width={30} height={30} alt='Piggy'/>
            <div className={styles.usernames}>
            <h1 style= {h1Style}>Username</h1> 
            <h2 style= {h2Style}>@Usertag</h2>
          </div>  
          </div>
          <div className={styles.followb}>
          <h3 style= {h3Style}>+ Follow</h3>
          </div>
        </div>
        <div className={styles.postinfo}>
        <Image src={Vibe} className={styles.postimage} alt='Vibe'/>
        <p class="text-gray-500 dark:text-gray-400 text-[9px] py-1 my-0.5">12/03/2024</p>
        <div className={styles.line}></div>
    <div class="text-gray-500 dark:text-gray-400 flex mt-3">
        <div class="flex items-center mr-6">
        <button class="py-1.5 px-3 mr-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
            </svg>
            <span>342</span>
        </button>
        <button class="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
        <TfiCommentAlt />
            <span>comments no.</span>
        </button>
        </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.comments}>
          <p>-Comment section-</p>
        </div>
        </div>
        </div>
     );
}
 
export default Postcontent;