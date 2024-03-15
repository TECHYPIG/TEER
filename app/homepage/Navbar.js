import styles from './Navbar.module.css';

const Navbar = () => {

    return ( 
        <div className={styles.navbar}>
          <p className={styles.navtxt}>
            <a href="#homepage">TEER</a>
          </p>
          <div className={styles.search}>
            <input type='text' value= '' className={styles.searchh3}></input>
            <button type="button" className={styles.searchbutton}>Search</button>
        </div>
        </div>
     );
}
export default Navbar;

