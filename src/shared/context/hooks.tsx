import { useContext } from 'react';
import { PlayerContext, PlayerDispatchContext } from './context';

export const usePlayerState = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerState нужно использовать внутри PlayerProvider');
  }

  return context;
};

export const usePlayerDispatch = () => {
  const context = useContext(PlayerDispatchContext);

  if (context === undefined) {
    throw new Error('usePlayerDispatch нужно использовать внутри PlayerProvider');
  }

  return context;
};
