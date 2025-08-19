import type { TPlayerBase } from '@/shared/types';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { convertVkVideoLink, loadVKVideoApi } from '../lib';
import { usePlayerDispatch } from '@/shared/context';

export const PlayerVk: FCClass<TPlayerBase> = ({
  ref,
  url,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const refVkInst = useRef<any>(null);

  const dispatch = usePlayerDispatch();

  const play = (): void => {
    if (refVkInst.current) {
      refVkInst.current.play?.();
    }
  };

  useImperativeHandle(ref, () => {
    return {
      play,
    }
  });

  useEffect(() => {
    if (iframeRef.current) {
      loadVKVideoApi()
        .then((VK) => {
          refVkInst.current = VK.VideoPlayer(iframeRef.current);

          dispatch({ type: 'canplay' });
        })
        .catch((err) => {
          console.error(err);
        });

      return () => {
        if (refVkInst.current) {
          refVkInst.current.destroy();
        }
      };
    }

    return undefined;
  }, []);

  return (
    <iframe
      width='100%'
      height='100%'
      ref={iframeRef}
      src={`${convertVkVideoLink(url)}&js_api=1`}
      allow='autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media'
      data-testid='embed-iframe'
      frameBorder='0'
      scrolling='no'
      title='player'
      allowFullScreen
    />
  )
}
