import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />}></Route>
    </Routes>
  );
};

export default AppRoutes;
