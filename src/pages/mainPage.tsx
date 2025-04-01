import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import styles from './mainPage.module.css';
import Organizations from '../components/organizations/organizations';
import Contractors from '../components/contractors/contractors';
import Layout from '../components/layout/layout';
import Clients from '../components/clients/clients';

const MainPage = () => {
  const pathLocation = useLocation().pathname;

  return (
    <Layout>
      <div className={styles.main}>
        <Sidebar />
        {pathLocation === '/companies/organizations' && <Organizations />}
        {pathLocation === '/companies/contractors' && <Contractors />}
        {pathLocation === '/companies/clients' && <Clients />}
      </div>
    </Layout>
  );
};

export default MainPage;