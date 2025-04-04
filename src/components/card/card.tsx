import { FC, useEffect, useState } from 'react';
import styles from './card.module.css';
import { CardProps, CompanyPhoto } from '../../utils/types';
import { deleteCompanyImage, uploadCompanyImage } from '../../api/api';
import { useModal } from '../../utils/modalProvider';
import DeleteConfirmation from '../modal/deleteConfirmation/deleteConfirmation';
import Notification from '../notification/notification';
import ActionButtons from './parts/actionButtons/actionButton';
import InfoSection from './parts/infoSection';
import PhotoGallery from './parts/photoGallery';

const Card: FC<CardProps> = ({ title, buttonType, info, company, photos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [companyPhotos, setCompanyPhotos] = useState<CompanyPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (photos) setCompanyPhotos(photos);
  }, [photos]);

  const showNotification = (message: string, type: 'error' | 'success') => {
    openModal(<Notification message={message} type={type} onClose={closeModal} />);
    setTimeout(closeModal, 3000);
  };

  const addPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !company) return;

      setIsUploading(true);
      uploadCompanyImage(company.id, file)
        .then(({ data, error }) => {
          if (error) throw new Error(error.message);
          if (data) {
            setCompanyPhotos(prev => [...prev, data]);
            showNotification('Image uploaded successfully', 'success');
          }
        })
        .catch(err => {
          showNotification(
            err instanceof Error ? err.message : 'Upload failed',
            'error'
          );
        })
        .finally(() => setIsUploading(false));
    };

    input.click();
  };

  const handleDeletePhoto = (imageName: string) => {
    if (!company?.id) {
      showNotification('Company ID is missing', 'error');
      return;
    }

    const handleOnConfirm = () => {
        
        deleteCompanyImage('12', imageName)
                 .then(() => {
              
              setCompanyPhotos(prev => prev.filter(photo => photo.name !== imageName));
              showNotification('Image deleted successfully', 'success');
            })
            // .then(() => showNotification('Image deleted successfully', 'success'))
            .catch((error) => showNotification(error instanceof Error ? error.message : 'Deletion failed', 'error'))
    }

    openModal(
      <DeleteConfirmation 
        onConfirm={handleOnConfirm}
            
        //   deleteCompanyImage(company.id, imageName)
        //     .then(({ error }) => {
        //       if (error) throw error;
        //       setCompanyPhotos(prev => prev.filter(photo => photo.name !== imageName));
        //       showNotification('Image deleted successfully', 'success');
        //     })
        //     .catch(error => {
        //       showNotification(
        //         error instanceof Error ? error.message : 'Deletion failed',
        //         'error'
        //       );
        //     })
        //     .finally(closeModal);
        // }}
        onCancel={closeModal}
      />
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <ActionButtons
          buttonType={buttonType}
          isEdit={isEdit}
          isUploading={isUploading}
          onAddPhoto={addPhoto}
          onEdit={() => setIsEdit(true)}
          onSave={() => setIsEdit(false)}
          onCancel={() => setIsEdit(false)}
        />
      </div>

      {info && <InfoSection info={info} />}
      
      {companyPhotos && (
        <PhotoGallery 
          photos={companyPhotos}
          onDelete={handleDeletePhoto}
          isUploading={isUploading}
        />
      )}
    </div>
  );
};

export default Card;