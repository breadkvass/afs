import styles from './mainMenu.module.css';
import Logo from '../icons/oakTreeLogo';
import CompanyIcon from '../icons/companyIcon';
import SearchIcon from '../icons/searchIcon';
import SettingsIcon from '../icons/settingsIcon';
import SignOutIcon from '../icons/signOutIcon';
import { NavLink } from 'react-router-dom';

const MainMenu = () => {
    const navItemStyle = (isActive: boolean) => isActive ? styles.active : '';
    
    return (
        <div className={styles.menuContainer}>
            <Logo />
            <nav>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}><NavLink to={'/companies'} className={({ isActive }) => navItemStyle(isActive)}><CompanyIcon /></NavLink></li>
                    <li className={styles.navItem}><NavLink to={'/search'} className={({ isActive }) => navItemStyle(isActive)}><SearchIcon /></NavLink></li>
                </ul>
            </nav>
            <ul className={styles.additional}>
                <span className={styles.divider}></span>
                <li className={styles.navItem}><NavLink to={'/settings'} className={({ isActive }) => navItemStyle(isActive)}><SettingsIcon /></NavLink></li>
                <li className={styles.navItem}><NavLink to={'/logout'} className={({ isActive }) => navItemStyle(isActive)}><SignOutIcon /></NavLink></li>
            </ul>
        </div>
  );
};

export default MainMenu;