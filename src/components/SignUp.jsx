import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

const SignUp = () => {
    const url = "https://railway.bookreview.techtrain.dev"
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [iconFile, setIconFile] = useState(null);

    const navigate = useNavigate();
    
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

                localStorage.setItem("token", token);

                if(iconFile){
                    compressAndUploadIcon(iconFile, token);
                } else {
                    setTimeout(() => navigate("/components/MyPage"), 2000);
                }
            })
            .catch((err) => {
                setErrorMessage(`サインアップに失敗しました ${err}`)
                setSuccessMessage("");
            })
    }

    const compressAndUploadIcon = (file, token) => {
        new Compressor(file, {
            quality: 0.8,
            maxWidth: 800,
            success(compressedFile){
                uploadIcon(compressedFile, token);
            },
        });
    };

    const uploadIcon = (compressedFile, token) => {
        const formData = new FormData();
        formData.append("icon", compressedFile);

        axios
            .post(`${url}/uploads`, formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("アイコンアップロード成功：", res.data.iconUrl);
                setTimeout(() => navigate("/components/GetBookList"), 2000);
            })
            .catch((err) => {
                setErrorMessage(`アイコンアップロードに失敗しました: ${err.response?.data?.ErrorMessageJP || err.message}`);
            });
    };

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
                    <label>アイコン画像：</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setIconFile(e.target.files[0])}
                    ></input>
                    <br />
                    <button type="button" className="signup-button" onClick={onSignUp}>新規登録</button>
                    <p>{errorMessage || successMessage}</p>
                    <p>
                        ログインは<a href="/components/Login">こちら</a>。
                    </p>
            </main>
        </div>
    )
}

export default SignUp;