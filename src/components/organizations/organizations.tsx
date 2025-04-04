import { FC, memo, useEffect, useState } from "react";
import { Company, Contact } from "../../utils/types";
import { getCompany, getContact } from "../../api/api";
import { formatBusinessTypes, formatDate } from "../../utils/utils";
import EditIcon from "../icons/editIcon";
import DeleteIcon from "../icons/deleteIcon";
import Card from "../card/card";
import styles from './organizations.module.css';

type OrganizationsProps = {
  companyId: string;
  contactId: string;
  onError?: (error: string) => void;
}

const Organizations: FC<OrganizationsProps> = ({ companyId, contactId, onError }) => {
  const [company, setCompany] = useState<Company>();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<Contact>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getData();
    
  }, [companyId, contactId, onError]);

  const getData = async () => {
    await Promise.all([ getCompany(companyId), getContact(contactId)])
      .then(([companyResponse, contactResponse]) => {
        if (companyResponse.error) {
            throw new Error(companyResponse.error.message || 'Error loading company:');
        }
        if (contactResponse.error) {
            throw new Error(contactResponse.error.message || 'Error loading contact:');
        }

        setCompany(companyResponse.data);
        setContact(contactResponse.data);
      })
      .catch(error => {
        console.error('Loading error:', error);
        setError(error.message);
        onError?.(error.message);
      })
      .finally(() => setIsLoading(false));
  }

  const backendCompanyToCardInfo = (company: Company) => [
    { label: 'Agreement:', value: [company.contract.no, formatDate(company.contract.issue_date)] },
    { label: 'Business entity:', value: company.businessEntity },
    { label: 'Company type:', value: formatBusinessTypes(company.type) }
  ];

  const backendContactsToCardInfo = (contact: Contact) => [
    { label: 'Responsible person:', value: `${contact.firstname} ${contact.lastname}` },
    { label: 'Phone number:', value: contact.phone },
    { label: 'E-mail:', value: contact.email }
  ];

  return (
    <div className={styles.content}>
      {isLoading ? (
        <div className={styles.loading}>Company is loading...</div>
      ) : (
        company && contact ? (
          <>
            <div className={styles.header}>
              <h2 className={styles.companyName}>{company.name || 'Компания не найдена'}</h2>
              <button className={styles.editButton}><EditIcon /></button>
              <button className={styles.editButton}><DeleteIcon /></button>
            </div>
            <div className={styles.cards}>
              <Card 
                title="Company Details" 
                buttonType='edit' 
                info={backendCompanyToCardInfo(company)} 
              />
              <Card 
                title="Contacts" 
                buttonType='edit' 
                info={backendContactsToCardInfo(contact)} 
              />
              <Card 
                title="Photos" 
                buttonType='photo' 
                company={company} 
                photos={company.photos} 
              />
            </div>
          </>
        ) : (
          error ? <div className={styles.error}>Loading error: {error}</div> : null
        )
      )}
    </div>
  )
}

export default memo(Organizations);