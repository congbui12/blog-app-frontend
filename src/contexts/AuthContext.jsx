import React, { createContext, useContext, useState, useEffect } from "react";
import authAPI from "../api/authAPI";
import userAPI from "../api/userAPI";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            const res = await userAPI.fetchMyProfileAPI();
            if (res.ok) {
                setUser(res.payload);
            } else {
                setUser(null);
            }
            setLoading(false);
        }

        fetchUser();
    }, [user]);

    const login = async (login, password) => {
        const res = await authAPI.loginAPI(login, password);
        // console.log(res);

        if (res.ok) {
            setUser(res.payload);
        }
        return res;
    }

    const logout = async () => {
        const res = await authAPI.logoutAPI();

        if (res.ok) {
            setUser(null);
            navigate('/login');
        }
        return res;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}