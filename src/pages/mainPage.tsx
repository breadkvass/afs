import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import styles from './mainPage.module.css';
import Organizations from '../components/organizations/organizations';
import Contractors from '../components/contractors/contractors';
import Layout from '../components/layout/layout';
import Clients from '../components/clients/clients';
import { useEffect, useState } from 'react';
import { login } from '../api/api';
import ChevronIconLeft from '../components/icons/chevronIconLeft';

const MainPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const pathLocation = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('currentUser') || 'test_user';
    
    login(username)
      .then(() => setIsReady(true))
      .catch(error => {
        console.error('Initialization error:', error);
        setAuthError(error.message || 'Unknown error');
        localStorage.removeItem('authToken');
      })
  }, []);

  const handleGoBack = () => navigate(-1);

  return (
    <Layout>
      <div className={styles.main}>
        <Sidebar />
        {!isReady ? ( 
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Application initialization...</p>
          </div>
        ) : (
        authError ? (
          <div className={styles.errorContainer}>
            <h2>Authorization Error</h2>
            <p>{authError}</p>
            <button 
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <button 
              onClick={handleGoBack}
              className={styles.backButton}
              aria-label="Go back"
            >
              <ChevronIconLeft />
            </button>
            {pathLocation === '/companies/organizations' && <Organizations companyId='12' contactId='16' />}
            {pathLocation === '/companies/contractors' && <Contractors />}
            {pathLocation === '/companies/clients' && <Clients />}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MainPage;