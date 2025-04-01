import { NavLink } from 'react-router-dom';
import styles from './customNavLink.module.css';
import { FC, ReactElement } from 'react';

type CustomNavLinkProps = {
    icon: ReactElement;
    toPath: string;
    label: string;
}

const CustomNavLink: FC<CustomNavLinkProps> = ({icon, toPath, label}) => {
    const itemStyle = (isActive: boolean) => isActive ? styles.itemActive : '';

    return (
        <li className={styles.item}>
            <NavLink 
              to={toPath}
              className={({ isActive }) => itemStyle(isActive)}
            >
            <div className={styles.icon}>{icon}</div>
                {label}
            </NavLink>
          </li>
    )
}

export default CustomNavLink;