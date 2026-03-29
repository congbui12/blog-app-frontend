import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Post from '../pages/Post';
import NotFound from '../pages/NotFound';
import ProfileForm from '../components/features/form/ProfileForm';
import ChangePasswordForm from '../components/features/form/ChangePasswordForm';
import PersonalPosts from '../pages/Dashboard/PersonalPosts';
import FavoritePosts from '../pages/Dashboard/FavoritePosts';
import SearchResults from '../pages/SearchResults';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

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
      <Route path="profile" element={<Profile />}>
        <Route index element={<ProfileForm />} />
        <Route path="change-password" element={<ChangePasswordForm />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<PersonalPosts />} />
        <Route path="favorites" element={<FavoritePosts />} />
      </Route>
      {/* <Route path="*" element={<NotFound />}></Route> */}
    </Routes>
  );
};

export default PublicRoutes;
