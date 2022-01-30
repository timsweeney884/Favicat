import { useDispatch } from 'react-redux';
import { AppDispatch } from '../types/app-dispatch';

export const useAppDispatch = () => useDispatch<AppDispatch>();
