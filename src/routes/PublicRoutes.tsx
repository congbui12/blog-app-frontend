import { Routes, Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
import Post from '../pages/public/Post';
import NotFound from '../pages/NotFound';
import SearchResults from '../pages/public/SearchResults';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/posts/search" element={<SearchResults />}></Route>
      <Route path="/posts/:id" element={<Post />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default PublicRoutes;
