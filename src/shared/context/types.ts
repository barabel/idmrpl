export type TPlayerState = {
  showButton: boolean
  showPreview: boolean
  canplay: boolean
}

export const PLAYER_ACTIONS = {
  show: 'show',
  hide: 'hide',
  showButton: 'showButton',
  hideButton: 'hideButton',
  canplay: 'canplay',
} as const;

export type TPlayerActionsTypes = keyof typeof PLAYER_ACTIONS;

export type TPlayerAction = {
  type: TPlayerActionsTypes
}
