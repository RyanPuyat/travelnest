import { Outlet } from 'react-router';
import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './Logo';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
