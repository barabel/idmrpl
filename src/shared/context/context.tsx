import { createContext, type ActionDispatch } from 'react';
import type { TPlayerAction, TPlayerState } from './types';

export const initialState = {
  showButton: false,
  showPreview: true,
  canplay: false,
};

export const PlayerContext = createContext<TPlayerState>(initialState);
export const PlayerDispatchContext = createContext<ActionDispatch<[action: TPlayerAction]>>(() => {});
