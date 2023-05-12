import { atom } from 'recoil';

export const isHomeState = atom<boolean>({
  key: 'isHomeState',
  default: false,
});
