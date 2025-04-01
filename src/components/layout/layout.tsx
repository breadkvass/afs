import { FC, ReactNode } from 'react';
import MainMenu from '../mainMenu/mainMenu';
import styles from './layout.module.css';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            <MainMenu />
            {children}
        </div>
    )
}

export default Layout;