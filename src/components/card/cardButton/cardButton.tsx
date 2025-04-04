import { FC, ReactElement } from 'react';
import styles from './cardButton.module.css';

type CardButtonProps = {
    icon: ReactElement;
    onClickHandler: () => void;
    disabled?: boolean;
    label?: string;
}

const CardButton: FC<CardButtonProps> = ({icon, onClickHandler, disabled, label}) => {
    return (
        <button className={styles.button} onClick={onClickHandler} disabled={disabled}>
            {icon}
            {label && <p className={styles.label}>{label}</p>}
        </button>
    )
}

export default CardButton;