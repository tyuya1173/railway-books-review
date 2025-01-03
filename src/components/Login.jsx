import React, { useState } from "react";
import axios from "axios";
import "/src/components/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const url = "https://railway.bookreview.techtrain.dev";
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onLogin = () => {
        const data = {
            email: email,
            password: password
        };

        axios
            .post(`${url}/signin` , data, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((res) => {
                const token = res.data.token;
                setSuccessMessage("サインインに成功しました!");
                setErrorMessage("");

                localStorage.setItem("authToken", token);
                setTimeout(() => navigate("/dashboard"), 2000);
            })
            .catch((err) => {
                setErrorMessage(`サインインに失敗しました: ${err.response?.message || err.message}`);
                setSuccessMessage("");
            });
    };

    return (
        <div>
            <main className="login">
                <h2>ログイン</h2>
                <label>メールアドレス：</label>
                <input
                    type="email"
                    className="email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br />
                <label>パスワード：</label>
                <input
                    type="password"
                    className="password"
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br />
                <button type="button" className="login-button" onClick={onLogin}>ログイン</button>
                <p>{errorMessage || successMessage}</p>
                <p>
                    新規登録は<a href="/components/SignUp">こちら</a>。
                </p>
            </main>
        </div>
    );
};

export default Login;