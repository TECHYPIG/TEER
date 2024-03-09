import styles from './Navbar.module.css';

const Navbar = () => {
  const searchTxt = {
    fontSize: '0.8rem', 
  };
    return ( 
        <nav className={styles.navbar}>
          <p className={styles.navtxt}>
            <a href="#homepage">TEER</a>
          </p>
          <p className={styles.Search}>
          Search:
          </p>
        </nav>

     );
}
export default Navbar;

