import type { FCClass } from '@/shared/types';
import styles from './button-play.module.scss';
import cx from 'classix';

type TButtonPlay = {
  onClick?: () => void;
};

export const ButtonPlay: FCClass<TButtonPlay> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={cx(
        styles.button,
        className,
      )}
      type="button"
      onClick={onClick}
    />
  );
};
