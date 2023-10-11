import {StreamDescription} from '../source/StreamDescription';

export enum Screens {
  HOME_SCREEN = 'Home',
  PLAYER_SCREEN = 'Player',
}

export type AppStackParamList = {
  [Screens.HOME_SCREEN]: undefined;
  [Screens.PLAYER_SCREEN]: {
    stream: StreamDescription;
  };
};
