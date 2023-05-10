import { atom } from 'recoil';

export const isIntroState = atom<boolean>({
  key: 'isIntroState',
  default: true,
});
