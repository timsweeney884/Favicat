import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/app-dispatch.hook';
import { fetchImages } from '../../store/search/search.thunk';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  });

  return <h1>Home Page</h1>;
};
