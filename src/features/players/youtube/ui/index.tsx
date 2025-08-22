import type { FCClass, TPlayerBase } from '@/shared/types'
import { useEffect, useImperativeHandle, useRef } from 'react';
import { loadYTApi, parseYtId } from '../lib';
import { usePlayerDispatch } from '@/shared/context';

export const PlayerYoutube: FCClass<TPlayerBase> = ({
  className,
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

  return <div className={className} ref={refContainer} />
}
