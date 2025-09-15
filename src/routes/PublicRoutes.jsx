import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Register from "../pages/public/Register";
import Login from "../pages/public/Login";
import ForgotPassword from "../pages/public/ForgotPassword";
import ResetPassword from "../pages/public/ResetPassword";
import Post from "../pages/public/Post";
import ConfirmEmail from "../pages/public/ConfirmEmail";
import NotFound from '../pages/NotFound';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/post/:slug" element={<Post />}></Route>
            <Route path="/confirm-email" element={<ConfirmEmail />}></Route>
            <Route path='*' element={<NotFound />}></Route>

        </Routes>
    )

}

export default PublicRoutes;

