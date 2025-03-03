import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const url = "https://railway.bookreview.techtrain.dev";
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onLogin = () => {
        const data = { email, password };

        axios
            .post(`${url}/signin`, data, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((res) => {
                console.log(res.data);
                const token = res.data.token;
                const name = res.data.name || "ゲスト";
                localStorage.setItem("token", token);
                localStorage.setItem("name", name);
                setToken(token);
                navigate("/booklist");
            })
            .catch((err) => {
                setErrorMessage(`サインインに失敗しました: ${err.response?.data?.message || err.message}`);
            });
    };

    return (
        <div>
            <h2>ログイン</h2>
            <label>メールアドレス：</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>パスワード：</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="button" onClick={onLogin}>ログイン</button>
            <p>{errorMessage}</p>
            <p>新規登録は<a href="/signup">こちら</a>。</p>
        </div>
    );
};

export default Login;