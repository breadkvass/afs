import { FC } from 'react';
import styles from './notification.module.css';

type NotificationType = 'error' | 'success';

type NotificationProps = {
  message: string;
  type: NotificationType;
  onClose: () => void;
};

const Notification: FC<NotificationProps> = ({ message, type, onClose }) => (
  <div className={`${styles.notification} ${styles[type]}`}>
    <span>{message}</span>
    <button className={styles.closeButton} onClick={onClose}>×</button>
  </div>
);

export default Notification;