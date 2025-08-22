import { createContext, useContext, useReducer, type ActionDispatch } from 'react';
import { PLAYER_ACTIONS, type TPlayerAction, type TPlayerState } from './types';
import type { FCClass } from '../types';

const initialState = {
  showButton: false,
  showPreview: true,
  canplay: false,
}

const reducer = (state: TPlayerState, action: TPlayerAction) => {
  const { type }  = action;

  switch (type) {
    case PLAYER_ACTIONS.show:
      return { ...state, showButton: true, showPreview: true };
    case PLAYER_ACTIONS.hide:
      return { ...state, showButton: false, showPreview: false };
    case PLAYER_ACTIONS.showButton:
      return { ...state, showButton: true };
    case PLAYER_ACTIONS.hideButton:
      return { ...state, showButton: false };
    case PLAYER_ACTIONS.canplay:
      return { ...state, canplay: true, showButton: true };
    default:
      return state;
  }
}

const PlayerContext = createContext<TPlayerState>(initialState);
const PlayerDispatchContext = createContext<ActionDispatch<[action: TPlayerAction]>>(() => {});

export const PlayerProvider: FCClass = ({ children }) => {
  const [playerState, dispatch] = useReducer(reducer, initialState);

  return (
    <PlayerContext.Provider value={playerState}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  )
}

export const usePlayerState = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerState нужно использовать внутри PlayerProvider');
  }

  return context;
}

export const usePlayerDispatch = () => {
  const context = useContext(PlayerDispatchContext);

  if (context === undefined) {
    throw new Error('usePlayerDispatch нужно использовать внутри PlayerProvider');
  }

  return context;
}
