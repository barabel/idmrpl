import { PLAYER_ACTIONS, usePlayerDispatch, usePlayerState } from '@/shared/context';
import { ButtonPlay } from '@/shared/ui/button-play';
import type { FCClass, TPlayerPreview } from '@/shared/types';
import styles from './player-preview.module.scss';
import cx from 'classix';

export const PlayerPreview: FCClass<TPlayerPreview> = ({
  className,
  preview,
  onPlay,
  children,
  buttonComponent,
  previewPictureComponent,
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
  };

  const hasPreview = Boolean(preview) || Boolean(previewPictureComponent);

  return (
    <div
      className={cx(
        styles.playerPreview,
        className,
      )}
    >
      {(showButton || (hasPreview && showPreview)) && (
        <div
          className={cx(
            styles.playerPreview__wrapper,
            showButton && styles.playerPreview__wrapper_cursor,
          )}
          onClick={handleClick}
        >
          {showButton
            && (
              buttonComponent
                ? <buttonComponent.component className={styles.playerPreview__button} {...buttonComponent.props} />
                : (
                    <ButtonPlay
                      className={styles.playerPreview__button}
                    />
                  )
            )}

          {(hasPreview && showPreview) && (
            previewPictureComponent
              ? <previewPictureComponent.component className={styles.playerPreview__preview} {...previewPictureComponent.props} />
              : preview && <img className={styles.playerPreview__preview} src={preview.src} alt={preview.alt ?? 'preview'} />
          )}
        </div>
      )}

      <div className={styles.playerPreview__player}>
        {children}
      </div>
    </div>
  );
};
