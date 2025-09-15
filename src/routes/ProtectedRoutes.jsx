import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/protected/Dashboard";
import PostForm from "../pages/protected/PostForm";
import Profile from "../pages/protected/Profile";
import { useAuth } from "../contexts/AuthContext";
import NotFound from '../pages/NotFound';

const ProtectedRoutes = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to='/login' />
    }

    return (
        <Routes>
            <Route path="dashboard" element={
                <Dashboard />
            }></Route>
            <Route path="post/new" element={
                <PostForm />
            }></Route>
            <Route path="post/:slug/edit" element={
                <PostForm />
            }></Route>
            <Route path="me" element={
                <Profile />
            }></Route>
            <Route path='*' element={
                <NotFound />
            }></Route>
        </Routes>
    )
}

export default ProtectedRoutes;
