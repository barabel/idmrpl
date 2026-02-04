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
  ButtonComponent,
  PreviewPictureComponent,
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

  const hasPreview = Boolean(preview) || Boolean(PreviewPictureComponent);

  return (
    <div
      className={cx(
        styles.playerPreview,
        className,
      )}
    >
      {(showButton || (preview && showPreview)) && (
        <div
          className={styles.playerPreview__wrapper}
          onClick={handleClick}
        >
          {showButton
            && (
              ButtonComponent
                ? <ButtonComponent />
                : (
                    <ButtonPlay
                      className={styles.playerPreview__button}
                    />
                  )
            )}

          {(hasPreview && showPreview) && (
            PreviewPictureComponent
              ? (
                  <PreviewPictureComponent />
                )
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
