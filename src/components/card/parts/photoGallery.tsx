import styles from '../card.module.css';
import DeleteIcon from '../../icons/deleteIcon';
import { CompanyPhoto } from '../../../utils/types';

const PhotoGallery = ({ 
  photos,
  onDelete,
  isUploading 
}: {
  photos: CompanyPhoto[];
  onDelete: (name: string) => void;
  isUploading: boolean;
}) => (
  <div className={styles.photos}>
    {photos.map((photo) => (
      <div key={photo.name} className={styles.photoContainer}>
        <img 
          className={styles.photo} 
          src={photo.thumbpath} 
          alt={`Company photo ${photo.name}`} 
        />
        <button
          className={styles.deletePhotoButton}
          onClick={() => onDelete(photo.name)}
          disabled={isUploading}
        >
          <DeleteIcon />
        </button>
      </div>
    ))}
  </div>
);

export default PhotoGallery;