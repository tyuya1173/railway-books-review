import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
    const url = "https://railway.bookreview.techtrain.dev"
    const [errorMessage, setErrorMessage] = useState()
    const onSignUp = () => {
        const data = {
            name: "string",
            email: "string",
            password: "string"
        }

        axios
            .post(`${url}/users`, data)
            .then((res) => {
                const token = res.data.token
                dispatchEvent(SignIn())
                setCookie('token', token)
                history.push('/')
            })
            .catch((err) => {
                setErrorMessage(`サインアップに失敗しました ${err}`)
            })
    }
    return(
        <div>
            <main className="signup">
                <h2>新規作成</h2>
                    <label>ユーザー名：</label>
                    <input type="text" className="name"></input>
                    <br />
                    <label>メールアドレス：</label>
                    <input type="email" className="email"></input>
                    <br />
                    <label>パスワード：</label>
                    <input type="password" className="password"></input>
                    <br />
                    <button type="button" className="signup-button" onClick={onSignUp}>新規登録</button>
            </main>
        </div>
    )
}

export default SignUp;
