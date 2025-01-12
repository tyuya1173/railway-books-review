import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("name");

        if(token && storedUserName){
            setUserName(storedUserName);
        } else {
            setUserName(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setUserName(null);
        navigate("./components/Login");
    };

    return (
        <header className="header">
            <h1 className="title" onClick={() => navigate("/")}>
                書籍レビューアプリ
            </h1>
            <div>
                {userName ? (
                    <>
                        <span className="userName">{name}さん</span>
                        <button onClick={handleLogout} className="button">
                            ログアウト
                        </button>
                    </>
                ) : (
                    <button onClick={() => navigate("/components/Login")} className="button">
                        ログイン
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;