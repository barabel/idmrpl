import type { FCClass } from '@/shared/types';
import './button-play.scss';

type TButtonPlay = {
  onClick?: () => void
}

const parentClass = "idmrp-button-play" as const;
const classes = {
  parent: parentClass
} as const;

export const ButtonPlay: FCClass<TButtonPlay> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={[classes.parent, className].join(' ')}
      type='button'
      onClick={onClick}
    />
  )
}
