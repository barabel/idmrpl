import cx from 'classix';
import { useMemo, useRef } from 'react';
import { PlayerProvider } from '@/shared/context';
import type { FCClass, TPlayer, TPlayerBaseMethods, TPlayerPreview } from '@/shared/types';
import { PlayerPreview } from './preview';
import { getVideoTypeByURL, players } from '../lib';
import styles from './player.module.scss';

const Preview: FCClass<TPlayerPreview & { hasPreview: boolean }> = ({
  children,
  hasPreview,
  ...props
}) => {
  if (hasPreview) {
    return (
      <PlayerPreview
        {...props}
      >
        {children}
      </PlayerPreview>
    );
  }

  return children;
};

const PlayerBody: FCClass<TPlayer> = ({
  className,
  url,
  preview,
  classNames,
  components,
}) => {
  const playerClassName = classNames?.player;
  const ButtonComponent = components?.button;
  const PreviewPictureComponent = components?.previewPicture;

  const Player = useMemo(() => {
    const playerType = getVideoTypeByURL(url);

    return players[playerType];
  }, [url]);

  const playerRef = useRef<TPlayerBaseMethods>(null);

  const handleOnPlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  const hasPreview = Boolean(preview) || Boolean(PreviewPictureComponent);

  return (
    <Preview
      hasPreview={hasPreview}
      className={className}
      preview={preview}
      onPlay={handleOnPlay}
      ButtonComponent={ButtonComponent}
      PreviewPictureComponent={PreviewPictureComponent}
    >
      <Player
        className={cx(
          playerClassName ?? styles.player,
          !hasPreview && className,
        )}
        ref={playerRef}
        url={url}
      />
    </Preview>
  );
};

export const Player: FCClass<TPlayer> = (props) => {
  return (
    <PlayerProvider>
      <PlayerBody {...props} />
    </PlayerProvider>
  );
};
