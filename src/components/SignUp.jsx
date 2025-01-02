import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
    const url = "https://railway.bookreview.techtrain.dev"
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onSignUp = () => {
        const data = {
            name: name,
            email: email,
            password: password
        }

        axios
            .post(`${url}/users`, data, {
                headers: {
                  'Content-Type': 'application/json'
               }})
            .then((res) => {
                const token = res.data.token;
                setSuccessMessage("登録が完了しました");
                setErrorMessage("");
            })
            .catch((err) => {
                setErrorMessage(`サインアップに失敗しました ${err}`)
                setSuccessMessage("");
            })
    }
    return(
        <div>
            <main className="signup">
                <h2>新規登録</h2>
                    <label>ユーザー名：</label>
                    <input 
                        type="text" 
                        className="name"
                        onChange={(e) => setName(e.target.value)}></input>
                    <br />
                    <label>メールアドレス：</label>
                    <input 
                        type="email" 
                        className="email"
                        onChange={(e) => setEmail(e.target.value)}></input>
                    <br />
                    <label>パスワード：</label>
                    <input 
                        type="password" 
                        className="password"
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <br />
                    <button type="button" className="signup-button" onClick={onSignUp}>新規登録</button>
            </main>
        </div>
    )
}

export default SignUp;