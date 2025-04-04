import CardButton from '../../cardButton/cardButton';
import AddPhotoIcon from '../../../icons/addPhotoIcon';
import EditIcon from '../../../icons/editIcon';
import CheckedIcon from '../../../icons/checkedIcon';
import CancelIcon from '../../../icons/cancelIcon';
import styles from './actionButtons.module.css';

const ActionButtons = ({
  buttonType,
  isEdit,
  isUploading,
  onAddPhoto,
  onEdit,
  onSave,
  onCancel
}: {
  buttonType: 'edit' | 'photo';
  isEdit: boolean;
  isUploading: boolean;
  onAddPhoto: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <>
    {buttonType === 'photo' ? (
      <CardButton 
        icon={<AddPhotoIcon />} 
        label={isUploading ? 'Uploading...' : 'Add'} 
        onClickHandler={onAddPhoto}
        disabled={isUploading}
      />
    ) : !isEdit ? (
      <CardButton 
        icon={<EditIcon />} 
        label='Edit' 
        onClickHandler={onEdit} 
      />
    ) : (
      <div className={styles.buttons}>
        <CardButton icon={<CheckedIcon />} label='Save changes' onClickHandler={onSave} />
        <CardButton icon={<CancelIcon />} label='Cancel' onClickHandler={onCancel} />
      </div>
    )}
  </>
);

export default ActionButtons;