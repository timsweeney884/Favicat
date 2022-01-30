import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from '../../pages/home/home.component';
import { Test } from '../../pages/test/test.component';
import { Upload } from '../../pages/upload/upload.component';

import './app.module.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/test" element={<Test />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
