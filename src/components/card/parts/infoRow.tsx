import { Info } from '../../../utils/types';
import styles from '../card.module.css';

type InfoRowProps = {
  item: Info;
};

const InfoRow = ({ item }: InfoRowProps) => {
  return (
    <div className={styles.row}>
      <p className={styles.label}>{item.label}</p>
      {typeof item.value !== 'string' ? (
        <div className={styles.agreement}>
          <p className={styles.value}>{item.value[0]}</p>
          <span>/</span>
          <p className={styles.value}>{item.value[1]}</p>
        </div>
      ) : (
        <p className={styles.value}>{item.value}</p>
      )}
    </div>
  );
};

export default InfoRow;