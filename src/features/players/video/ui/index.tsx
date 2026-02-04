import { usePlayerDispatch } from '@/shared/context/hooks';
import { PLAYER_ACTIONS } from '@/shared/context/types';
import type { FCClass, TPlayerBase } from '@/shared/types';
import { useImperativeHandle, useRef } from 'react';

export const PlayerVideo: FCClass<TPlayerBase> = ({
  className,
  ref,
  url,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const dispatch = usePlayerDispatch();

  const handlePlay = () => {
    dispatch({
      type: PLAYER_ACTIONS.hideButton,
    });
  };

  const handlePause = () => {
    dispatch({
      type: PLAYER_ACTIONS.showButton,
    });
  };

  const handleCanPlay = () => {
    dispatch({
      type: PLAYER_ACTIONS.canplay,
    });
  };

  const play = (): void => {
    if (videoRef.current) {
      handlePlay();

      videoRef.current.play().catch((error) => {
        console.error(error);
      });
    }
  };

  useImperativeHandle(ref, () => {
    return {
      play,
    };
  });

  return (
    <video
      className={className}
      ref={videoRef}
      controls
      src={url}
      preload="auto"
      onPlay={handlePlay}
      onPause={handlePause}
      onCanPlay={handleCanPlay}
    />
  );
};
