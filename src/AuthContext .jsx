// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        userName: null,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userName = localStorage.getItem("name");
        if (token && userName) {
            setAuth({ token, userName });
        }
    }, []);

    const login = (token, userName) => {
        localStorage.setItem("token", token);
        localStorage.setItem("name", userName);
        setAuth({ token, userName });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setAuth({ token: null, userName: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};