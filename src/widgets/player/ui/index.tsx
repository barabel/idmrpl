import { useMemo, useRef } from 'react';
import { PlayerProvider } from '@/shared/context'
import type { FCClass, TPlayer, TPlayerBaseMethods } from '@/shared/types'
import { PlayerPreview } from './preview'
import { getVideoTypeByURL, players } from '../lib';
import './player.scss';

const parentClass = 'player' as const;
const classes = {
  parent: parentClass,
} as const;

const PlayerBody: FCClass<TPlayer> = ({
  url,
  preview,
}) => {
  const Player = useMemo(() => {
    const playerType = getVideoTypeByURL(url);

    return players[playerType]
  }, [url]);

  const playerRef = useRef<TPlayerBaseMethods>(null);

  const handleOnPlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  }

  return (
    <PlayerPreview
      className={classes.parent}
      preview={preview}
      onPlay={handleOnPlay}
    >
      <Player
        ref={playerRef}
        url={url}
      />
    </PlayerPreview>
  )
}

export const Player: FCClass<TPlayer> = (props) => {
  return (
    <PlayerProvider>
      <PlayerBody {...props} />
    </PlayerProvider>
  )
}
