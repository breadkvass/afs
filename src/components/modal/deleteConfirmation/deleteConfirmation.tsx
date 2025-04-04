import { FC } from 'react';
import styles from './deleteConfirmation.module.css';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmation: FC<Props> = ({ onConfirm, onCancel }) => (
    <div className={styles.container}>
        <h3>Delete Image</h3>
        <p>Are you sure you want to delete this image?</p>
        <div className={styles.buttons}>
            <button className={styles.button} onClick={onCancel}>Cancel</button>
            <button className={styles.button} onClick={onConfirm}>Delete</button>
        </div>
    </div>
);

export default DeleteConfirmation;