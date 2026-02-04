import { lazy, type LazyExoticComponent } from 'react';
import { VideoTypes, type TVideoTypes } from '../types';
import type { FCClass, TPlayerBase } from '@/shared/types';

export const players: Record<TVideoTypes, LazyExoticComponent<FCClass<TPlayerBase>>> = {
  [VideoTypes.youtube]: lazy(async () => await import('@/features/players/youtube')),
  [VideoTypes.rutube]: lazy(async () => await import('@/features/players/rutube')),
  [VideoTypes.video]: lazy(async () => await import('@/features/players/video')),
  [VideoTypes.vk]: lazy(async () => await import('@/features/players/vk')),
};

export const getVideoTypeByURL = (url: string): TVideoTypes => {
  const regExpYouTube = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const regExpRuTube = /^(?:https?:\/\/)?(?:rutu\.be\/|rutube\.ru(\/play\/))/;
  const regExpVk = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:vk\.com|vkvideo\.ru)\/.+$/;

  if (regExpRuTube.test(url)) {
    return VideoTypes.rutube;
  }

  if (regExpYouTube.test(url)) {
    return VideoTypes.youtube;
  }

  if (regExpVk.test(url)) {
    return VideoTypes.vk;
  }

  return VideoTypes.video;
};
