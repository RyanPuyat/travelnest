import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <footer>
        <p className={styles.copyright}>
          {' '}
          &copy; Copyright {new Date().getFullYear()} TravelNest Inc.
        </p>
      </footer>
    </div>
  );
}

export default Footer;
