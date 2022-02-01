import { v4 as uuidv4 } from 'uuid';
import { SUB_ID } from '../constants/localstorage.constants';

export const setSubId = () => {
  if (!localStorage.getItem(SUB_ID)) {
    localStorage.setItem(SUB_ID, uuidv4());
  }
};
