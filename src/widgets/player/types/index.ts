export const VideoTypes = {
  youtube: 'youtube',
  rutube: 'rutube',
  video: 'video',
  vk: 'vk',
} as const;

/** Доступные виды плееров */
export type TVideoTypes = keyof typeof VideoTypes;
