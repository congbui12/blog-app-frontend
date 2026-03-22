import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
// import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  // const { user } = useAuth();

  return (
    <Routes>
      {/* {user && <Route path="/protected/*" element={<ProtectedRoutes />}></Route>} */}
      <Route path="/*" element={<PublicRoutes />}></Route>
    </Routes>
  );
};

export default AppRoutes;
