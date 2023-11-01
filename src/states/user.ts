import { atom } from 'recoil';

export const userAuth = atom<{ username: string, userID: string }>({
  key: 'userAuth',
  default: {
    username: '',
    userID: '',
  }
})
