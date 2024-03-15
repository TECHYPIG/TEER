import style from './Newfollow.module.css';
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
        <div className={style.nfollow}>
            <h3>You may like...</h3>
        <div className={style.accounts}>
        <Image src={Piggy} className={style.profilepic} width={30} height={30} alt='Piggy' />
        <div className={style.usernames}>

          </div>
        </div>
        </div>
     );
}
 
export default Newfollow;