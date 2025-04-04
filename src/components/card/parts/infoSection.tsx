import { Info } from '../../../utils/types';
import styles from '../card.module.css';
import InfoRow from './infoRow';

const InfoSection = ({ info }: { info: Info[] }) => (
  <div className={styles.info}>
    {info.map((item, ind) => (
      <InfoRow key={`${item.label}-${ind}`} item={item} />
    ))}
  </div>
);

export default InfoSection;