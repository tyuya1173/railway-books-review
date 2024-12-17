import React, { useState } from "react";
//import "/src/components/Login.css";


const Login = (props) => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validate = (e) => {
        e.preventDefault();
        let valid = true;

        if (!e.target.email.value.includes("@")) {
            setEmailError("正しいメールアドレスを入力してください");
            valid = false;
        } else {
            setEmailError("");
        }

        if (e.target.password.value.length < 6) {
            setPasswordError("パスワードは6文字以上である必要があります");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (valid) {
            console.log("ログイン成功");
        }
    };

    return (
        <div className="container">
            <b>{props.title}</b>
            <hr />
            <form onSubmit={validate}>
                <div>
                    <label>メールアドレス：</label>
                    <input type="text" name="email" />
                    {emailError && <p className="email-error">{emailError}</p>}
                </div>
                <div className="spacer" />
                <div>
                    <label>パスワード：</label>
                    <input type="text" name="password" />
                    {passwordError && <p className="password-error">{passwordError}</p>}
                </div>
                <div className="spacer" />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};

export default Login;
