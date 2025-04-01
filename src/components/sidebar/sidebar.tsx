import CustomNavLink from '../customNavLink/customNavLink';
import ClientsIcon from '../icons/clientsIcon';
import CompanyIcon from '../icons/companyIcon';
import ContractorIcon from '../icons/contractorIcon';
import styles from './sidebar.module.css';

const Sidebar = () => {

  return (
    <aside className={styles.sidebar}>
      <div className={styles.titleContainer}>
          <h2 className={styles.title}>Oak Tree Cemetery</h2>
          <p className={styles.desc}>Process Manager</p>
      </div>
      <span className={styles.divider}></span>
      
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <CustomNavLink icon={<CompanyIcon />} toPath='/companies/organizations' label='Organizations' />
          <CustomNavLink icon={<ContractorIcon />} toPath='/companies/contractors' label='Contractors' />
          <CustomNavLink icon={<ClientsIcon />} toPath='/companies/clients' label='Clients' />
        </ul>
      </nav>
      <p className={styles.rights}>All Funeral Services © 2015-2025</p>
    </aside>
  );
};

export default Sidebar;