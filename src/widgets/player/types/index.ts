export const VideoTypes = {
  youtube: 'youtube',
  rutube: 'rutube',
  video: 'video',
  vk: 'vk',
} as const;

export type TVideoTypes = keyof typeof VideoTypes;
