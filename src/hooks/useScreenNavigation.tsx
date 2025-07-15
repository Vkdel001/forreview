import { useState } from 'react';
import { Screen } from '../constants/screens';

export function useScreenNavigation(initial: Screen = 'auth') {
  const [screen, setScreen] = useState<Screen>(initial);

  const goTo = (s: Screen) => setScreen(s);

  return {
    screen,
    goTo,
  };
}
