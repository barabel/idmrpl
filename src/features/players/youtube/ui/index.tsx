import type { FCClass, TPlayerBase } from '@/shared/types'
import { useEffect, useImperativeHandle, useRef } from 'react';
import { loadYTApi, parseYtId } from '../lib';
import { usePlayerDispatch } from '@/shared/context';
import "./player-youtube.scss";

const parentClass = "player-youtube" as const;
const classes = {
  parent: parentClass
} as const;

export const PlayerYoutube: FCClass<TPlayerBase> = ({
  ref,
  url,
}) => {
  const refContainer = useRef(null);
  const refYoutubeInst = useRef<any>(null);

  const dispatch = usePlayerDispatch();

  const handleReady = (event: any) => {
    refYoutubeInst.current = event.target;

    dispatch({
      type: 'canplay',
    });
  }

  const play = () => {
    if (refYoutubeInst.current?.playVideo) {
      refYoutubeInst.current.playVideo();
    }
  }

  useImperativeHandle(ref, () => {
    return {
      play,
    }
  });

  useEffect(() => {
    if (!refContainer.current) return;

    const ytId = parseYtId(url);

    loadYTApi().then((YT) => {
      new YT.Player(refContainer.current, {
        width: '100%',
        height: '100%',
        videoId: ytId,
        events: {
          onReady: handleReady,
        },
      });
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return <div className={classes.parent} ref={refContainer} />
}
