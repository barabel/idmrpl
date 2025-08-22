import cx from 'classix';
import { PLAYER_ACTIONS, usePlayerDispatch, usePlayerState } from '@/shared/context';
import { ButtonPlay } from '@/shared/ui/button-play';
import type { FCClass, TPlayerPreview } from '@/shared/types';
import "./player-preview.scss";

const parentClass = 'idmrp-player-preview' as const;
const classes = {
  parent: parentClass,
  wrapper: `${parentClass}__wrapper`,
  button: `${parentClass}__button`,
  preview: `${parentClass}__preview`,
  player: `${parentClass}__player`,
} as const

export const PlayerPreview: FCClass<TPlayerPreview> = ({
  className,
  preview,
  onPlay,
  children,
}) => {
  const { showButton, showPreview, canplay } = usePlayerState();
  const dispatch = usePlayerDispatch();

  const handleClick = () => {
    if (canplay) {
      dispatch({
        type: PLAYER_ACTIONS.hide,
      });

      if (onPlay) {
        onPlay();
      }
    }
  }

  return (
    <div className={cx(classes.parent, className)}>
      {(showButton || (preview && showPreview)) && (
        <div
          className={classes.wrapper}
          onClick={handleClick}
        >
          {showButton &&
            <ButtonPlay
              className={classes.button}
            />
          }

          {preview && showPreview && <img className={classes.preview} src={preview.src} alt={preview.alt ?? 'preview'} />}
        </div>
      )}

      <div className={classes.player}>
        {children}
      </div>
    </div>
  )
}
