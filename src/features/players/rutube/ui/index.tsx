import { usePlayerDispatch } from '@/shared/context';
import type { TPlayerBase } from '@/shared/types';
import { useEffect, useImperativeHandle, useRef } from 'react';
import "./player-rutube.scss";

const parentClass = 'player-rutube' as const;
const classes = {
  parent: parentClass
} as const;

export const PlayerRutube: FCClass<TPlayerBase> = ({
  ref,
  url,
}) => {
  const refIframe = useRef<HTMLIFrameElement>(null);

  const dispatch = usePlayerDispatch();

  const play = (): void => {
    if (!refIframe.current) return;

    refIframe.current.contentWindow?.postMessage(JSON.stringify({
      type: 'player:play',
      data: {},
    }), '*');
  }

  useImperativeHandle(ref, () => {
    return {
      play,
    }
  });

  useEffect(() => {
    const rutubeReady = (event: any): void => {
      if (!refIframe.current) return;

      const message = JSON.parse(event.data);
      if (message.type === 'player:ready') {
        dispatch({ type: 'canplay' });
      }
    };

    window.addEventListener('message', rutubeReady);

    return () => { window.removeEventListener('message', rutubeReady) }
  }, []);

  return (
    <iframe
      ref={refIframe}
      width="100%"
      height="100%"
      src={url}
      allowFullScreen
      frameBorder="0"
      className={classes.parent}
    ></iframe>
  )
}
