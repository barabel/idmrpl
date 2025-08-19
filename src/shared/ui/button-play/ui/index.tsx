import cx from 'classix';
import './button-play.scss';

type TButtonPlay = {
  onClick?: () => void
}

const parentClass = "button-play" as const;
const classes = {
  parent: parentClass
} as const;

export const ButtonPlay: FCClass<TButtonPlay> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={cx(classes.parent, className)}
      type='button'
      onClick={onClick}
    />
  )
}
